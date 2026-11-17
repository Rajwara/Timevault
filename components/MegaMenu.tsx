"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { byId, usd } from "@/lib/collection";
import { megaColumns, megaFeatured } from "@/lib/menu";
import { select, selectionFromHref } from "@/lib/selection";
import s from "./MegaMenu.module.css";

type Props = {
  label?: string;
  /** "desktop" = hover/click panel, "mobile" = accordion, "auto" = mobile below `compactQuery`. */
  mode?: "desktop" | "mobile" | "auto";
  compactQuery?: string;
  /** Extra class for the trigger so it matches the host nav's link style. */
  triggerClassName?: string;
  /** Called after a link is chosen (e.g. to close the host's mobile menu). */
  onNavigate?: () => void;
};

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function MegaMenu({ label = "Collections", mode = "desktop", compactQuery = "(max-width: 760px)", triggerClassName = "", onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(mode === "mobile");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hoverOpenedAt = useRef(0);
  const panelId = useId();

  // Pick desktop panel vs. mobile accordion
  useEffect(() => {
    if (mode !== "auto") return;
    const mq = window.matchMedia(compactQuery);
    const update = () => { setCompact(mq.matches); setOpen(false); };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mode, compactQuery]);

  // Close on outside click / Escape (desktop panel)
  useEffect(() => {
    if (!open || compact) return;
    const onDown = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open, compact]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hoverOpen = () => {
    if (compact || !canHover()) return;
    clearTimeout(closeTimer.current);
    if (!open) hoverOpenedAt.current = Date.now();
    setOpen(true);
  };
  // A click right after hover-opening (mouse moved in, then clicked) should keep the panel open, not toggle it shut.
  const clickToggle = () => setOpen((o) => (o && Date.now() - hoverOpenedAt.current < 700 ? true : !o));
  const hoverClose = () => { if (compact || !canHover()) return; clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(false), 160); };

  const choose = (href: string) => {
    select(selectionFromHref(href));
    setOpen(false);
    onNavigate?.();
  };

  const columns = megaColumns.map((col) => (
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
  ));

  if (compact) {
    return (
      <div className={s.mobile}>
        <button type="button" className={`${s.mobileTrigger} ${triggerClassName}`} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
          {label}
          <span className={`${s.plus} ${open ? s.plusOpen : ""}`} aria-hidden="true" />
        </button>
        <div id={panelId} className={`${s.mobileBody} ${open ? s.mobileBodyOpen : ""}`}>
          <div className={s.mobileInner}>{columns}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.root} ref={root} onPointerEnter={hoverOpen} onPointerLeave={hoverClose}>
      <button
        ref={trigger}
        type="button"
        className={`${s.trigger} ${open ? s.triggerOpen : ""} ${triggerClassName}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={clickToggle}
      >
        {label}
        <Chevron />
      </button>

      <div id={panelId} className={`${s.panel} ${open ? s.panelOpen : ""}`} role="region" aria-label={`${label} menu`} hidden={!open}>
        <div className={s.cols}>{columns}</div>

        <div className={s.featured}>
          {megaFeatured.map((f) => {
            const w = byId(f.id);
            return (
              <Link key={f.id} href={f.href} className={s.feat} onClick={() => choose(f.href)}>
                <span className={s.featImg}>
                  <Image src={w.image} alt="" width={w.w} height={w.h} sizes="140px" />
                  <span className={s.featTag}>{f.tag}</span>
                </span>
                <span className={s.featName}>{w.name}</span>
                <span className={s.featMeta}>
                  {usd(w.price)} <span className={s.featCta}>Shop now →</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
