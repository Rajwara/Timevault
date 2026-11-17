"use client";

import { useCart } from "./Cart";
import { BagIcon, CheckIcon } from "./Icons";
import s from "@/app/collection/collection.module.css";

/** Small square "add to bag" button used on product cards. */
export default function AddButton({ id, name }: { id: string; name: string }) {
  const { has, toggle } = useCart();
  const added = has(id);
  return (
    <button
      type="button"
      className={`${s.addBtn} ${added ? s.addBtnOn : ""}`}
      aria-pressed={added}
      aria-label={added ? `Remove ${name} from bag` : `Add ${name} to bag`}
      onClick={() => toggle(id)}
    >
      {added ? <CheckIcon /> : <BagIcon />}
    </button>
  );
}
