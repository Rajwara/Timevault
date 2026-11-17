import Image from "next/image";
import Nav from "./Nav";
import HeroWatch from "./HeroWatch";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__bg" aria-hidden="true" />
      <Nav />

      <div className="hero__content">
        <div className="hero__intro">
          <h1 className="hero__title">
            <strong>{site.name}</strong> will make
            <br />
            your life easier
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

        <a href="#arrivals" className="hero__video">
          <span className="hero__video-media">
            <span className="ph">
              <Image src="/assets/video-thumb.webp" alt="" width={800} height={500} sizes="230px" priority />
            </span>
            <span className="hero__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
          </span>
          <span className="hero__video-title">Shop Wristwatches</span>
          <span className="hero__video-sub">{site.domainLabel}</span>
        </a>
      </div>

      <div className="hero__brand" aria-hidden="true">
        {site.name}
      </div>
    </header>
  );
}
