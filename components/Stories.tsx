"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { clamp, hasFinePointer } from "@/lib/motion";

export default function Stories() {
  const cursor = useRef<HTMLSpanElement>(null);
  const story = useRef<HTMLAnchorElement>(null);

  // Park the "Learn more" bubble in the middle of the card until the mouse moves over it
  useEffect(() => {
    const center = () => {
      const el = story.current;
      if (el) moveCursor(`${el.offsetWidth / 2}px`, `${el.offsetHeight / 2}px`, 1);
    };
    center();
    window.addEventListener("resize", center);
    return () => window.removeEventListener("resize", center);
  }, []);

  const moveCursor = (x: string, y: string, s: number) => {
    const c = cursor.current;
    if (!c) return;
    c.style.setProperty("--cx", x);
    c.style.setProperty("--cy", y);
    c.style.setProperty("--cs", String(s));
  };

  return (
    <section className="stories container" id="stories" aria-labelledby="stories-title">
      <p className="eyebrow eyebrow--center" data-reveal="">New Article</p>
      <h2 className="big-title big-title--sm" id="stories-title" data-reveal="">
        <span>Discover Stories that Redefine</span>
        <span>Style and <span className="muted">performance for</span></span>
        <span className="muted">modern collectors.</span>
      </h2>

      <div className="stories__grid">
        <a
          href="#stories"
          className="story"
          ref={story}
          data-reveal=""
          onPointerMove={(e) => {
            if (!hasFinePointer()) return;
            const r = e.currentTarget.getBoundingClientRect();
            moveCursor(`${e.clientX - r.left}px`, `${e.clientY - r.top}px`, 1.1);
          }}
          onPointerLeave={(e) => {
            const el = e.currentTarget;
            moveCursor(`${el.offsetWidth / 2}px`, `${el.offsetHeight / 2}px`, 1);
          }}
        >
          <div className="story__img">
            <div className="ph">
              <Image src="/assets/story-1.webp" alt="Watch on a wrist" width={1200} height={1000} sizes="(max-width: 760px) 100vw, 580px" />
            </div>
          </div>
          <span className="story__cursor" ref={cursor} aria-hidden="true">Learn more</span>
          <div className="story__body">
            <h3>Curved Vertech Rubber Strap</h3>
            <p>
              Curved rubber straps are designed to hug the wrist. They fit most models and brands, with a
              quick-release pin for easy swapping.
            </p>
          </div>
        </a>

        <div
          className="split"
          data-reveal=""
          style={{ "--d": ".15s" } as CSSProperties}
          role="img"
          aria-label="Two watch photos"
          onPointerMove={(e) => {
            if (!hasFinePointer()) return;
            const r = e.currentTarget.getBoundingClientRect();
            const p = ((e.clientX - r.left) / r.width) * 100;
            e.currentTarget.style.setProperty("--s", `${clamp(p, 25, 75)}%`);
          }}
          onPointerLeave={(e) => e.currentTarget.style.setProperty("--s", "50%")}
        >
          <div className="split__img split__img--a">
            <div className="ph">
              <Image src="/assets/story-2a.webp" alt="" width={1200} height={1000} sizes="(max-width: 760px) 100vw, 580px" />
            </div>
          </div>
          <div className="split__img split__img--b">
            <div className="ph">
              <Image src="/assets/story-2b.webp" alt="" width={1200} height={1000} sizes="(max-width: 760px) 100vw, 580px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
