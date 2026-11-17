import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Products from "@/components/Products";
import Features from "@/components/Features";
import Arrivals from "@/components/Arrivals";
import Stories from "@/components/Stories";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import { arrivals, products } from "@/lib/data";
import { site, siteUrl } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} watches`,
    itemListElement: [...products, ...arrivals].map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.desc,
        image: `${siteUrl()}${p.image}`,
        brand: { "@type": "Brand", name: site.name },
        offers: { "@type": "Offer", priceCurrency: "USD", price: p.price.replace(/[^0-9.]/g, ""), availability: "https://schema.org/InStock" },
      },
    })),
  };

  return (
    <>
      <Hero />
      <main id="main">
        <Intro />
        <Products />
        <Features />
        <Arrivals />
        <Stories />
      </main>
      <Footer />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
