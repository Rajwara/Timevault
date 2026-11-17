import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import StoreLocator from "@/components/contact/StoreLocator";
import { STORES, telHref } from "@/lib/stores";
import { site, siteUrl } from "@/lib/site";
import s from "@/components/contact/contact.module.css";

export const metadata: Metadata = {
  title: "Contact & Stores",
  description: `Visit ${site.displayName} in Dubai: boutiques in The Dubai Mall, Mall of the Emirates, Dubai Marina and more, plus our service centre in Al Quoz. Call, WhatsApp or email us.`,
  alternates: { canonical: "/contact" },
};

const wa = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;

const quick = [
  { label: "Call us", value: site.phone, href: telHref(site.phone), note: "Sun – Fri, 9am – 9pm", d: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" },
  { label: "WhatsApp", value: site.whatsapp, href: wa, note: "Replies within the hour", d: "M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1.2 1.8.8-.3 1.4c-3.5.5-7.7-3.7-7.2-7.2l1.4-.3.8 1.8z", external: true },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, note: "Reply within one business day", d: "M3 6h18v12H3zM3 7l9 6 9-6" },
  { label: "Head office", value: site.address[0], href: "#locations", note: site.address[1], d: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" },
];

const care = [
  { days: "Sunday – Thursday", time: "9am – 9pm" },
  { days: "Friday", time: "2pm – 9pm" },
  { days: "Saturday", time: "10am – 6pm" },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": STORES.map((st) => ({
      "@type": "Store",
      name: `${site.displayName} — ${st.name}`,
      image: `${siteUrl()}${st.image}`,
      telephone: st.phone,
      address: { "@type": "PostalAddress", streetAddress: st.address, addressLocality: "Dubai", addressCountry: "AE" },
      geo: { "@type": "GeoCoordinates", latitude: st.lat, longitude: st.lng },
    })),
  };

  return (
    <main id="main" className={s.page}>
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.crumb}><Link href="/">Home</Link> / Contact</div>
          <span className={s.label}>*Contact &amp; stores</span>
          <h1>Visit us in Dubai</h1>
          <p>
            Try on any watch at one of our {STORES.filter((x) => x.type === "boutique").length} boutiques across Dubai, or bring yours to our
            service centre in Al Quoz. Prefer to talk first? Call, WhatsApp or email — a real person replies.
          </p>
        </div>
        <ul className={s.quick}>
          {quick.map((q) => (
            <li key={q.label}>
              <a href={q.href} {...(q.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className={s.quickIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={q.d} /></svg>
                </span>
                <span className={s.quickLabel}>{q.label}</span>
                <span className={s.quickValue}>{q.value}</span>
                <span className={s.quickNote}>{q.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.locator} id="locations" aria-labelledby="loc-title">
        <div className={s.head}>
          <div>
            <span className={s.label}>*Store locator</span>
            <h2 id="loc-title">Find a boutique</h2>
          </div>
          <p>All boutiques size bracelets and fit straps while you wait. Hours are local Dubai time (GST).</p>
        </div>
        <StoreLocator />
      </section>

      <section className={s.contactRow} aria-labelledby="form-title">
        <div className={s.careCol}>
          <span className={s.label}>*Customer care</span>
          <h2 id="form-title">Send us a message</h2>
          <p className={s.careText}>Questions about an order, a watch or a service? Our Dubai team answers every message within one business day.</p>
          <dl className={s.careHours}>
            {care.map((c) => <div key={c.days}><dt>{c.days}</dt><dd>{c.time}</dd></div>)}
          </dl>
          <div className={s.careBox}>
            <b>Servicing &amp; repairs</b>
            <p>Drop your watch at any boutique or our Al Quoz service centre. Free collection across Dubai for warranty repairs.</p>
            <Link href="/policies/warranty">Warranty &amp; service →</Link>
          </div>
        </div>
        <ContactForm />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
