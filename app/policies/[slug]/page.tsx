import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Btn from "@/components/content/Btn";
import PolicyToc from "@/components/content/PolicyToc";
import { POLICIES, getPolicy, type PolicyIcon } from "@/lib/policies";
import { site } from "@/lib/site";
import s from "@/components/content/content.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPolicy((await params).slug);
  return p ? { title: p.title, description: p.intro, alternates: { canonical: `/policies/${p.slug}` } } : {};
}

const ICONS: Record<PolicyIcon, React.ReactNode> = {
  return: <path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />,
  swap: <path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" />,
  truck: <><path d="M2 6h12v11H2zM14 10h4l4 4v3h-8z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" /><path d="m9 12 2 2 4-4" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  tool: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
};

const date = (iso: string) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function PolicyPage({ params }: Props) {
  const policy = getPolicy((await params).slug);
  if (!policy) notFound();

  return (
    <main id="main" className={s.page}>
      <section className={s.hero}>
        <nav className={s.tabs} aria-label="Policies">
          {POLICIES.map((p) => (
            <Link key={p.slug} href={`/policies/${p.slug}`} aria-current={p.slug === policy.slug ? "page" : undefined}>
              {p.tab}
            </Link>
          ))}
        </nav>
        <span className={s.label}>*Policies</span>
        <h1>{policy.title}</h1>
        <p className={s.heroText}>{policy.intro}</p>
        <span className={s.chip}>Last updated {date(policy.updated)}</span>
      </section>

      <section className={`${s.points} ${s.container}`} aria-label="Key points">
        {policy.points.map((pt, i) => (
          <article className={s.point} key={pt.title}>
            <div className={s.pointTop}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[pt.icon]}</svg>
              <b>{String(i + 1).padStart(2, "0")}</b>
            </div>
            <h3>{pt.title}</h3>
            <p>{pt.text}</p>
          </article>
        ))}
      </section>

      <div className={`${s.body} ${s.container}`}>
        <aside className={s.toc}>
          <span className={s.label}>*On this page</span>
          <PolicyToc items={policy.sections.map((x) => ({ id: x.id, title: x.title }))} />
          <div className={s.help}>
            <b>Need help?</b>
            <p>Email our team — we reply within one business day.</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </aside>
        <article>
          {policy.sections.map((sec, i) => (
            <section className={s.section} id={sec.id} key={sec.id}>
              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2>{sec.title}</h2>
                {sec.body.map((b, j) =>
                  typeof b === "string" ? <p key={j}>{b}</p> : <ul key={j}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>,
                )}
              </div>
            </section>
          ))}
        </article>
      </div>

      <section className={s.cta}>
        <div className={`${s.container} ${s.ctaRow}`}>
          <div>
            <span className={s.label}>*Still have a question?</span>
            <h2>We&apos;re here to help</h2>
            <p>Browse our FAQ, or email the team — a real person replies within one business day.</p>
          </div>
          <div className={s.ctaBtns}>
            <Btn href="/faq" label="Read the FAQ" variant="light" />
            <Btn href={`mailto:${site.email}`} label="Email us" variant="lineDark" />
          </div>
        </div>
      </section>
    </main>
  );
}
