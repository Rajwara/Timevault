"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Small image pill inside a headline. On hover (mouse only) a larger copy of
 * the image appears and follows the cursor.
 */
export default function Pill({ src }: { src: string }) {
  const [hover, setHover] = useState(false);
  const [mounted, setMounted] = useState(false);
  const preview = useRef<HTMLSpanElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => setMounted(true), []);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Ease the preview towards the cursor so it trails smoothly
  const tick = () => {
    const c = current.current, t = target.current;
    c.x += (t.x - c.x) * 0.22;
    c.y += (t.y - c.y) * 0.22;
    const tilt = Math.max(-10, Math.min(10, (t.x - c.x) * 0.25));
    preview.current?.style.setProperty("transform", `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -50%) rotate(${tilt - 4}deg)`);
    raf.current = requestAnimationFrame(tick);
  };

  const fine = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <span
        className={`inline-pill ph${hover ? " is-hover" : ""}`}
        onPointerEnter={(e) => {
          if (!fine()) return;
          target.current = current.current = { x: e.clientX, y: e.clientY };
          setHover(true);
          cancelAnimationFrame(raf.current);
          raf.current = requestAnimationFrame(tick);
        }}
        onPointerMove={(e) => { target.current = { x: e.clientX, y: e.clientY }; }}
        onPointerLeave={() => { setHover(false); cancelAnimationFrame(raf.current); }}
      >
        <Image src={src} alt="" width={400} height={200} sizes="76px" />
      </span>
      {mounted &&
        createPortal(
          <span ref={preview} className={`pill-preview${hover ? " is-on" : ""}`} aria-hidden="true">
            <Image src={src} alt="" width={400} height={200} sizes="320px" />
          </span>,
          document.body,
        )}
    </>
  );
}
