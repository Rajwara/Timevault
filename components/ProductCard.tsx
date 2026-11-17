"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import BuyButton from "./BuyButton";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import type { Product } from "@/lib/data";

export default function ProductCard({ product, delay }: { product: Product; delay: number }) {
  const inner = useRef<HTMLDivElement>(null);
  const tilt = (rx: number, ry: number) => {
    inner.current?.style.setProperty("--rx", `${rx}deg`);
    inner.current?.style.setProperty("--ry", `${ry}deg`);
  };

  return (
    <article
      className={`pcard${product.up ? " pcard--up" : ""}`}
      data-reveal=""
      style={{ "--d": `${delay}s` } as CSSProperties}
      onPointerMove={(e) => {
        if (!hasFinePointer() || prefersReducedMotion()) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt(-y * 14, x * 14);
      }}
      onPointerLeave={() => tilt(0, 0)}
    >
      <div className="pcard__inner" ref={inner}>
        <span className="pcard__badge">
          <i />
          <span className="sr-only">Save </span>
          {product.discount}
        </span>
        <span className="pcard__word" aria-hidden="true">{product.word}</span>
        <div className="pcard__img">
          <div className="ph">
            <Image src={product.image} alt={product.name} width={800} height={800} sizes="(max-width: 560px) 340px, (max-width: 1024px) 45vw, 280px" />
          </div>
        </div>
        <h3 className="pcard__name">{product.name}</h3>
        <p className="pcard__desc">{product.desc}</p>
        <div className="pcard__foot">
          <span className="pcard__price">{product.price}</span>
          <BuyButton product={product.name} />
        </div>
      </div>
    </article>
  );
}
