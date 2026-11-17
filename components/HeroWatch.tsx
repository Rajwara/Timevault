"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";

/** The hero watch drifts and rotates as you scroll away from the hero. */
export default function HeroWatch() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const hero = el?.closest<HTMLElement>(".hero");
    if (!el || !hero || prefersReducedMotion()) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const p = clamp(window.scrollY / hero.offsetHeight, 0, 1);
      el.style.setProperty("--scroll", p.toFixed(3));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hero__watch" ref={ref}>
      <div className="hero__watch-float">
        <div className="ph">
          <Image
            src="/assets/hero-watch.webp"
            alt="Steel wristwatch with black rubber strap"
            width={843}
            height={1100}
            priority
            sizes="(max-width: 760px) 86vw, 540px"
          />
        </div>
      </div>
    </div>
  );
}
