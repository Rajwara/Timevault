"""
Split public/assets/feature-watch.webp into layers for the exploded-watch section.
Run from the repo root:  python3 scripts/split-watch.py
Outputs public/assets/explode/{body,dial,hands,bezel,crown,crystal}.webp and parts.json (boxes in source pixels).
These are stand-ins; drop AI-generated parts with the same names into that folder to replace them.
"""
import json, math
import numpy as np
from PIL import Image, ImageFilter

SRC = "public/assets/feature-watch.webp"
OUT = "public/assets/explode"
CX, CY = 340.0, 684.0          # hand pivot = dial centre
R_DIAL, R_CASE = 270.0, 335.0  # dial edge, outer edge of the bezel/case
R_GLASS = 274.0

im = Image.open(SRC).convert("RGBA")
A = np.asarray(im).astype(np.float32)
H, W = A.shape[:2]
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
dx, dy = xx - CX, yy - CY
r = np.hypot(dx, dy)
ang = np.degrees(np.arctan2(dy, dx))  # screen angle, 0 = 3 o'clock, -90 = 12

def soft(edge, width=1.2):
    """1 inside, 0 outside, anti-aliased."""
    return np.clip((edge) / width + 0.5, 0, 1)

def save(arr, box, name):
    x0, y0, x1, y1 = [int(round(v)) for v in box]
    x0, y0 = max(x0, 0), max(y0, 0)
    out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA").crop((x0, y0, x1, y1))
    out.save(f"{OUT}/{name}.webp", quality=92, method=6)
    return [x0, y0, x1 - x0, y1 - y0]

rgb, alpha = A[..., :3], A[..., 3]
lum = rgb @ np.array([0.3, 0.59, 0.11], dtype=np.float32)
inDial = soft(R_DIAL - r)

# ---------- 1. hands: light or orange pixels along the three hands (+ hub) ----------
def band(theta, length, half_w, back=0.0):
    t = np.radians(theta)
    ux, uy = math.cos(t), math.sin(t)
    along = dx * ux + dy * uy
    across = np.abs(-dx * uy + dy * ux)
    return (along > -back) & (along < length) & (across < half_w)

# directions measured from the photo (10:10 with seconds at ~7:40)
hour, minute, second = -146.0, -31.8, 139.2
region = band(hour, 178, 14) | band(minute, 240, 13) | band(second, 248, 5.5, back=48) | (r < 25)
# a slightly wider band (shadows) that gets painted over on the dial
wide = band(hour, 186, 22) | band(minute, 244, 20) | band(second, 252, 9, back=52) | (r < 32)
# the hands cast a soft shadow down and to the right: include it
shadow = np.zeros_like(wide)
shadow[8:, 5:] = wide[:-8, :-5]
wide = wide | shadow
orange = (rgb[..., 0] > 150) & (rgb[..., 1] < 160) & (rgb[..., 2] < 90) & (rgb[..., 0] - rgb[..., 2] > 80)

# dial background: median colour per radius (ignoring bright marks), used to fill where the hands were
bins = np.clip(r.astype(int), 0, int(R_DIAL))
dark = (lum < 110) & (r < R_DIAL)
bg = np.zeros((int(R_DIAL) + 1, 3), np.float32)
for i in range(int(R_DIAL) + 1):
    m = dark & (bins == i)
    bg[i] = np.median(rgb[m], axis=0) if m.sum() > 8 else (bg[i - 1] if i else [62, 62, 64])
bgimg = bg[bins]
bglum = bgimg @ np.array([0.3, 0.59, 0.11], dtype=np.float32)

