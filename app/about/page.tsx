import type { Metadata } from "next";
import { CartProvider } from "@/components/collection/Cart";
import Hero from "@/components/collection/Hero";
import About from "@/components/collection/About";
import Collections from "@/components/collection/Collections";
import Brands from "@/components/collection/Brands";
import Arrivals from "@/components/collection/Arrivals";
import Faq from "@/components/collection/Faq";
import { faqs } from "@/lib/collection";
import RevealObserver from "@/components/RevealObserver";
import s from "@/components/collection/collection.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story behind Time Vault: Swiss-calibrated movements, hand-finished cases and four watch families built to be worn every day and kept for a lifetime.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", images: [{ url: "/assets/hero-watch.webp", width: 843, height: 1100 }] },
};

export default function AboutPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <CartProvider>
      <div className={`${s.page}`} id="top">
        <main id="main">
          <Hero />
          <About />
          <Collections />
          <Brands />
          <Arrivals />
          <Faq />
        </main>
        <RevealObserver />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </CartProvider>
  );
}
