import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Btn from "@/components/content/Btn";
import FaqList from "@/components/content/FaqList";
import { FAQ } from "@/lib/faq-page";
import { site } from "@/lib/site";
import s from "@/components/content/content.module.css";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers about ordering, shipping, returns, the 5-year warranty and caring for your ${site.displayName} watch.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const total = FAQ.reduce((n, g) => n + g.items.length, 0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main id="main" className={s.page}>
      <section className={s.faqHero}>
        <div className={s.faqHeroCopy}>
          <div className={s.crumb}><Link href="/">Home</Link> / FAQ</div>
          <span className={s.label}>*Help centre</span>
          <h1>Questions &amp; Answers</h1>
          <p>Everything about ordering, delivery, returns, the warranty and caring for your watch, answered by our team.</p>
        </div>
        <div className={s.faqHeroPic}>
          <Image src="/assets/story-2b.webp" alt="" fill priority sizes="(max-width: 991px) 100vw, 50vw" />
        </div>
      </section>

      <div className={`${s.container} ${s.faqWrap}`}>
        <div className={s.faqHead}>
          <div>
            <span className={s.label}>*Frequently asked</span>
            <h2>How can we help?</h2>
          </div>
          <p>{total} answers across {FAQ.length} topics. Pick a topic, or click any question to open it.</p>
        </div>
        <FaqList groups={FAQ} />
      </div>

      <section className={s.cta}>
        <div className={`${s.container} ${s.ctaRow}`}>
          <div>
            <span className={s.label}>*Still have a question?</span>
            <h2>Talk to a watch specialist</h2>
            <p>Email our team and a real person will reply within one business day.</p>
          </div>
          <div className={s.ctaBtns}>
            <Btn href={`mailto:${site.email}`} label="Email us" variant="light" />
            <Btn href="/policies/shipping" label="Shipping & returns" variant="lineDark" />
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
