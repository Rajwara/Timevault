import Link from "next/link";
import Logo from "./Logo";
import Year from "./Year";
import { site } from "@/lib/site";

const ext = (url: string) => (url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__about">
            <a href="#top" className="footer__logo">
              <Logo dot="#000" />
              {site.name}
            </a>
            <p>Explore our best products to find what you want; there you will definitely find it.</p>
          </div>
          <nav className="footer__links" aria-label="Footer">
            <a href="#features">About Us</a>
            <a href="#products">FAQ</a>
            <a href="#stories">Blog</a>
            <a href="#footer">Contact</a>
          </nav>
        </div>

        <div className="footer__cols">
          <div>
            <h4>Product</h4>
            <Link href="/collection">Full Collection</Link>
            <a href="#arrivals">Modern Watches</a>
            <a href="#arrivals">Sport Watches</a>
            <a href="#arrivals">Classic Watches</a>
          </div>
          <div>
            <h4>Location</h4>
            <address>
              <p>
                {site.address[0]}
                <br />
                {site.address[1]}
              </p>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__social">
            <a href={site.social.instagram} {...ext(site.social.instagram)} aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
            </a>
            <a href={site.social.x} {...ext(site.social.x)} aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" /></svg>
            </a>
            <a href={site.social.tiktok} {...ext(site.social.tiktok)} aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.4 2.2 1.8 3.7 4 3.9v3.1a7.6 7.6 0 0 1-4-1.2v6.4A6.2 6.2 0 1 1 10.4 9v3.2a3 3 0 1 0 3 3V3z" /></svg>
            </a>
          </div>
          <p className="footer__copy">
            © <Year initial={new Date().getFullYear()} /> {site.name}. All rights reserved.
          </p>
        </div>
      </div>
      <div className="footer__brand" aria-hidden="true">{site.name}</div>
    </footer>
  );
}
