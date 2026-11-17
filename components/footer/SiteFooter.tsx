import Image from "next/image";
import Link from "next/link";
import Newsletter from "./Newsletter";
import Year from "@/components/Year";
import { formatDate, sortedPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import s from "./SiteFooter.module.css";

const ext = (url: string) => (url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Watches", href: "/shop" },
      { label: "New Arrivals", href: "/shop?tag=new&sort=newest" },
      { label: "Bestsellers", href: "/shop?tag=bestseller" },
      { label: "On Sale", href: "/shop?tag=sale" },
      { label: "Classic", href: "/shop?cat=classic" },
      { label: "Sport", href: "/shop?cat=sport" },
      { label: "Modern", href: "/shop?cat=modern" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Pilot Series", href: "/shop?line=pilot" },
      { label: "Aurum Collection", href: "/shop?line=aurum" },
      { label: "Racer Line", href: "/shop?line=racer" },
      { label: "Naut Signature", href: "/shop?line=naut" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/collection#about" },
      { label: "Blog", href: "/blog" },
      { label: "Lookbook", href: "/collection" },
      { label: "Stores & Contact", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/policies/shipping" },
      { label: "Returns", href: "/policies/returns" },
      { label: "Warranty", href: "/policies/warranty" },
      { label: "Strap Size Guide", href: "/blog/how-to-find-your-strap-size" },
    ],
  },
];

const trust = [
  { text: "Free insured shipping over $500", d: "M3 7h11v9H3zM14 10h4l3 3v3h-7z" },
  { text: "5-year international warranty", d: "M12 3 5 6v5.5c0 4.3 3 7.8 7 9.5 4-1.7 7-5.2 7-9.5V6zM9 12l2 2 4-4" },
  { text: "Free returns within 30 days", d: "M4 9h11a5 5 0 0 1 0 10H8M8 5 4 9l4 4" },
  { text: "Secure payment", d: "M5 11h14v10H5zM8 11V8a4 4 0 0 1 8 0v3" },
];

const legal = [
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms & Conditions", href: "/policies/terms" },
  { label: "Cookies", href: "/policies/privacy#storage-cookies" },
];

export default function SiteFooter() {
  const latest = sortedPosts().slice(0, 2);

  return (
    <footer className={s.footer} id="footer">
      <div className={s.inner}>
        {/* Newsletter band */}
        <div className={s.newsBand}>
          <div>
            <span className={s.label}>*The {site.displayName} list</span>
            <h2 className={s.newsTitle}>New releases, first.</h2>
            <p className={s.newsText}>Early access to new watches and private sales, once a month. No spam.</p>
          </div>
          <Newsletter />
        </div>

        {/* Main grid */}
        <div className={s.grid}>
          <div className={s.brand}>
            <Link href="/" className={s.logo}>{site.name}</Link>
            <p>Precision wristwatches with Swiss-calibrated movements and sapphire crystal, made to be worn every day and kept for a lifetime.</p>
            <ul className={s.contact}>
              <li><a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>{site.address[0]}, {site.address[1]}</li>
            </ul>
            <div className={s.social}>
              <a href={site.social.instagram} aria-label="Instagram" {...ext(site.social.instagram)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
              </a>
              <a href={site.social.x} aria-label="X" {...ext(site.social.x)}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" /></svg>
              </a>
              <a href={site.social.tiktok} aria-label="TikTok" {...ext(site.social.tiktok)}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.4 2.2 1.8 3.7 4 3.9v3.1a7.6 7.6 0 0 1-4-1.2v6.4A6.2 6.2 0 1 1 10.4 9v3.2a3 3 0 1 0 3 3V3z" /></svg>
              </a>
            </div>
          </div>

          <nav className={s.cols} aria-label="Footer">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className={s.colTitle}>{c.title}</h3>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("mailto:") ? <a href={l.href}>{l.label}</a> : <Link href={l.href}>{l.label}</Link>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className={s.journal}>
            <h3 className={s.colTitle}>From the Journal</h3>
            <ul>
              {latest.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className={s.post}>
                    <span className={s.postImg}><Image src={p.image} alt="" fill sizes="72px" /></span>
                    <span>
                      <span className={s.postTitle}>{p.title}</span>
                      <span className={s.postMeta}>{p.category} · {formatDate(p.date)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className={s.more}>All articles →</Link>
          </div>
        </div>

        {/* Trust strip */}
        <ul className={s.trust}>
          {trust.map((t) => (
            <li key={t.text}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.d} /></svg>
              {t.text}
            </li>
          ))}
        </ul>

        {/* Bottom row */}
        <div className={s.bottom}>
          <p>© <Year initial={new Date().getFullYear()} /> {site.displayName}. All rights reserved.</p>
          <nav aria-label="Legal" className={s.legal}>
            {legal.map((l) => <Link key={l.label} href={l.href}>{l.label}</Link>)}
          </nav>
          <ul className={s.pay} aria-label="Accepted payments">
            {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </div>

      <div className={s.wordmark} aria-hidden="true">{site.name}</div>
    </footer>
  );
}
