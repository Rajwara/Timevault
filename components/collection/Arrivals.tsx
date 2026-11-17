"use client";

import Image from "next/image";
import { useRef } from "react";
import AddButton from "./AddButton";
import { scrollRow } from "./Collections";
import { ArrowLeft, ArrowRight } from "./Icons";
import Price from "@/components/Price";
import { watches } from "@/lib/collection";
import s from "@/app/collection/collection.module.css";

export default function Arrivals() {
  const row = useRef<HTMLDivElement>(null);
  const list = [...watches].reverse();

  return (
    <section className={s.panel} id="arrivals" aria-labelledby="arrivals-title">
      <div className={s.arrivalsHead}>
        <h2 id="arrivals-title" className={s.h2Left}>New Arrivals</h2>
        <div className={s.arrowsInline}>
          <button type="button" className={s.roundLight} aria-label="Scroll left" onClick={() => scrollRow(row.current, -1)}><ArrowLeft /></button>
          <button type="button" className={s.roundDark} aria-label="Scroll right" onClick={() => scrollRow(row.current, 1)}><ArrowRight /></button>
        </div>
      </div>

      <div className={s.row} ref={row}>
        {list.map((w) => (
          <article key={w.id} className={s.mini}>
            <span className={s.miniImg}>
              <Image src={w.image} alt={w.name} width={w.w} height={w.h} sizes="80px" />
            </span>
            <span className={s.miniText}>
              <h3>{w.name}</h3>
              <small>{w.line}</small>
              <span className={s.cardPrice}>
                <Price usd={w.price} />
                {w.was && <s className={s.was}><Price usd={w.was} /></s>}
              </span>
            </span>
            <AddButton id={w.id} name={w.name} />
          </article>
        ))}
      </div>

      <div className={s.center}>
        <a href="#collections" className={s.btnDark}>View All Products</a>
      </div>
    </section>
  );
}
