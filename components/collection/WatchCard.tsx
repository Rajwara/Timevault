import Image from "next/image";
import AddButton from "./AddButton";
import Price from "@/components/Price";
import type { Watch } from "@/lib/collection";
import s from "@/app/collection/collection.module.css";

export default function WatchCard({ w, size = "md" }: { w: Watch; size?: "md" | "lg" }) {
  return (
    <article className={`${s.card} ${size === "lg" ? s.cardLg : ""}`}>
      <div className={s.cardImg}>
        <Image src={w.image} alt={w.name} width={w.w} height={w.h} sizes="(max-width: 640px) 60vw, 240px" />
      </div>
      <div className={s.cardFoot}>
        <div>
          <h3 className={s.cardName}>{w.name}</h3>
          <p className={s.cardPrice}>
            <Price usd={w.price} />
            {w.was && <s className={s.was}><span className="sr-only">was </span><Price usd={w.was} /></s>}
          </p>
        </div>
        <AddButton id={w.id} name={w.name} />
      </div>
    </article>
  );
}
