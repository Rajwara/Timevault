"use client";

import { useEffect, useRef } from "react";

/**
 * Watch hands drawn on top of hero-watch-dial.webp (the photo with its printed hands removed), showing the
 * visitor's local time. Coordinates are the photo's own pixels (843 x 1100); the pivot is at (335, 500).
 * The seconds hand sweeps smoothly like a mechanical movement.
 */
const PIVOT = { x: 335, y: 500 };

export default function LiveHands() {
  const hour = useRef<SVGGElement>(null);
  const minute = useRef<SVGGElement>(null);
  const second = useRef<SVGGElement>(null);
  const label = useRef<HTMLTitleElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, timer = 0, lastMinute = -1;
    const set = (el: SVGGElement | null, deg: number) => el?.setAttribute("transform", `rotate(${deg})`);
    const tick = () => {
      const d = new Date();
      const ms = d.getMilliseconds(), s = d.getSeconds() + (reduce ? 0 : ms / 1000), m = d.getMinutes() + s / 60, h = (d.getHours() % 12) + m / 60;
      set(hour.current, h * 30);
      set(minute.current, m * 6);
      set(second.current, s * 6);
      if (label.current && d.getMinutes() !== lastMinute) {
        lastMinute = d.getMinutes();
        label.current.textContent = `The watch shows the current time: ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
      }
    };
    tick();
    if (reduce) timer = window.setInterval(tick, 1000);
    else {
      const loop = () => { tick(); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    return () => { cancelAnimationFrame(raf); clearInterval(timer); };
  }, []);

  return (
    <svg className="live-hands" viewBox="0 0 843 1100" role="img" preserveAspectRatio="xMidYMid meet" shapeRendering="geometricPrecision">
      <title ref={label}>The watch shows the current time</title>
      <defs>
        <linearGradient id="lh-steel" x1="0" x2="1">
          <stop offset="0" stopColor="#f2f2f2" />
          <stop offset=".5" stopColor="#9b9b9b" />
          <stop offset="1" stopColor="#dcdcdc" />
        </linearGradient>
        <radialGradient id="lh-cap" cx=".38" cy=".35" r=".75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".45" stopColor="#c4c4c4" />
          <stop offset="1" stopColor="#6f6f6f" />
        </radialGradient>
        <filter id="lh-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="6" stdDeviation="3" floodColor="#000" floodOpacity=".5" />
        </filter>
      </defs>
      <g transform={`translate(${PIVOT.x} ${PIVOT.y})`} filter="url(#lh-shadow)">
        {/* hour: short sword hand, steel frame with luminous fill */}
        <g ref={hour}>
          <path d="M-13 22 L-15 -112 L0 -160 L15 -112 L13 22 Z" fill="url(#lh-steel)" />
          <path d="M-8 -28 L-10 -110 L0 -146 L10 -110 L8 -28 Z" fill="#f7f7f2" />
        </g>
        {/* minute: long sword hand */}
        <g ref={minute}>
          <path d="M-11 24 L-12 -192 L0 -232 L12 -192 L11 24 Z" fill="url(#lh-steel)" />
          <path d="M-6.5 -36 L-7.5 -190 L0 -219 L7.5 -190 L6.5 -36 Z" fill="#f7f7f2" />
        </g>
        {/* seconds: thin needle with blue tip and counterweight */}
        <g ref={second}>
          <rect x="-1.6" y="-246" width="3.2" height="306" rx="1.6" fill="#e9e9e9" />
          <rect x="-2.2" y="-246" width="4.4" height="34" rx="2" fill="#2f7fe0" />
          <circle cy="44" r="7" fill="url(#lh-steel)" />
        </g>
        <circle r="17" fill="url(#lh-cap)" />
        <circle r="5" fill="#8a8a8a" />
      </g>
    </svg>
  );
}
