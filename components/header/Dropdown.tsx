"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import s from "./SiteHeader.module.css";

type Props = {
  label: ReactNode;
  /** "mega" spans the whole header; "list" hangs under the trigger. */
  size?: "mega" | "list";
  align?: "left" | "right";
  triggerClassName?: string;
  ariaLabel?: string;
  children: (close: () => void) => ReactNode;
};

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={s.chev}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/** Header dropdown: opens on hover (mouse) or click/tap/keyboard; closes on Escape, outside click or link choice. */
export default function Dropdown({ label, size = "list", align = "left", triggerClassName = "", ariaLabel, children }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hoverOpenedAt = useRef(0);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const close = () => setOpen(false);

  return (
    <div
      ref={root}
      className={size === "mega" ? s.ddMegaRoot : s.ddRoot}
      onPointerEnter={() => {
        if (!canHover()) return;
        clearTimeout(closeTimer.current);
        if (!open) hoverOpenedAt.current = Date.now();
        setOpen(true);
      }}
      onPointerLeave={() => {
        if (!canHover()) return;
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(close, 160);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={`${s.ddTrigger} ${triggerClassName}`}
        aria-expanded={open}
        aria-controls={id}
        aria-label={ariaLabel}
        // A click right after hover-opening keeps the panel open instead of toggling it shut.
        onClick={() => setOpen((o) => (o && Date.now() - hoverOpenedAt.current < 700 ? true : !o))}
      >
        {label}
        <Chevron />
      </button>
      <div
        id={id}
        hidden={!open}
        className={`${size === "mega" ? s.ddMega : s.ddList} ${align === "right" ? s.ddRight : ""}`}
      >
        {open && children(close)}
      </div>
    </div>
  );
}
