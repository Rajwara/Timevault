"""
Remove the printed hands from public/assets/hero-watch.webp so live hands can be drawn on top.
Writes public/assets/hero-watch-dial.webp.  Run from the repo root: python3 scripts/hero-dial.py
(needs: pip install numpy pillow opencv-python-headless)

How: the area under the hands is rebuilt as (smooth dial lighting) + (fine detail copied from the same spot
rotated by a multiple of 30 degrees), so hour markers and minute ticks continue exactly where they should.
"""
import math
import cv2
import numpy as np
from PIL import Image

SRC, OUT = "public/assets/hero-watch.webp", "public/assets/hero-watch-dial.webp"
CX, CY = 335.0, 500.0      # hand pivot
RX, RY = 248.0, 259.0      # dial edge (slightly elliptical: the photo is a little tilted)

im = np.asarray(Image.open(SRC).convert("RGBA")).copy()
H, W = im.shape[:2]
src = im[..., :3].astype(np.float32)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
dx, dy = xx - CX, yy - CY
u, v = dx / RX, dy / RY                     # normalised dial coordinates
rn = np.hypot(u, v)
ang = np.degrees(np.arctan2(v, u))

def band(theta, length, half_w, back=0.0):
    t = math.radians(theta)
    ux, uy = math.cos(t), math.sin(t)
    along = dx * ux + dy * uy
    across = np.abs(-dx * uy + dy * ux)
    return (along > -back) & (along < length) & (across < half_w)

mask = (band(-142.8, 172, 22, back=20) | band(-36.1, 245, 20, back=20) | band(134.2, 256, 7, back=60) | (np.hypot(dx, dy) < 34))
shadow = np.zeros_like(mask)
for oy, ox in [(5, 3), (10, 7), (14, 10)]:      # the hands cast a soft shadow down and to the right
    shadow[oy:, ox:] |= mask[:-oy, :-ox]
mask = cv2.dilate((mask | shadow).astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)
# rebuild the whole 2 o'clock marker (the minute hand covered part of it)
mask |= (np.abs(ang + 30) < 8) & (rn > 0.66) & (rn < 0.98)

# 1) smooth dial lighting from clean, dark dial pixels (normalised convolution)
lum = src @ np.array([0.3, 0.59, 0.11], np.float32)
valid = ((~mask) & (lum < 70) & (rn < 0.97)).astype(np.float32)
num = cv2.GaussianBlur(src * valid[..., None], (0, 0), 14)
den = cv2.GaussianBlur(valid, (0, 0), 14)[..., None]
field = num / np.maximum(den, 1e-3)

# 2) detail = image minus lighting, taken from the same spot rotated by k*30 degrees
detail = src - field
avoid_numerals = lambda a, r: ((np.abs(a + 90) < 28) | (np.abs(a - 90) < 28)) & (r > 0.35)  # the 12 and the 6
patched = field.copy()
done = ~mask
for k in [1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6]:
    t = math.radians(30 * k)
    su = u * math.cos(t) - v * math.sin(t); sv = u * math.sin(t) + v * math.cos(t)
    sx = np.clip(np.rint(CX + su * RX), 0, W - 1).astype(int); sy = np.clip(np.rint(CY + sv * RY), 0, H - 1).astype(int)
    sa = np.degrees(np.arctan2(sv, su))
    ok = ~done & ~mask[sy, sx] & ~avoid_numerals(sa, rn) & (rn < 1.0)
    patched[ok] = field[ok] + detail[sy[ok], sx[ok]]
    done |= ok
# the centre (r < 34 px) has no detail to copy: lighting only, plus a little grain
grain = np.random.default_rng(3).normal(0, 1.5, src.shape[:2])[..., None]
patched = np.where(done[..., None], patched, field + grain)

soft = cv2.GaussianBlur(mask.astype(np.float32), (0, 0), 1.2)[..., None]
im[..., :3] = np.clip(src * (1 - soft) + patched * soft, 0, 255).astype(np.uint8)
Image.fromarray(im, "RGBA").save(OUT, quality=92, method=6)
print("wrote", OUT)
