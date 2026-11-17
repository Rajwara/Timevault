import Image from "next/image";
import type { CSSProperties } from "react";
import { featuresLeft, featuresRight } from "@/lib/data";
import { site } from "@/lib/site";

type Feat = { icon: string; title: string; text: string };

function FeatItem({ f, i, side }: { f: Feat; i: number; side: "left" | "right" }) {
  const text = (
    <div className="feat__text">
      <span className="feat__icon" aria-hidden="true">{f.icon}</span>
      <h3>{f.title}</h3>
      <p>{f.text}</p>
    </div>
  );
  return (
    <li className="feat" data-reveal="" style={{ "--d": `${0.1 + i * 0.15}s` } as CSSProperties}>
      {side === "right" && <span className="feat__line" />}
      {text}
      {side === "left" && <span className="feat__line" />}
    </li>
  );
}

export default function Features() {
  return (
    <section className="features container" id="features" aria-labelledby="features-title">
      <p className="eyebrow eyebrow--center" data-reveal="">Precision in Every Detail</p>
      <h2 className="big-title" id="features-title" data-reveal="">
        <span>Crafted Premium<br />Materials and Swiss</span>
        <span className="muted">timeless performance<br />&amp;comfort.</span>
      </h2>

      <div className="features__stage">
        <span className="features__bgword" aria-hidden="true">{site.name}</span>

        <ul className="features__col features__col--left">
          {featuresLeft.map((f, i) => <FeatItem key={f.title} f={f} i={i} side="left" />)}
        </ul>

        <div className="features__watch" data-reveal="zoom">
          <div className="ph">
            <Image src="/assets/feature-watch.webp" alt="Steel watch with black NATO strap, front view" width={721} height={1400} sizes="(max-width: 760px) 270px, 340px" />
          </div>
        </div>

        <ul className="features__col features__col--right">
          {featuresRight.map((f, i) => <FeatItem key={f.title} f={f} i={i} side="right" />)}
        </ul>
      </div>
    </section>
  );
}
