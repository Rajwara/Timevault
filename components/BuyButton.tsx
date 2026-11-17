"use client";

import { useEffect, useRef, useState } from "react";

export default function BuyButton({ product, tabIndex }: { product: string; tabIndex?: number }) {
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      className={`buy-btn${added ? " is-added" : ""}`}
      type="button"
      tabIndex={tabIndex}
      aria-label={added ? `${product} added to cart` : `Buy ${product}`}
      aria-live="polite"
      onClick={(e) => {
        e.stopPropagation();
        setAdded(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setAdded(false), 1400);
      }}
    >
      {added ? "Added" : "Buy Now"}
    </button>
  );
}
