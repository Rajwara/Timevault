import { useSyncExternalStore } from "react";

/**
 * Display currency. Prices are stored in USD and converted for display only.
 * AED and SAR are pegged to the dollar; EUR and GBP rates are approximate —
 * update them (or load live rates) before launch. Orders are confirmed in the
 * currency agreed in the order email.
 */
export const CURRENCIES = [
  { code: "USD", name: "US Dollar", rate: 1, flag: "🇺🇸" },
  { code: "AED", name: "UAE Dirham", rate: 3.6725, flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", rate: 3.75, flag: "🇸🇦" },
  { code: "EUR", name: "Euro", rate: 0.92, flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", rate: 0.79, flag: "🇬🇧" },
] as const;
export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

const KEY = "tv-currency";
const DEFAULT: CurrencyCode = "USD";
let current: CurrencyCode = DEFAULT;
let loaded = false;
const listeners = new Set<() => void>();

function subscribe(l: () => void) {
  listeners.add(l);
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    try {
      const saved = localStorage.getItem(KEY) as CurrencyCode | null;
      if (saved && CURRENCIES.some((c) => c.code === saved) && saved !== current) {
        current = saved;
        queueMicrotask(() => listeners.forEach((fn) => fn()));
      }
    } catch { /* storage blocked */ }
  }
  return () => listeners.delete(l);
}

export function setCurrency(code: CurrencyCode) {
  current = code;
  try { localStorage.setItem(KEY, code); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

const formatters = new Map<string, Intl.NumberFormat>();
export function formatPrice(usd: number, code: CurrencyCode) {
  const c = CURRENCIES.find((x) => x.code === code) ?? CURRENCIES[0];
  let f = formatters.get(code);
  if (!f) {
    f = new Intl.NumberFormat("en-US", { style: "currency", currency: code, currencyDisplay: code === "USD" || code === "EUR" || code === "GBP" ? "symbol" : "code", maximumFractionDigits: 0 });
    formatters.set(code, f);
  }
  return f.format(Math.round(usd * c.rate)).replace(/^(AED|SAR)\s?/, "$1 ");
}

export function useCurrency() {
  const code = useSyncExternalStore(subscribe, () => current, () => DEFAULT);
  return { code, set: setCurrency, fmt: (usd: number) => formatPrice(usd, code) };
}
