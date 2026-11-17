"use client";

import { useStore } from "@/lib/cart";

/** "Buy Now" on the homepage cards — adds the watch to the shared bag shown in the header. */
export default function BuyButton({ id, product, tabIndex }: { id: string; product: string; tabIndex?: number }) {
  const store = useStore();
  const added = store.inBag(id);
  return (
    <button
      className={`buy-btn${added ? " is-added" : ""}`}
      type="button"
      tabIndex={tabIndex}
      aria-pressed={added}
      aria-label={added ? `${product} is in your bag — remove` : `Add ${product} to bag`}
      onClick={(e) => {
        e.stopPropagation();
        store.toggleBag(id);
      }}
    >
      {added ? "In Bag" : "Buy Now"}
    </button>
  );
}
