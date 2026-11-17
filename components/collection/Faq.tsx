"use client";

import { useState } from "react";
import { Plus } from "./Icons";
import { faqs } from "@/lib/collection";
import { useSelection } from "@/lib/selection";
import s from "@/app/collection/collection.module.css";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  useSelection("faq", (v) => {
    const i = Number(v);
    if (Number.isInteger(i) && i >= 0 && i < faqs.length) setOpen(i);
  });

  return (
    <section className={s.faq} id="faq" aria-labelledby="faq-title">
      <div className={s.faqSide}>
        <div>
          <p className={s.label} data-reveal="">*Good to know</p>
          <h2 id="faq-title" className={s.h2Left} data-reveal="">Frequently<br />Asked<br />Questions</h2>
        </div>
        <div className={s.helpCard}>
          <h3>Have more questions?</h3>
          <p>Our watch specialists reply within one business day.</p>
          <a href="mailto:hello@example.com" className={s.btnDark}>Contact Us</a>
        </div>
      </div>

      <div className={s.faqList}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`${s.faqItem} ${isOpen ? s.faqOpen : ""}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  id={`faq-h-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {f.q}
                  <span className={s.faqIcon}><Plus /></span>
                </button>
              </h3>
              <div className={s.accBody} id={`faq-${i}`} role="region" aria-labelledby={`faq-h-${i}`}>
                <div className={s.accInner}><p>{f.a}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
