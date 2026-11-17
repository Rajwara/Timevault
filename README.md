# VANTA — Precision Wristwatches

A Next.js (App Router, TypeScript) landing page for a watch brand. Converted from a static HTML/CSS/JS site.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, click **Add New → Project** and import the repository. The defaults are correct (Framework: Next.js, build command `next build`).
3. Optional: under **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to your custom domain (e.g. `https://yourdomain.com`) so social-share images, the sitemap and canonical URLs use it. Without it, Vercel's production URL is used.

## Pages

- `/` — the VANTA homepage (dark, animated)
- `/collection` — a light, gallery-style shop page (Orbitron headings, Inter body) with collections, product lines, new arrivals, FAQ and a working bag counter. Content lives in `lib/collection.ts`, styles in `app/collection/collection.module.css`.

## Customise

- **Brand name, address, social links:** `lib/site.ts`
- **Products, arrivals, features, nav links:** `lib/data.ts`
- **Images:** `public/assets/` (served through `next/image`, so AVIF/WebP and responsive sizes are generated automatically)
- **Styles:** `app/globals.css`
- **Fonts:** `app/fonts/` (self-hosted via `next/font/local`, no external requests)

## Structure

```
app/          layout, page, global CSS, icon, robots.txt, sitemap.xml, 404
components/   page sections (Hero, Intro, Products, Features, Arrivals, Stories, Footer) and interactive pieces
lib/          site config, content data, motion helpers
public/assets watch photography
```
