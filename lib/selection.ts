import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Lets menu links pick what the /collection page shows, e.g. ?faq=2 opens that FAQ answer.
 * The query string handles arriving from another page; `select()` handles clicks made
 * while already on the page (where the URL may not change).
 */
export type Selection = { cat?: string; line?: string; faq?: string };

type State = Selection & { n: number };
let state: State = { n: 0 };
const listeners = new Set<() => void>();

export function select(sel: Selection) {
  state = { ...sel, n: state.n + 1 };
  listeners.forEach((l) => l());
}

export function selectionFromHref(href: string): Selection {
  const q = new URLSearchParams(href.split("#")[0].split("?")[1] ?? "");
  return { cat: q.get("cat") ?? undefined, line: q.get("line") ?? undefined, faq: q.get("faq") ?? undefined };
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const get = () => state;

/** Calls `apply` with the requested value on page load and whenever a menu link selects one. */
export function useSelection(key: keyof Selection, apply: (value: string) => void) {
  const sel = useSyncExternalStore(subscribe, get, get);
  const applyRef = useRef(apply);
  applyRef.current = apply;
  const seen = useRef(sel.n);

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get(key);
    if (v) applyRef.current(v);
  }, [key]);

  useEffect(() => {
    if (sel.n === seen.current) return;
    seen.current = sel.n;
    const v = sel[key];
    if (v) applyRef.current(v);
  }, [sel, key]);
}
