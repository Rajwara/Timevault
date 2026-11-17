"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import partsJson from "@/public/assets/explode/parts.json";

/**
 * Exploded watch, driven by scroll. The section that contains it (.explode-track) is pinned while you
 * scroll through it: the watch breaks into its parts, then gathers back together.
 *
 * Part images live in /public/assets/explode. They are cut from feature-watch.webp by scripts/split-watch.py;
 * replace any of them with AI-generated parts of the same name and size (see docs/exploded-watch-prompts.md).
 */

type Key = "body" | "dial" | "hands" | "bezel" | "crystal" | "crown";
type Part = {
  key: Key;
  label: string;
  note: string;
  side: "left" | "right";
  /** how far the part travels when exploded, in case diameters (x, y) and px (z) */
  ex: number; ey: number; ez: number;
  /** stacking depth when assembled (px) */
  fz: number;
  /** spin while exploding (deg) */
  rot: number;
  /** 0 = moves first, higher = later */
  delay: number;
};

const PARTS: Part[] = [
  { key: "body",    label: "Case & strap",     note: "316L steel, NATO strap",        side: "left",  ex: 0,     ey: 0.06,  ez: -60, fz: 0,  rot: 0,   delay: 0 },
  { key: "dial",    label: "Matte dial",       note: "Applied indices, small seconds", side: "left",  ex: -0.02, ey: -0.02, ez: 150, fz: 2,  rot: -6,  delay: .06 },
  { key: "hands",   label: "Hands",            note: "Brushed steel, orange seconds",  side: "right", ex: 0.02,  ey: -0.04, ez: 270, fz: 4,  rot: 28,  delay: .1 },
  { key: "bezel",   label: "Screwed bezel",    note: "Brushed steel, four screws",     side: "left",  ex: -0.03, ey: -0.06, ez: 390, fz: 6,  rot: -14, delay: .02 },
  { key: "crystal", label: "Sapphire crystal", note: "Scratch-resistant, AR-coated",   side: "right", ex: 0.03,  ey: -0.08, ez: 520, fz: 8,  rot: 8,   delay: 0 },
  { key: "crown",   label: "Crown",            note: "Screw-down, 100 m",              side: "right", ex: 0.5,   ey: 0.02,  ez: 40,  fz: -1, rot: 0,   delay: .12 },
];

/** Camera: straight-on when assembled → tilted when exploded */
const VIEW = { rx: 54, rz: -20, s: 0.74, ty: 0.32 };

const [CW, CH] = partsJson.canvas as [number, number];
const [PX, PY] = partsJson.pivot as [number, number];
const BOX = partsJson.boxes as Record<Key, [number, number, number, number]>;
const CASE_D = BOX.bezel[2]; // case diameter in source pixels
const PERSPECTIVE = 1600;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/** 0 = whole watch, 1 = fully apart: break apart in the first half of the scroll, gather in the second */
const explosion = (p: number) => (p < 0.5 ? ease(range(p, 0.06, 0.4)) : 1 - ease(range(p, 0.6, 0.94)));

