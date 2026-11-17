"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import s from "./WelcomePopup.module.css";

/* ---------- Settings ---------- */
const OFFER = { percent: 10, code: "WELCOME10" };
const SHOW_AFTER_MS = 6000;               // wait this long after the page has loaded
const OFFER_WINDOW_MS = 10 * 60 * 1000;   // countdown length, starts the first time the popup is seen
const SNOOZE_DAYS = 7;                    // after "No thanks", don't show again for this long
const KEY = "tv-welcome-v1";

type Saved = { firstSeen?: number; dismissedAt?: number; joined?: boolean };
const read = (): Saved => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };
const write = (v: Saved) => { try { localStorage.setItem(KEY, JSON.stringify({ ...read(), ...v })); } catch { /* storage blocked */ } };

const perks = ["Free insured shipping over $500", "5-year international warranty", "Free returns within 30 days"];

export default function WelcomePopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [left, setLeft] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"form" | "error" | "done">("form");

  // Decide whether to show it (add ?welcome=1 to any URL to preview it any time)
  useEffect(() => {
    const force = new URLSearchParams(window.location.search).get("welcome") === "1";
    const saved = read();
    const snoozed = saved.dismissedAt && Date.now() - saved.dismissedAt < SNOOZE_DAYS * 864e5;
    if (!force && (saved.joined || snoozed)) return;

    let timer: ReturnType<typeof setTimeout>;
    const open = () => {
      // Don't interrupt if another dialog (bag, menu, quick view) is open
      if (document.querySelector("dialog[open]")) { timer = setTimeout(open, 4000); return; }
      const first = force ? Date.now() : read().firstSeen ?? Date.now();
      if (!read().firstSeen || force) write({ firstSeen: first });
      setLeft(Math.max(0, first + OFFER_WINDOW_MS - Date.now()));
      dialog.current?.showModal();
      dialog.current?.focus(); // start focus on the dialog itself, not the close button
    };
    const start = () => { timer = setTimeout(open, force ? 600 : SHOW_AFTER_MS); };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => { clearTimeout(timer); window.removeEventListener("load", start); };
  }, []);

  // Countdown
  useEffect(() => {
    if (left === null || left <= 0) return;
    const t = setInterval(() => setLeft((v) => (v === null ? v : Math.max(0, v - 1000))), 1000);
    return () => clearInterval(t);
  }, [left === null]); // eslint-disable-line react-hooks/exhaustive-deps

  const close = () => dialog.current?.close();
  const onClose = () => { if (state !== "done") write({ dismissedAt: Date.now() }); };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setState("error"); return; }
    // TODO: send `email` to your email provider (Mailchimp, Klaviyo, Shopify…) here.
    write({ joined: true });
    setState("done");
  };

  const mm = left !== null ? String(Math.floor(left / 60000)).padStart(2, "0") : "10";
  const ss = left !== null ? String(Math.floor((left % 60000) / 1000)).padStart(2, "0") : "00";
  const expired = left === 0;

  return (
    <dialog
      ref={dialog}
      className={s.dialog}
      aria-labelledby="welcome-title"
      tabIndex={-1}
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className={s.card}>
        <div className={s.media}>
          <Image src="/assets/story-1.webp" alt="" fill sizes="(max-width: 760px) 100vw, 440px" className={s.mediaImg} />
          <span className={s.chip}>*Swiss calibrated · 5-yr warranty</span>
          <span className={s.wordmark} aria-hidden="true">{site.name}</span>
        </div>

        <div className={s.body}>
          <button type="button" className={s.close} aria-label="Close" onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>

          {state === "done" ? (
            <div className={s.done} aria-live="polite">
              <p className={s.label}>*You&apos;re on the list</p>
              <h2 id="welcome-title" className={s.title}>Welcome to {site.displayName}</h2>
              <p className={s.text}>Here&apos;s {OFFER.percent}% off your first watch. Mention this code when you request your order:</p>
              <p className={s.code}>{OFFER.code}</p>
              <button type="button" className={s.cta} onClick={close}>
                Start shopping <span className={s.ctaArrow} aria-hidden="true">→</span>
              </button>
            </div>
          ) : (
            <>
              <p className={s.label}>*Members only</p>
              <h2 id="welcome-title" className={s.title}>Unlock your welcome offer</h2>
              <p className={s.text}>
                Join the {site.displayName} list for {OFFER.percent}% off your first watch, plus early access to new releases and private sales.
              </p>

              {!expired && (
                <p className={s.timer} aria-live="off">
                  <span className={s.dot} aria-hidden="true" />
                  Offer ends in <strong>{mm}:{ss}</strong>
                </p>
              )}

              <form className={s.form} onSubmit={submit} noValidate>
                <label htmlFor="welcome-email" className="sr-only">Email address</label>
                <input
                  id="welcome-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  value={email}
                  aria-invalid={state === "error"}
                  aria-describedby="welcome-msg"
                  onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("form"); }}
                />
                <button type="submit" className={s.cta}>
                  Claim offer <span className={s.ctaArrow} aria-hidden="true">→</span>
                </button>
              </form>
              <p id="welcome-msg" className={s.error} aria-live="polite">{state === "error" ? "Please enter a valid email address." : ""}</p>

              <ul className={s.perks}>
                {perks.map((p) => <li key={p}>{p}</li>)}
              </ul>

              <button type="button" className={s.decline} onClick={close}>No thanks, maybe later</button>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
