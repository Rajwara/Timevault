"use client";

import Image from "next/image";
import { useState } from "react";
import WatchCard from "./WatchCard";
import { ArrowDown, ArrowUp } from "./Icons";
import { brands, byId } from "@/lib/collection";
import s from "@/app/collection/collection.module.css";

export default function Brands() {
  const [open, setOpen] = useState(0);
  const picks = brands[open].picks.map(byId);

  return (
    <section className={s.brands} id="brands" aria-labelledby="brands-title">
      <h2 id="brands-title" className={s.h2Caps}>Shop Our Lines</h2>
      <p className={s.sub}>Four families, one standard. Pick a line to see its signature pieces.</p>

      <div className={s.brandsGrid}>
        <div className={s.accordion}>
          {brands.map((b, i) => {
            const isOpen = open === i;
            return (
              <div key={b.name} className={`${s.accItem} ${isOpen ? s.accOpen : ""}`}>
                <button
                  type="button"
                  className={s.accHead}
                  aria-expanded={isOpen}
                  aria-controls={`brand-${i}`}
                  id={`brand-h-${i}`}
                  onClick={() => setOpen(i)}
                >
                  <span className={s.accNum}>0{i + 1}</span>
                  <span className={s.accName}>{b.name}</span>
                  <span className={s.accIcon}>{isOpen ? <ArrowDown /> : <ArrowUp />}</span>
                </button>
                <div className={s.accBody} id={`brand-${i}`} role="region" aria-labelledby={`brand-h-${i}`}>
                  <div className={s.accInner}>
                    <div className={s.accImg}>
                      <Image src={b.image} alt="" width={1200} height={1000} sizes="(max-width: 760px) 100vw, 640px" />
                      <p>{b.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={s.brandPicks} aria-live="polite">
          {picks.map((w) => <WatchCard key={w.id} w={w} size="lg" />)}
        </div>
      </div>
    </section>
  );
}