diff = np.clip((lum - bglum) / 120.0, 0, 1)                       # light hands
odiff = np.clip((rgb[..., 0] - bgimg[..., 0] - 40) / 120.0, 0, 1) * orange.astype(np.float32)
ha = np.maximum(diff, odiff)
ha = np.where(region, ha, 0)
# keep the hand shapes solid in their cores, soft at the edges; slight shadow halo
ha_img = Image.fromarray((ha * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
ha = np.asarray(ha_img).astype(np.float32) / 255 * region
hands = np.zeros_like(A)
hands[..., :3] = rgb
hands[..., 3] = np.clip(ha * 1.15, 0, 1) * 255
# un-premultiply the dial colour out of the soft edges
hands[..., :3] = np.where(ha[..., None] > 0.02, rgb, rgb)

# ---------- 2. dial: original disc with the hands filled from the background ----------
wide_soft = np.asarray(Image.fromarray((wide * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32) / 255
fill = np.maximum(np.clip(ha * 1.6, 0, 1), wide_soft)[..., None]
# Inpaint the hand area from the surrounding dial (keeps the dial's own lighting); falls back to the per-radius colour
try:
    import cv2  # pip install opencv-python-headless
    mask = (wide | (ha > 0.05)).astype(np.uint8) * 255
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8))
    painted = cv2.inpaint(np.clip(rgb, 0, 255).astype(np.uint8), mask, 6, cv2.INPAINT_TELEA).astype(np.float32)
    soft_m = cv2.GaussianBlur(mask.astype(np.float32) / 255, (0, 0), 0.8)[..., None]
    grain = np.random.default_rng(7).normal(0, 2.2, rgb.shape[:2])[..., None]
    dial_rgb = rgb * (1 - soft_m) + (painted + grain) * soft_m
    # the 2 o'clock marker sat under the minute hand: rebuild it from its mirror image (the 4 o'clock marker)
    zone = (r > 196) & (r < 256) & (np.abs(ang - (-30.0)) < 6.5)
    mirror = rgb[np.clip((2 * CY - yy).astype(int), 0, H - 1), xx.astype(int)]
    mlum = mirror @ np.array([0.3, 0.59, 0.11], dtype=np.float32)
    marker = zone & (mlum > 120)
    marker = cv2.dilate(marker.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool) & zone
    dial_rgb = np.where(marker[..., None], mirror, dial_rgb)
except ImportError:
    dial_rgb = rgb * (1 - fill) + bgimg * fill
dial = np.zeros_like(A)
dial[..., :3] = dial_rgb
dial[..., 3] = 255 * inDial

# ---------- 3. bezel ring (with screws), and the crown ----------
ring = soft(r - R_DIAL + 0.5) * soft(R_CASE - r) 
crown_m = (xx > 655) & (yy > 600) & (yy < 770) & (r > R_CASE - 6)
bezel = A.copy(); bezel[..., 3] = alpha * ring * (~crown_m)
crown = A.copy(); crown[..., 3] = alpha * crown_m

# ---------- 4. crystal: generated glass disc ----------
gx = np.clip(1 - r / R_GLASS, 0, 1)
edge = np.clip((r - (R_GLASS - 18)) / 18, 0, 1) * soft(R_GLASS - r)
streak = np.exp(-(((dx + dy) / 1.4142 + 60) / 46) ** 2) * (r < R_GLASS - 30)
glow = np.exp(-((dx + 110) ** 2 + (dy + 120) ** 2) / (2 * 90 ** 2))
crys = np.zeros_like(A)
# blue-grey glass: tinted body, darker rim and a bright diagonal reflection (reads on light and dark backgrounds)
rim = np.clip((r - (R_GLASS - 10)) / 10, 0, 1) * soft(R_GLASS - r)
crys[..., 0] = 150 + 105 * np.clip(streak + glow, 0, 1) - 60 * rim
crys[..., 1] = 168 + 87 * np.clip(streak + glow, 0, 1) - 60 * rim
crys[..., 2] = 190 + 65 * np.clip(streak + glow, 0, 1) - 50 * rim
crys[..., 3] = np.clip(38 + edge * 70 + rim * 90 + streak * 60 + glow * 30, 0, 255) * soft(R_GLASS - r)

# ---------- 5. body: strap + lugs + case with an empty machined recess ----------
body = A.copy()
recess = r < R_CASE - 4
# brushed steel flange where the bezel sat, darker machined recess where the dial sat
flange = np.clip((r - R_DIAL) / (R_CASE - R_DIAL), 0, 1)
ringshade = 128 + 34 * np.cos(np.radians(ang + 45)) * flange + 5 * np.sin(r / 1.6)
machined = 36 + 4 * np.sin(r / 2.0) + 18 * np.exp(-((dx + 80) ** 2 + (dy + 90) ** 2) / (2 * 140 ** 2))
shade = np.where(r < R_DIAL - 2, machined, ringshade)
for c, tint in enumerate((1.0, 1.0, 1.04)):
    body[..., c] = np.where(recess, shade * tint, body[..., c])
body[..., 3] = np.where(recess, 255, body[..., 3])
body[..., 3] = np.where(crown_m & (r > R_CASE - 2), 0, body[..., 3])

boxes = {
    "body": save(body, (0, 0, W, H), "body"),
    "dial": save(dial, (CX - R_DIAL - 1, CY - R_DIAL - 1, CX + R_DIAL + 1, CY + R_DIAL + 1), "dial"),
    "hands": save(hands, (CX - R_DIAL, CY - R_DIAL, CX + R_DIAL, CY + R_DIAL), "hands"),
    "bezel": save(bezel, (CX - R_CASE - 1, CY - R_CASE - 1, CX + R_CASE + 1, CY + R_CASE + 1), "bezel"),
    "crown": save(crown, (650, 600, W, 770), "crown"),
    "crystal": save(crys, (CX - R_GLASS, CY - R_GLASS, CX + R_GLASS, CY + R_GLASS), "crystal"),
}
json.dump({"canvas": [W, H], "pivot": [CX, CY], "boxes": boxes}, open(f"{OUT}/parts.json", "w"), indent=2)
print(json.dumps(boxes))
