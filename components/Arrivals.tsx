"use client";

import Image from "next/image";
import { useMemo, useRef, useState, type CSSProperties } from "react";
import BuyButton from "./BuyButton";
import Pill from "./Pill";
import { arrivals, filters, type Category } from "@/lib/data";
import { site } from "@/lib/site";

export default function Arrivals() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const visible = useMemo(() => arrivals.filter((a) => filter === "all" || a.cat === filter), [filter]);
  const [index, setIndex] = useState(Math.floor(arrivals.length / 2));
  const touchX = useRef<number | null>(null);

  const go = (i: number) => setIndex(Math.min(Math.max(i, 0), visible.length - 1));
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const choose = (f: Category | "all") => {
    const count = arrivals.filter((a) => f === "all" || a.cat === f).length;
    setFilter(f);
    setIndex(Math.floor((count - 1) / 2));
  };

  const current = visible[index];

  return (
    <section className="arrivals" id="arrivals" aria-labelledby="arrivals-title">
      <div className="container">
        <div className="arrivals__head">
          <p className="eyebrow" data-reveal="">Explore the {site.displayName} Shops</p>
          <h2 className="arrivals__title" id="arrivals-title" data-reveal="">
            <span className="arrivals__title-a">Discover our Newest</span>
            <span>
              <span className="spark" aria-hidden="true">✳</span> Arrivals Crafted <Pill src="/assets/pill-3.webp" />{" "}
              <span className="muted">with Precision,</span>
            </span>
            <span className="muted">Style, and Innovation.</span>
          </h2>
        </div>

        <div className="tabs" role="group" aria-label="Filter watches" data-reveal="">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`tab${filter === f.value ? " is-active" : ""}`}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => choose(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="carousel"
        data-reveal=""
        role="region"
        aria-roledescription="carousel"
        aria-label="New arrivals"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
          if (e.key === "ArrowRight") { e.preventDefault(); next(); }
        }}
      >
        <div
          className="carousel__track"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (dx < -40) next();
            if (dx > 40) prev();
            touchX.current = null;
          }}
        >
          {arrivals.map((a) => {
            const i = visible.indexOf(a);
            const off = i - index;
            const abs = Math.abs(off);
            const hidden = i === -1 || abs > 2;
            const active = !hidden && off === 0;
            const style = hidden
              ? undefined
              : ({
                  "--off": off === 0 ? 0 : off + Math.sign(off) * 0.25,
                  "--scale": active ? 1 : 0.66,
                  "--op": abs === 0 ? 1 : abs === 1 ? 0.9 : 0.45,
                  "--z": 10 - abs,
                } as CSSProperties);
            return (
              <article
                key={a.id}
                className={`acard${hidden ? " is-hidden" : ""}${active ? " is-active" : ""}`}
                style={style}
                aria-hidden={!active}
                onClick={() => { if (!hidden && !active) setIndex(i); }}
              >
                <div className="acard__img">
                  <div className="ph">
                    <Image src={a.image} alt={a.name} width={900} height={900} sizes="300px" />
                  </div>
                </div>
                <div className="acard__info">
                  <span className="acard__word" aria-hidden="true">{a.word}</span>
                  <h3>{a.name}</h3>
                  <p>{a.desc}</p>
                  <div className="acard__foot">
                    <span>{a.price}</span>
                    <BuyButton id={a.id} product={a.name} tabIndex={active ? 0 : -1} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {current ? `${current.name}, ${index + 1} of ${visible.length}` : ""}
        </p>

        <div className="carousel__nav">
          <button className="carousel__btn carousel__btn--prev" type="button" aria-label="Previous watch" disabled={index === 0} onClick={prev}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
          </button>
          <button className="carousel__btn carousel__btn--next" type="button" aria-label="Next watch" disabled={index === visible.length - 1} onClick={next}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
