"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";

type Part = string | ReactNode;

/**
 * Paragraph whose words light up one by one as it scrolls through the viewport.
 * Strings are split into words; any other node (e.g. an image pill) is kept as-is.
 */
export default function ScrubText({ parts, className = "" }: { parts: Part[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".w"));
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const start = vh * 0.85;
      const end = vh * 0.35;
      const p = prefersReducedMotion() ? 1 : clamp((start - r.top) / (start - end), 0, 1);
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("is-on", i < lit));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p className={`js-scrub ${className}`} ref={ref}>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>
            {part.split(/(\s+)/).map((w, j) =>
              !w ? null : /^\s+$/.test(w) ? (
                " "
              ) : (
                <span className="w" key={j}>
                  {w}
                </span>
              ),
            )}
          </Fragment>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </p>
  );
}
