import Link from "next/link";
import { site } from "@/lib/site";
import s from "@/app/collection/collection.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerTop}>
        <div>
          <Link href="/collection" className={s.logo}>{site.name}</Link>
          <p>Precision wristwatches, designed to be worn every day and kept for a lifetime.</p>
        </div>
        <nav aria-label="Footer" className={s.footerLinks}>
          <div>
            <h4>Shop</h4>
            <a href="#collections">Collections</a>
            <a href="#arrivals">New Arrivals</a>
            <a href="#brands">Our Lines</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#about">Our Story</a>
            <a href="#faq">FAQ</a>
            <Link href="/">Home</Link>
          </div>
          <div>
            <h4>Visit</h4>
            <address>{site.address[0]}<br />{site.address[1]}</address>
          </div>
        </nav>
      </div>
      <div className={s.footerBottom}>
        <span>© {new Date().getFullYear()} {site.displayName}. All rights reserved.</span>
        <a href="#top">Back to top ↑</a>
      </div>
      <span className={s.footerWord} aria-hidden="true">{site.name}</span>
    </footer>
  );
}
