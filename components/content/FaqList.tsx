"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { FaqTopic } from "@/lib/faq-page";
import s from "./content.module.css";

const ALL = "all";

/**
 * Numbered question rows: hovering one blurs the others and shows a tilted photo
 * beside the list; clicking opens the answer. Open a question from a link with
 * /faq#q-<topic>-<n>, e.g. /faq#q-shipping-1.
 */
export default function FaqList({ groups }: { groups: FaqTopic[] }) {
  const [topic, setTopic] = useState(ALL);
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const visible = topic === ALL ? groups : groups.filter((g) => g.id === topic);
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const shown = hover ?? open;

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace(/^#q-/, "");
      if (id && groups.some((g) => g.items.some((_, i) => `${g.id}-${i}` === id))) {
        setTopic(ALL);
        setOpen(id);
        requestAnimationFrame(() => document.getElementById(`q-${id}`)?.scrollIntoView({ block: "center" }));
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [groups]);

  const tabs = [{ id: ALL, title: "All questions", count: total }, ...groups.map((g) => ({ id: g.id, title: g.title, count: g.items.length }))];

  return (
    <>
      <div className={s.faqTabs} role="tablist" aria-label="FAQ topics">
        {tabs.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={t.id === topic} onClick={() => { setTopic(t.id); setOpen(null); setHover(null); }}>
            {t.title}
            <small>{t.count}</small>
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-label={topic === ALL ? "All questions" : visible[0]?.title}>
        {visible.map((group) => (
          <div className={s.faqGroup} key={group.id}>
            {topic === ALL && (
              <h3 className={s.faqGroupTitle}>
                {group.title}
                <small>{group.items.length}</small>
              </h3>
            )}
            <div className={s.faqList} onMouseLeave={() => setHover(null)}>
              {group.items.map((it, i) => {
                const id = `${group.id}-${i}`;
                const isOpen = open === id;
                return (
                  <div key={id} id={`q-${id}`} className={`${s.faqRow} ${isOpen ? s.faqOpen : ""}`} onMouseEnter={() => setHover(id)}>
                    <button type="button" className={s.faqQ} aria-expanded={isOpen} aria-controls={`a-${id}`} onClick={() => setOpen(isOpen ? null : id)}>
                      <span className={s.faqNum}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={s.faqDot} aria-hidden="true" />
                      <span className={s.faqText}>{it.q}</span>
                      <span className={s.faqPlus} aria-hidden="true" />
                    </button>
                    {isOpen && (
                      <div className={s.faqA} id={`a-${id}`} role="region" aria-label={it.q}>
                        <p>{it.a}</p>
                        {it.link && <Link href={it.link.href}>{it.link.label} →</Link>}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className={s.faqImages} aria-hidden="true">
                {group.items.map((it, i) => (
                  <div key={i} className={shown === `${group.id}-${i}` ? s.on : undefined}>
                    <Image src={it.image} alt="" fill sizes="300px" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
