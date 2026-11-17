# Time Vault — Precision Wristwatches

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

- `/` — the Time Vault homepage (dark, animated)
- `/collection` — a light, gallery-style shop page (Orbitron headings, Inter body) with collections, product lines, new arrivals, FAQ and a working bag counter. Content lives in `lib/collection.ts`, styles in `app/collection/collection.module.css`.

- `/shop` — product listing with filters (collection, style, dial colour, strap, price, case size, tags), search, sort, grid/list views, pagination, quick view, wishlist and bag (saved in the browser). Filters live in the URL, so links like `/shop?cat=sport` or `/shop?line=aurum&sort=price-asc` work. Products are in `lib/catalog.ts`.

The **Collections** mega menu (`components/MegaMenu.tsx`, links in `lib/menu.ts`) appears on all three pages.

The full-screen **page loader** is the storefront-loader snippet, used verbatim from `lib/loader.ts` and injected right after `<body>` in `app/layout.tsx`. Its animation is a GIF hosted on another Shopify store; to use your own, put a file in `public/` and change the `url(...)` in `lib/loader.ts`.

## Customise

- **Brand name (Time Vault), address, social links:** `lib/site.ts` — `name` is the wordmark, `displayName` is used in sentences
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
