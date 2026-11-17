"use client";

import type { ReactNode } from "react";
import { useStore } from "@/lib/cart";

/** Kept for the /collection page; the bag itself lives in the shared store (lib/cart.ts). */
export function CartProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useCart() {
  const s = useStore();
  return { count: s.bag.length, has: s.inBag, toggle: s.toggleBag };
}
