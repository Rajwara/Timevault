import type { Metadata } from "next";
import { Suspense } from "react";
import Shop, { ShopFromUrl } from "@/components/shop/Shop";
import { products } from "@/lib/catalog";
import { site, siteUrl } from "@/lib/site";
import s from "./shop.module.css";

export const metadata: Metadata = {
  title: "Shop All Watches",
  description: "Shop every watch: filter by collection, style, dial colour, strap, price and case size. Free insured shipping over $500 and a 5-year warranty.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", images: [{ url: "/assets/product-2.webp", width: 496, height: 800 }] },
};

export default function ShopPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.displayName} — all watches`,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.blurb,
        image: `${siteUrl()}${p.image}`,
        brand: { "@type": "Brand", name: site.displayName },
        offers: { "@type": "Offer", priceCurrency: "USD", price: p.price, availability: "https://schema.org/InStock" },
      },
    })),
  };

  return (
    <div className={`${s.page}`} id="top">
      <main id="main">
        {/* The URL holds filters/sort/page; the fallback renders the unfiltered list for the static HTML. */}
        <Suspense fallback={<Shop query="" />}>
          <ShopFromUrl />
        </Suspense>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
