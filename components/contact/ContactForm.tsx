"use client";

import { useState, type FormEvent } from "react";
import { STORES } from "@/lib/stores";
import { site } from "@/lib/site";
import s from "./contact.module.css";

const topics = ["General question", "My order", "Warranty or servicing", "Book a boutique appointment", "Corporate gifting"];

/** Contact form. With no backend yet, it opens the visitor's email app with everything filled in. */
export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const errs: Record<string, string> = {};
    if (!v("name")) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) errs.email = "Please enter a valid email address.";
    if (v("message").length < 10) errs.message = "Please tell us a little more (at least 10 characters).";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // TODO: post to your form service or CRM instead of opening the email app.
    const body = [`Name: ${v("name")}`, `Email: ${v("email")}`, v("phone") && `Phone: ${v("phone")}`, v("store") && `Preferred location: ${v("store")}`, "", v("message")].filter(Boolean).join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${v("topic")} — ${v("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const err = (k: string) => errors[k] && <span className={s.fieldErr} id={`err-${k}`}>{errors[k]}</span>;

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <div className={s.field}>
        <label htmlFor="c-name">Full name</label>
        <input id="c-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
        {err("name")}
      </div>
      <div className={s.field}>
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
        {err("email")}
      </div>
      <div className={s.field}>
        <label htmlFor="c-phone">Phone <small>(optional)</small></label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="+971" />
      </div>
      <div className={s.field}>
        <label htmlFor="c-topic">Topic</label>
        <select id="c-topic" name="topic" defaultValue={topics[0]}>
          {topics.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className={`${s.field} ${s.fieldFull}`}>
        <label htmlFor="c-store">Preferred location <small>(optional)</small></label>
        <select id="c-store" name="store" defaultValue="">
          <option value="">No preference</option>
          {STORES.map((st) => <option key={st.id} value={st.name}>{st.name} — {st.area}</option>)}
        </select>
      </div>
      <div className={`${s.field} ${s.fieldFull}`}>
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
        {err("message")}
      </div>
      <button type="submit" className={s.submit}>
        Send message <span aria-hidden="true">→</span>
      </button>
      <p className={s.formNote} aria-live="polite">
        {sent ? "Your email app should now open with your message ready to send." : "We reply within one business day, Sunday to Friday."}
      </p>
    </form>
  );
}
