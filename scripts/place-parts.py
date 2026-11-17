"""
Fit AI-generated watch parts (assets-src/explode/*.webp) onto the geometry of feature-watch.webp and write
them to public/assets/explode/, updating parts.json. Run from the repo root:  python3 scripts/place-parts.py
Any part missing from assets-src/explode keeps its current image (e.g. hands, cut from the photo).
"""
import json, os
import numpy as np
from PIL import Image

SRC, OUT = "assets-src/explode", "public/assets/explode"
meta = json.load(open(f"{OUT}/parts.json"))
W, H = meta["canvas"]
PX, PY = meta["pivot"]          # hand pivot: every round part is centred here
R_CASE, R_DIAL, R_GLASS = 339.0, 292.0, 295.0  # dial fills the new bezel opening

def rgba(name):
    return Image.open(f"{SRC}/{name}.webp").convert("RGBA")

def alpha_bbox(im, th=20):
    a = np.asarray(im)[..., 3]
    ys, xs = np.where(a > th)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1

def save(im, name, x, y):
    im.save(f"{OUT}/{name}.webp", quality=90, method=6)
    meta["boxes"][name] = [int(round(x)), int(round(y)), im.width, im.height]

def round_part(name, radius, alpha_scale=None):
    im = rgba(name).crop(alpha_bbox(rgba(name)))
    d = int(round(radius * 2))
    im = im.resize((d, d), Image.LANCZOS)
    if alpha_scale:
        im = alpha_scale(im)
    save(im, name, PX - d / 2, PY - d / 2)

def fit_case(im):
    """Least-squares circle through the left/right edges of the case."""
    m = np.asarray(im)[..., 3] > 128
    pts = []
    for y in range(420, 960, 4):
        xs = np.where(m[y])[0]
        if xs.size:
            pts.append((xs.min(), y))
            if not 600 < y < 780:      # skip the crown side around 3 o'clock
                pts.append((xs.max(), y))
    P = np.array(pts, float)
    A = np.c_[2 * P[:, 0], 2 * P[:, 1], np.ones(len(P))]
    cx, cy, c = np.linalg.lstsq(A, (P ** 2).sum(1), rcond=None)[0]
    return cx, cy, np.sqrt(c + cx ** 2 + cy ** 2)

if os.path.exists(f"{SRC}/body.webp"):
    im = rgba("body")
    cx, cy, r = fit_case(im)
    s = R_CASE / r
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    canvas = Image.new("RGBA", (W, H))
    canvas.alpha_composite(im, (round(PX - cx * s), round(PY - cy * s)))
    save(canvas, "body", 0, 0)
    print(f"body: case centre ({cx:.1f},{cy:.1f}) r={r:.1f} -> scale {s:.3f}")

if os.path.exists(f"{SRC}/dial.webp"):
    round_part("dial", R_DIAL)

if os.path.exists(f"{SRC}/bezel.webp"):
    round_part("bezel", R_CASE)

def thin_glass(im):
    a = np.asarray(im).copy()
    # keep the bright rim, make the flat white body of the glass much more see-through
    a[..., 3] = (a[..., 3].astype(np.float32) * 0.35).astype(np.uint8)
    return Image.fromarray(a, "RGBA")

if os.path.exists(f"{SRC}/crystal.webp"):
    round_part("crystal", R_GLASS, thin_glass)

if os.path.exists(f"{SRC}/crown.webp"):
    im = rgba("crown")
    im = im.crop(alpha_bbox(im))
    h = 170
    im = im.resize((round(im.width * h / im.height), h), Image.LANCZOS)
    save(im, "crown", PX + R_CASE - 12, PY - h / 2)   # stem tucked just inside the case edge

import hashlib
meta["version"] = hashlib.md5(b"".join(open(f"{OUT}/{k}.webp", "rb").read() for k in sorted(meta["boxes"]))).hexdigest()[:8]
json.dump(meta, open(f"{OUT}/parts.json", "w"), indent=2)
print(json.dumps(meta["boxes"]))
