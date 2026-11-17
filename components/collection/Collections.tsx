"use client";

import { useRef, useState } from "react";
import WatchCard from "./WatchCard";
import { ArrowLeft, ArrowRight } from "./Icons";
import { tabs, watches, type Tab } from "@/lib/collection";
import s from "@/app/collection/collection.module.css";

export function scrollRow(el: HTMLElement | null, dir: 1 | -1) {
  if (!el) return;
  const card = el.firstElementChild as HTMLElement | null;
  const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
  el.scrollBy({ left: dir * step, behavior: "smooth" });
}

export default function Collections() {
  const [tab, setTab] = useState<Tab>("all");
  const row = useRef<HTMLDivElement>(null);
  const list = watches.filter((w) => tab === "all" || w.cat === tab);

  return (
    <section className={s.panel} id="collections" aria-labelledby="collections-title">
      <h2 id="collections-title" className={s.h2Center}>Explore Collections</h2>

      <div className={s.tabs} role="group" aria-label="Filter collections">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            className={`${s.tab} ${tab === t.value ? s.tabOn : ""}`}
            aria-pressed={tab === t.value}
            onClick={() => {
              setTab(t.value);
              row.current?.scrollTo({ left: 0 });
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={s.row} ref={row} aria-live="polite">
        {list.map((w) => <WatchCard key={w.id} w={w} />)}
      </div>

      <div className={s.arrows}>
        <button type="button" className={s.roundLight} aria-label="Scroll left" onClick={() => scrollRow(row.current, -1)}><ArrowLeft /></button>
        <button type="button" className={s.roundDark} aria-label="Scroll right" onClick={() => scrollRow(row.current, 1)}><ArrowRight /></button>
      </div>
    </section>
  );
}
