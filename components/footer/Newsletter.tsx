"use client";

import { useState, type FormEvent } from "react";
import s from "./SiteFooter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setStatus("error"); return; }
    // TODO: send `email` to your email provider (Mailchimp, Klaviyo, Shopify…) here.
    setStatus("done");
    setEmail("");
  };

  return (
    <div className={s.newsForm}>
      <form onSubmit={submit} noValidate>
        <label htmlFor="footer-email" className="sr-only">Email address</label>
        <input
          id="footer-email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          aria-invalid={status === "error"}
          aria-describedby="footer-email-msg"
          onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
        />
        <button type="submit">
          Subscribe
          <span aria-hidden="true">→</span>
        </button>
      </form>
      <p id="footer-email-msg" className={s.newsMsg} aria-live="polite">
        {status === "error" && "Please enter a valid email address."}
        {status === "done" && "Thanks — you're on the list."}
      </p>
    </div>
  );
}