export default function ExplodedWatch() {
  const stage = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const parts = useRef<Record<string, HTMLDivElement | null>>({});
  const labels = useRef<Record<string, HTMLDivElement | null>>({});
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const st = stage.current!;
    const track = st.closest<HTMLElement>(".explode-track");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track || reduce) return;
    track.classList.add("is-live");

    let k = 1; // display px per source px
    const measure = () => { k = Math.min(st.clientHeight / CH, st.clientWidth / CW); };

    const render = (p: number) => {
      const e = explosion(p);
      const W = st.clientWidth, H = st.clientHeight, U = CASE_D * k;
      const cam = { s: lerp(1, VIEW.s, e), rx: VIEW.rx * e, rz: VIEW.rz * e, ty: VIEW.ty * e * U };
      // rig origin = the hand pivot of the watch, with the whole photo centred in the stage
      const ox = W / 2 + (PX - CW / 2) * k, oy = H / 2 + (PY - CH / 2) * k;
      const r = rig.current!;
      r.style.left = ox + "px"; r.style.top = oy + "px";
      r.style.transform = `translateY(${cam.ty}px) scale(${cam.s}) rotateX(${cam.rx}deg) rotateZ(${cam.rz}deg)`;
      const M = new DOMMatrix().translateSelf(0, cam.ty).scaleSelf(cam.s).rotateSelf(cam.rx, 0, 0).rotateSelf(0, 0, cam.rz);

      const centres: Record<string, [number, number]> = {};
      PARTS.forEach((part) => {
        const el = parts.current[part.key];
        if (!el) return;
        const t = ease(clamp((e - part.delay) / (1 - part.delay)));
        const [bx, by, bw, bh] = BOX[part.key];
        const x = (bx - PX) * k + part.ex * U * t, y = (by - PY) * k + part.ey * U * t, z = lerp(part.fz, part.ez, t) * (U / 232); // lift scales with the watch size (232px = desktop case)
        Object.assign(el.style, { width: bw * k + "px", height: bh * k + "px", transform: `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${part.rot * t}deg)` });
        // project the part's centre to the screen (same maths as the browser's perspective)
        const c = M.transformPoint(new DOMPoint(x + (bw * k) / 2, y + (bh * k) / 2, z));
        const vx = W / 2, vy = H * 0.45, f = PERSPECTIVE / (PERSPECTIVE - c.z);
        centres[part.key] = [vx + (ox + c.x - vx) * f, vy + (oy + c.y - vy) * f];
      });

      // the untouched photo shows whenever the watch is (almost) whole
      const ph = 1 - range(e, 0.004, 0.05);
      photo.current!.style.opacity = String(ph);
      r.style.opacity = String(1 - ph);
      track.style.setProperty("--explode", e.toFixed(3));

      // labels + leader lines once the parts are apart
      const la = range(e, 0.7, 0.97);
      let lines = "";
      const sides = { left: PARTS.filter((p) => p.side === "left"), right: PARTS.filter((p) => p.side === "right") };
      (["left", "right"] as const).forEach((side) => {
        const list = sides[side].map((p) => ({ p, c: centres[p.key] })).filter((x) => x.c).sort((a, b) => a.c[1] - b.c[1]);
        let lastY = -Infinity;
        list.forEach(({ p, c }) => {
          const lab = labels.current[p.key];
          if (!lab) return;
          const y = Math.max(c[1] - 16, lastY + 46);
          lastY = y;
          const lx = side === "left" ? -12 : W + 12;
          lab.style.transform = `translate(${side === "left" ? "-100%" : "0"}, ${y}px)`;
          lab.style.left = lx + "px";
          lab.style.opacity = String(la);
          const ax = side === "left" ? lx + 6 : lx - 6, ay = y + 12;
          lines += `<polyline points="${ax},${ay} ${(ax + c[0]) / 2},${ay} ${c[0]},${c[1]}" /><circle cx="${c[0]}" cy="${c[1]}" r="3" />`;
        });
      });
      svg.current!.innerHTML = la > 0.01 ? lines : "";
      svg.current!.style.opacity = String(la);
    };

    // smooth the scroll position a little, like the original demo
    let target = 0, current = 0, raf = 0;
    const progress = () => {
      const rr = track.getBoundingClientRect();
      const sticky = track.firstElementChild as HTMLElement;
      return clamp(-rr.top / Math.max(1, rr.height - sticky.offsetHeight));
    };
    const tick = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0005) current = target;
      render(current);
      raf = current !== target ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => { target = progress(); if (!raf) raf = requestAnimationFrame(tick); };
    const onResize = () => { measure(); render(current); };

    measure();
    current = target = progress();
    render(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      track.classList.remove("is-live");
    };
  }, []);

  return (
    <div className="xw" ref={stage}>
      <div className="xw__photo" ref={photo}>
        <Image src="/assets/feature-watch.webp" alt="Steel watch with black NATO strap, front view" width={CW} height={CH} sizes="(max-width: 760px) 270px, 340px" />
      </div>
      <div className="xw__stage" aria-hidden="true" style={{ perspective: `${PERSPECTIVE}px` }}>
        <div className="xw__rig" ref={rig}>
          {PARTS.map((p) => {
            const [, , bw, bh] = BOX[p.key];
            return (
              <div key={p.key} className={`xw__part xw__part--${p.key}`} ref={(el) => { parts.current[p.key] = el; }}>
                <Image src={`/assets/explode/${p.key}.webp`} alt="" width={bw} height={bh} sizes={p.key === "body" ? "340px" : "260px"} />
              </div>
            );
          })}
        </div>
      </div>
      <svg className="xw__lines" ref={svg} aria-hidden="true" />
      {PARTS.map((p) => (
        <div key={p.key} className={`xw__label xw__label--${p.side}`} ref={(el) => { labels.current[p.key] = el; }} aria-hidden="true">
          <b>{p.label}</b>
          <span>{p.note}</span>
        </div>
      ))}
    </div>
  );
}
