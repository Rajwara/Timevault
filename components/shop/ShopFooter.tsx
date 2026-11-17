"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import s from "@/app/shop/shop.module.css";

export default function ShopFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setStatus("error"); return; }
    setStatus("done");
    setEmail("");
  };

  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.footerGrid}`}>
        <div className={s.footerAbout}>
          <Link href="/" className={s.logo}>{site.name}</Link>
          <p>Precision wristwatches with Swiss-calibrated movements, sapphire crystal and a 5-year warranty — made to be worn every day.</p>
          <div className={s.social}>
            <a href={site.social.instagram} aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg></a>
            <a href={site.social.x} aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" /></svg></a>
            <a href={site.social.tiktok} aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.4 2.2 1.8 3.7 4 3.9v3.1a7.6 7.6 0 0 1-4-1.2v6.4A6.2 6.2 0 1 1 10.4 9v3.2a3 3 0 1 0 3 3V3z" /></svg></a>
          </div>
        </div>

        <nav className={s.footerLinks} aria-label="Footer">
          <div>
            <h3>Shop</h3>
            <Link href="/shop">All Watches</Link>
            <Link href="/shop?tag=new&sort=newest">New Arrivals</Link>
            <Link href="/shop?tag=sale">On Sale</Link>
            <Link href="/shop?tag=bestseller">Bestsellers</Link>
          </div>
          <div>
            <h3>Help</h3>
            <Link href="/collection?faq=0#faq">Delivery</Link>
            <Link href="/collection?faq=2#faq">Returns</Link>
            <Link href="/collection?faq=1#faq">Warranty</Link>
            <Link href="/collection#faq">FAQ</Link>
          </div>
        </nav>

        <div className={s.newsletter}>
          <h3>Newsletter</h3>
          <p>New releases and private sales, once a month. No spam.</p>
          <form onSubmit={submit} noValidate>
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input
              id="nl-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              aria-invalid={status === "error"}
              aria-describedby="nl-msg"
              onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
            />
            <button type="submit">Subscribe</button>
          </form>
          <p id="nl-msg" className={s.nlMsg} aria-live="polite">
            {status === "error" && "Please enter a valid email address."}
            {status === "done" && "Thanks — you're on the list."}
          </p>
          <ul className={s.payments} aria-label="Accepted payments">
            {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </div>
      <div className={s.copy}>
        <div className={s.wrap}>
          <span>© {new Date().getFullYear()} {site.displayName}. All rights reserved.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
