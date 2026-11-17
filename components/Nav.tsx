"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import MegaMenu from "./MegaMenu";
import { navLinks } from "@/lib/data";
import { site } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const linksRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!linksRef.current?.contains(t) && !burgerRef.current?.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="nav" aria-label="Main">
      <a href="#top" className="nav__logo" aria-label={`${site.name} home`}>
        <Logo />
      </a>
      <div className={`nav__links${open ? " is-open" : ""}`} id="nav-links" ref={linksRef}>
        {navLinks.map((l) => (
          <a
            key={l.id}
            href={l.href}
            className={active === l.id ? "is-active" : undefined}
            aria-current={active === l.id ? "true" : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
        <MegaMenu mode="auto" compactQuery="(max-width: 760px)" triggerClassName="nav__mega" onNavigate={() => setOpen(false)} />
      </div>
      <a href="#footer" className="nav__contact">Contact Us</a>
      <button
        ref={burgerRef}
        className="nav__burger"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
      </button>
    </nav>
  );
}
