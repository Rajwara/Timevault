"use client";

import { useCurrency } from "@/lib/currency";

/** A USD price shown in the visitor's chosen currency. */
export default function Price({ usd }: { usd: number }) {
  const { fmt } = useCurrency();
  return <>{fmt(usd)}</>;
}
