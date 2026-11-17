"use client";

import Image from "next/image";
import Link from "next/link";
import Price from "./Price";
import { byId } from "@/lib/collection";
import { megaColumns, megaFeatured } from "@/lib/menu";
import { select, selectionFromHref } from "@/lib/selection";
import s from "./MegaMenu.module.css";

/** Tell same-page listeners (e.g. the FAQ) about the chosen link, then close the menu. */
function useChoose(onNavigate?: () => void) {
  return (href: string) => {
    select(selectionFromHref(href));
    onNavigate?.();
  };
}

/** Link columns — used in the desktop mega panel and the mobile drawer. */
export function MenuColumns({ onNavigate, compact = false }: { onNavigate?: () => void; compact?: boolean }) {
  const choose = useChoose(onNavigate);
  return (
    <div className={compact ? s.colsCompact : s.cols}>
      {megaColumns.map((col) => (
        <div className={s.col} key={col.title}>
          <p className={s.colTitle}>{col.title}</p>
          <ul>
            {col.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={s.link} onClick={() => choose(l.href)}>
                  {l.label}
                  {l.note && <span className={s.note}>{l.note}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Full desktop mega panel: link columns + featured watches. */
export default function MegaPanel({ onNavigate }: { onNavigate?: () => void }) {
  const choose = useChoose(onNavigate);
  return (
    <div className={s.panel}>
      <MenuColumns onNavigate={onNavigate} />
      <div className={s.featured}>
        {megaFeatured.map((f) => {
          const w = byId(f.id);
          return (
            <Link key={f.id} href={f.href} className={s.feat} onClick={() => choose(f.href)}>
              <span className={s.featImg}>
                <Image src={w.image} alt="" width={w.w} height={w.h} sizes="160px" />
                <span className={s.featTag}>{f.tag}</span>
              </span>
              <span className={s.featBody}>
                <span className={s.featName}>{w.name}</span>
                <span className={s.featSpec}>{w.line}</span>
                <span className={s.featRow}>
                  <span className={s.featPrice}>
                    <Price usd={w.price} />
                    {w.was && <s><span className="sr-only">was </span><Price usd={w.was} /></s>}
                  </span>
                  <span className={s.featBtn} aria-hidden="true">
                    Shop now
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                  </span>
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
