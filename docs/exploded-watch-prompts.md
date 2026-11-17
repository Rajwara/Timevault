# Exploded watch — AI image prompts

The homepage "Crafted Premium Materials" section breaks the watch into parts as you scroll, then puts it back together.
Right now the parts are **cut out of the existing photo** (`public/assets/feature-watch.webp`) by `scripts/split-watch.py`.
They work, but two things can only come from new images:

- **body** — the open case currently shows an empty steel recess; a real one should show the **movement** (gears, balance wheel, jewels).
- **dial** — the hands were painted out by software; a clean render will be sharper.

Every other part is optional (it's already cut cleanly), but you can regenerate all of them for the best result.

## Option A (recommended): edit the existing photo

Alignment is what makes the effect work, and editing the existing photo keeps everything lined up automatically.
Use any **inpainting / generative fill** tool (Photoshop Generative Fill, Adobe Firefly, Canva Magic Edit, Leonardo Canvas, Midjourney Vary Region…):

1. Open `public/assets/feature-watch.webp` (721 × 1400, transparent background).
2. Select the area named below, paste the prompt, generate, and export as PNG/WebP **at the same size**.

| Save as | Select | Prompt |
| --- | --- | --- |
| `body.webp` | the whole dial **and** bezel (the round face, out to the edge of the case) | `open stainless steel watch case seen straight from above, bezel and dial removed, showing a finely finished automatic mechanical movement: brushed steel bridges with Geneva stripes, gold-coloured gear train, a balance wheel at 8 o'clock, red ruby jewels, blued screws, a semicircular rotor partly covering the movement. Matches the brushed steel and lighting of the surrounding case. Photorealistic product render, soft studio light.` |
| `dial.webp` | only the hands and the centre cap | `remove the watch hands, plain matte anthracite grey dial surface continuing underneath, same grain and lighting, keep all hour markers and the small seconds sub-dial unchanged` |

Then crop `dial.webp` to the dial circle exactly as described in the sizes table below (or just send the full image to me and I'll crop it).

## Option B: generate each part from scratch

Use `feature-watch.webp` as the **image/style reference** for every prompt so the parts match the watch on the site.
Every part must be a **flat, straight-on view** (the website adds the 3D tilt) on a **transparent background**.

**Watch description** (paste where it says `[WATCH]`):

> a modern steel field watch: 40 mm round brushed stainless-steel case, flat brushed steel bezel fixed with four flat-head slotted screws at 1:30, 4:30, 7:30 and 10:30, matte anthracite grey dial with applied polished steel baton hour markers, a small-seconds sub-dial at 6 o'clock with a fine white scale, brushed steel baton hour and minute hands, a thin orange centre seconds hand with an orange centre cap, a knurled steel crown at 3 o'clock, and a black ribbed nylon NATO strap with brushed steel keepers running straight up and down

**Negative prompt** (use for all):

> text, letters, numbers, logos, brand name, watermark, wrist, hand, person, table, props, angled view, perspective, tilt, shadow on background, cropped edges, blur, low quality

| # | Save as | Size (px) | Prompt |
| --- | --- | --- | --- |
| 1 | `body.webp` | 721 × 1400 | `Perfectly straight-on front view, orthographic, centred. [WATCH], with the crystal, bezel, dial, hands and crown removed: the open steel case seen from the top showing a finely finished automatic movement (brushed bridges, gold gears, balance wheel, red jewels, blued screws), with the NATO strap running straight up and down to the edges of the frame. Transparent background. Photorealistic product render, soft studio lighting, ultra sharp.` |
| 2 | `dial.webp` | 542 × 542 | `Perfectly straight-on view, orthographic. Only the round dial disc of [WATCH]: matte anthracite grey, applied polished steel baton markers, small-seconds sub-dial at 6 o'clock with its own tiny hand, a small hole in the centre, NO main hands. The disc fills the square edge to edge. Transparent background. Photorealistic, ultra sharp.` |
| 3 | `hands.webp` | 540 × 540 | `Perfectly straight-on view. Only the three main hands of [WATCH], joined at a centre pinion placed EXACTLY in the centre of the square: brushed steel baton hour hand pointing to 10, brushed steel baton minute hand pointing to 2, thin orange seconds hand pointing to 7:40 with a short tail, orange centre cap. Nothing else. Transparent background. Do not crop tightly.` |
| 4 | `bezel.webp` | 678 × 678 | `Perfectly straight-on view. Only the flat bezel ring of [WATCH]: brushed stainless steel with polished inner edge and four flat-head slotted screws at 1:30, 4:30, 7:30 and 10:30. Empty centre. The ring fills the square edge to edge. Transparent background.` |
| 5 | `crystal.webp` | 548 × 548 | `Perfectly straight-on view. A round flat sapphire watch crystal disc, clear glass with a faint blue-grey anti-reflective tint, subtle bevelled edge and one soft diagonal reflection. Fills the square edge to edge. Transparent background.` |
| 6 | `crown.webp` | 71 × 170 | `Straight-on side view of the knurled stainless-steel winding crown of [WATCH] with a short tube, crown on the right, tube pointing left. Transparent background. Crop tightly.` |

Tips:
- Generate **body.webp first**, then use it as the reference for the others.
- Larger images are fine (e.g. 2× the sizes above) as long as the **shape (aspect ratio) is the same**.
- `hands.webp` must keep the pinion in the exact centre of the square, or the hands won't sit on the dial.

## Putting them on the site

Current parts (case with movement, dial, bezel, crystal, crown) are AI-generated originals kept in `assets-src/explode/`. To refit them after changing any, run `python3 scripts/place-parts.py` — it scales and centres each part on the watch and updates `public/assets/explode/`. The hands are still cut from the photo.


Put the files in `public/assets/explode/` with the exact names above (replacing the current ones), or send them to me and I'll drop them in, crop them and check the alignment.
To rebuild the cut-out versions at any time: `python3 scripts/split-watch.py` (needs `pip install numpy pillow opencv-python-headless`).
