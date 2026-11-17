import Link from "next/link";
import s from "./content.module.css";

type Variant = "dark" | "light" | "line" | "lineDark";
const cls: Record<Variant, string> = { dark: "", light: s.btnLight, line: s.btnLine, lineDark: s.btnLineDark };

/** Black pill button: the label rolls up on hover and the round arrow turns. */
export default function Btn({ href, label, variant = "dark", back = false, external = false }: { href: string; label: string; variant?: Variant; back?: boolean; external?: boolean }) {
  const inner = (
    <>
      <span className={s.roll}><span data-t={label}>{label}</span></span>
      <span className={s.ico} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d={back ? "M20 12H4M10 6l-6 6 6 6" : "M4 12h16M14 6l6 6-6 6"} />
        </svg>
      </span>
    </>
  );
  const className = `${s.btn} ${cls[variant]} ${back ? s.btnBack : ""}`;
  if (external || href.startsWith("mailto:")) {
    return <a className={className} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>;
  }
  return <Link className={className} href={href}>{inner}</Link>;
}
