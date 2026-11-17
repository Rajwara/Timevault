import Image from "next/image";
import HeroWatch from "./HeroWatch";
import HeroDeck from "./HeroDeck";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__intro">
          <h1 className="hero__title">
            <strong>{site.name}</strong>
            <br />
            will make your life easier
          </h1>
          <p className="hero__text">
            Explore our best products to find what you want. Every watch is built to last a lifetime.
          </p>
          <a href="#products" className="pill-btn">
            <span className="pill-btn__thumb ph ph--round">
              <Image src="/assets/shop-thumb.webp" alt="" width={200} height={140} sizes="52px" priority />
            </span>
            <span>Shop Now</span>
          </a>
        </div>

        <HeroWatch />

        <HeroDeck />
      </div>

      <div className="hero__brand" aria-hidden="true">
        {site.name}
      </div>
    </section>
  );
}
