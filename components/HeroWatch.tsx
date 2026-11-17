"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";
import LiveHands from "./LiveHands";

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
        <div className="ph hero__face">
          <Image
            src="/assets/hero-watch-dial.webp"
            alt="Steel wristwatch with black rubber strap"
            width={843}
            height={1100}
            priority
            quality={90}
            sizes="(max-width: 760px) 86vw, 540px"
          />
          <LiveHands />
        </div>
      </div>
    </div>
  );
}
