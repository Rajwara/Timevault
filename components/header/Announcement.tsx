"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import s from "./SiteHeader.module.css";

const icon = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

const messages = [
  { text: "Free insured shipping on orders over $500", href: "/policies/shipping",
    icon: <svg {...icon}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17.5" cy="17.5" r="1.6" /></svg> },
  { text: "Winter sale — up to 25% off selected watches", href: "/shop?tag=sale",
    icon: <svg {...icon}><path d="M3.5 12.5 12 4h7.5v7.5L11 20z" /><circle cx="15.5" cy="8.5" r="1.3" /></svg> },
  { text: "5-year international warranty on every watch", href: "/policies/warranty",
    icon: <svg {...icon}><path d="M12 3 5 6v5.5c0 4.3 3 7.8 7 9.5 4-1.7 7-5.2 7-9.5V6z" /><path d="m9 12 2 2 4-4" /></svg> },
  { text: "Free returns within 30 days", href: "/policies/returns",
    icon: <svg {...icon}><path d="M4 9h11a5 5 0 0 1 0 10H8" /><path d="m8 5-4 4 4 4" /></svg> },
];

export default function Announcement() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const m = messages[i];
  const go = (d: number) => setI((v) => (v + d + messages.length) % messages.length);

  return (
    <div
      className={s.announce}
      role="region"
      aria-roledescription="carousel"
      aria-label="Store announcements"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button type="button" className={s.announceArrow} aria-label="Previous announcement" onClick={() => go(-1)}>
        <svg {...icon}><path d="m15 6-6 6 6 6" /></svg>
      </button>
      <Link href={m.href} className={s.announceMsg} key={i} aria-live={paused ? "polite" : "off"}>
        {m.icon}
        <span>{m.text}</span>
      </Link>
      <button type="button" className={s.announceArrow} aria-label="Next announcement" onClick={() => go(1)}>
        <svg {...icon}><path d="m9 6 6 6-6 6" /></svg>
      </button>
    </div>
  );
}
