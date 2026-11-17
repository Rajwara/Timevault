"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./Cart";
import { BagIcon } from "./Icons";
import MegaMenu from "@/components/MegaMenu";
import { site } from "@/lib/site";
import s from "@/app/collection/collection.module.css";

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={s.header}>
      <nav className={s.nav} aria-label="Main">
        <div className={`${s.navGroup} ${s.navLeft}`}>
          <Link href="/" className={s.navPill}><span className={s.dot} />Home</Link>
          <MegaMenu triggerClassName={s.navPill} />
          <a href="#about" className={s.navPill}>Our Story</a>
        </div>

        <Link href="/collection" className={s.logo} aria-label={`${site.displayName} lookbook`}>{site.name}</Link>

        <div className={`${s.navGroup} ${s.navRight}`}>
          <Link href="/shop" className={s.navPill}>Shop</Link>
          <a href="#arrivals" className={s.navPill}>New In</a>
          <a href="#faq" className={`${s.navPill} ${s.navOutline}`}>Contact Us</a>
        </div>

        <div className={s.navTools}>
          <a href="#collections" className={s.bag} aria-label={`Shopping bag, ${count} item${count === 1 ? "" : "s"}`}>
            <BagIcon />
            {count > 0 && <span className={s.bagCount} aria-hidden="true">{count}</span>}
          </a>
          <button
            type="button"
            className={s.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="collection-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </nav>

      <div id="collection-menu" className={`${s.mobileMenu} ${open ? s.mobileMenuOpen : ""}`} hidden={!open}>
        <Link href="/" onClick={close}>Home</Link>
        <Link href="/shop" onClick={close}>Shop</Link>
        <MegaMenu mode="mobile" triggerClassName={s.mobileMega} onNavigate={close} />
        <a href="#about" onClick={close}>Our Story</a>
        <a href="#arrivals" onClick={close}>New In</a>
        <a href="#faq" onClick={close}>Contact Us</a>
      </div>
    </header>
  );
}
