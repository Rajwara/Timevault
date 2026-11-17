"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

const ROTATE_MS = 15000; // the front tile changes every 15 seconds

const tiles = [
  { title: "Shop Wristwatches", sub: "Free insured shipping over $500", href: "/shop", image: "/assets/video-thumb.webp", w: 800, h: 500, play: true },
  { title: "New Arrivals", sub: "Six new pieces this season", href: "/shop?tag=new&sort=newest", image: "/assets/story-2b.webp", w: 1200, h: 1000 },
  { title: "Winter Sale", sub: "Up to 25% off selected watches", href: "/shop?tag=sale", image: "/assets/story-2a.webp", w: 1200, h: 1000 },
];

/** Stack of three glass tiles in the hero. The front one links somewhere; every 15s it moves to the back. */
export default function HeroDeck() {
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setFront((f) => (f + 1) % tiles.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused, front]); // restarting on `front` gives a full 15s after a manual change

  return (
    <div
      className="hero__deck"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {tiles.map((t, i) => {
        const pos = (i - front + tiles.length) % tiles.length; // 0 = front, 1 = middle, 2 = back
        return (
          <Link
            key={t.title}
            href={t.href}
            className={`hero__tile${pos === 0 ? " is-front" : ""}`}
            style={{ "--pos": pos } as CSSProperties}
            aria-hidden={pos !== 0}
            tabIndex={pos === 0 ? 0 : -1}
          >
            <span className="hero__tile-inner">
              <span className="hero__video-media">
                <Image src={t.image} alt="" width={t.w} height={t.h} sizes="230px" priority={i === 0} className="hero__tile-img" />
                {t.play && (
                  <span className="hero__play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
                  </span>
                )}
              </span>
              <span className="hero__video-title">{t.title}</span>
              <span className="hero__video-sub">{t.sub}</span>
            </span>
          </Link>
        );
      })}
      <div className="hero__deck-dots">
        {tiles.map((t, i) => (
          <button key={t.title} type="button" aria-label={`Show ${t.title}`} aria-current={i === front ? "true" : undefined} onClick={() => setFront(i)} />
        ))}
      </div>
    </div>
  );
}
