"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowDown, BagIcon, Star } from "./Icons";
import Price from "@/components/Price";
import { watches } from "@/lib/collection";
import s from "./collection.module.css";

const heroPicks = ["diver", "aurum", "pilot", "naut"];

export default function Hero() {
  const [i, setI] = useState(0);
  const current = watches.find((w) => w.id === heroPicks[i])!;
  const next = watches.find((w) => w.id === heroPicks[(i + 1) % heroPicks.length])!;

  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <p className={`${s.label} ${s.labelCenter} ${s.heroLabel}`}>*About Time Vault</p>
      <h1 id="hero-title" className={s.heroTitle}>
        Precision Built<br />To Outlast Time
      </h1>

      <div className={s.heroWatch}>
        <Image
          key={current.id}
          src={current.image}
          alt={current.name}
          width={current.w}
          height={current.h}
          priority
          sizes="(max-width: 760px) 70vw, 400px"
          className={s.heroWatchImg}
        />
      </div>


      <div className={s.heroLeft}>
        <p>
          Swiss-calibrated movements, sapphire crystal and hand-finished cases — watches made to be worn
          every day and handed down.
        </p>
        <div className={s.reviews}>
          <span className={s.avatars} aria-hidden="true">
            <i>AM</i><i>JK</i><i>SL</i>
          </span>
          <span>
            <span className={s.stars} aria-label="Rated 4.9 out of 5">
              <Star /><Star /><Star /><Star /><Star />
            </span>
            <small>4.9 · 2,300+ reviews</small>
          </span>
        </div>
      </div>

      <button
        type="button"
        className={s.heroNext}
        onClick={() => setI((v) => (v + 1) % heroPicks.length)}
        aria-label={`Show next watch: ${next.name}`}
      >
        <span className={s.heroNextImg}>
          <Image src={next.image} alt="" width={next.w} height={next.h} sizes="90px" />
        </span>
        <span className={s.heroNextFoot}>
          <span>Next up<small>{next.name}</small></span>
          <span className={s.roundDark}><ArrowDown /></span>
        </span>
      </button>

      <div className={s.heroBottom}>
        <a href="#collections" className={s.btnDark}>
          Shop Now <BagIcon />
        </a>
        <p className={s.heroNow} aria-live="polite">
          {current.name} <span><Price usd={current.price} /></span>
        </p>
        <a href="#about" className={s.scrollLink}>
          Scroll Now <span className={s.roundLight}><ArrowDown /></span>
        </a>
      </div>

      <span className={s.heroWord} aria-hidden="true">Luxury</span>
    </section>
  );
}
