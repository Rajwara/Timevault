"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type CartCtx = { count: number; has: (id: string) => boolean; toggle: (id: string) => void };

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const value: CartCtx = {
    count: items.length,
    has: (id) => items.includes(id),
    toggle: (id) => setItems((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}
