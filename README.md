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

| URL | What it is | Content lives in |
| --- | --- | --- |
| `/` | Homepage (hero with rotating tile deck, products, features, arrivals, stories) | `lib/data.ts` |
| `/shop` | Product listing: filters, search, sort, grid/list, quick view, wishlist, bag | `lib/catalog.ts` |
| `/about` | About Us — brand story, collections, product lines, new arrivals, FAQ (`/collection` redirects here) | `lib/collection.ts` |
| `/contact` | Contact & Dubai store locator (map, hours, form) | `lib/stores.ts`, `lib/site.ts` |
| `/blog`, `/blog/<post>` | The Journal | `lib/blog.ts` |
| `/faq` | FAQ | `lib/faq-page.ts` |
| `/policies/privacy`, `terms`, `returns`, `shipping`, `warranty` | Policies (drafts — have them reviewed) | `lib/policies.ts` |

Shared on every page: header (`components/header/`), footer (`components/footer/`), welcome-offer popup with a floating "10% off" button (`components/WelcomePopup.tsx`), storefront loader (`lib/loader.ts`).

**Live time:** the homepage hero watch shows the visitor's local time (`components/LiveHands.tsx`) over `hero-watch-dial.webp`, the photo with its printed hands removed by `scripts/hero-dial.py`.

**Exploded watch:** the homepage features section breaks the watch apart and back together on scroll (`components/ExplodedWatch.tsx`). Part images are in `public/assets/explode/`; prompts for better AI-generated parts are in `docs/exploded-watch-prompts.md`.

**Currency:** prices are stored in USD and shown in the visitor's chosen currency (USD, AED, SAR, EUR, GBP) — rates in `lib/currency.ts`.

**Map:** the store locator uses Leaflet with free CARTO "Positron" tiles (no API key). Store names, phone numbers and hours in `lib/stores.ts` are **dummy data** — replace them.

**Forms:** the newsletter, welcome offer and contact form don't send data anywhere yet (the contact form opens the visitor's email app). Look for `TODO` in `components/` to connect an email provider or form service.

## Header

One header for every page (`components/header/SiteHeader.tsx`): rotating announcement bar, Watches mega menu, Collections and New & Sale dropdowns, "Shop All Watches" pill, centred wordmark, search (goes to `/shop?q=…`), language picker (English only for now), account menu, wishlist and bag with counts, and a slide-in menu on phones.

## Typography

Fonts are loaded with `next/font` in `lib/fonts.ts` and served from the site itself (no requests to Google at runtime).

| Font | Used for |
| --- | --- |
| Big Shoulders | Headings (uppercase), the logo, small uppercase labels, giant wordmarks |
| Space Grotesk | Body text, nav, buttons, product names, prices |

Sizes are defined once as CSS variables at the top of `app/globals.css` (`--fs-hero`, `--fs-h2`, `--fs-h3`, `--fs-body`, …):

| Element | Size | Weight / line height / spacing |
| --- | --- | --- |
| Home banner title | 52–128px (scales) | 500 / 0.9 / −0.04em |
| Shop banner title | 56–112px | 500 / 0.95 / −0.04em |
| Section heading (H2) | 56px (40px phones) | 500 / 1.14 / −0.04em |
| Product / quick-view title | 40–60px | 500 / 1 / −0.04em |
| Small label (`*The Collection`) | 16px | 500 / 24px / +0.01em |
| Card heading, product name (H3) | 20px (16px in phone grids) | 500 / 28px / −0.03em |
| Paragraph | 16px | 400 / 24px |
| Large paragraph | 18px | 400 / 27px |
| Small text | 14px | 400 / 20px |
| Buttons | 16px (14px small) | 500 / 1.25 / −0.02em |
| Nav links | 14px (15px ≥1600px) | 500 |
| Prices | 16px (24px in quick view) | 700 / −0.03em |

## Customise

- **Brand name (Time Vault), address, social links:** `lib/site.ts` — `name` is the wordmark, `displayName` is used in sentences
- **Products, arrivals, features, nav links:** `lib/data.ts`
- **Images:** `public/assets/` (served through `next/image`, so AVIF/WebP and responsive sizes are generated automatically)
- **Styles:** `app/globals.css`
- **Fonts:** `lib/fonts.ts` (see Typography above)

## Structure

```
app/          layout, page, global CSS, icon, robots.txt, sitemap.xml, 404
components/   page sections (Hero, Intro, Products, Features, Arrivals, Stories, Footer) and interactive pieces
lib/          site config, content data, motion helpers
public/assets watch photography
```
