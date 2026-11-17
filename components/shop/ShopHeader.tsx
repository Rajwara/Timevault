"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MegaMenu from "@/components/MegaMenu";
import { products, strapOptions, usd } from "@/lib/catalog";
import { useStore } from "@/lib/cart";
import { site } from "@/lib/site";
import { BagIcon, CloseIcon, HeartIcon, SearchIcon } from "./Icons";
import s from "@/app/shop/shop.module.css";

export default function ShopHeader() {
  const store = useStore();
  const [menu, setMenu] = useState(false);
  const bagDialog = useRef<HTMLDialogElement>(null);
  const bagItems = store.bag.map((id) => products.find((p) => p.id === id)).filter((p) => !!p);
  const subtotal = bagItems.reduce((t, p) => t + p.price, 0);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  const focusSearch = () => {
    const el = document.getElementById("shop-search") as HTMLInputElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  };

  return (
    <>
      <div className={s.announce}>
        <p>Free insured shipping on orders over $500</p>
        <p className={s.announceRight}>
          Winter sale — up to 25% off <Link href="/shop?tag=sale">Shop now</Link>
        </p>
      </div>

      <header className={s.header}>
        <div className={s.headerInner}>
          <Link href="/" className={s.logo}>{site.name}</Link>

          <nav className={s.nav} aria-label="Main">
            <Link href="/">Home</Link>
            <Link href="/shop" className={s.navActive} aria-current="page">Shop</Link>
            <MegaMenu triggerClassName={s.navMega} />
            <Link href="/collection">Lookbook</Link>
            <Link href="/collection#faq">Contact Us</Link>
          </nav>

          <div className={s.icons}>
            <button type="button" className={s.icon} aria-label="Search watches" onClick={focusSearch}><SearchIcon /></button>
            <Link href="/shop?wish=1" className={s.icon} aria-label={`Wishlist, ${store.wish.length} ${store.wish.length === 1 ? "item" : "items"}`}>
              <HeartIcon />
              <span className={s.count} aria-hidden="true">{store.wish.length}</span>
            </Link>
            <button type="button" className={s.icon} aria-label={`Shopping bag, ${store.bag.length} ${store.bag.length === 1 ? "item" : "items"}`} onClick={() => bagDialog.current?.showModal()}>
              <BagIcon />
              <span className={s.count} aria-hidden="true">{store.bag.length}</span>
            </button>
            <button type="button" className={s.burger} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="shop-menu" onClick={() => setMenu((m) => !m)}>
              <span /><span />
            </button>
          </div>
        </div>

        <div id="shop-menu" className={s.mobileMenu} hidden={!menu}>
          <Link href="/" onClick={() => setMenu(false)}>Home</Link>
          <Link href="/shop" onClick={() => setMenu(false)}>Shop</Link>
          <MegaMenu mode="mobile" triggerClassName={s.mobileMega} onNavigate={() => setMenu(false)} />
          <Link href="/collection" onClick={() => setMenu(false)}>Lookbook</Link>
          <Link href="/collection#faq" onClick={() => setMenu(false)}>Contact Us</Link>
        </div>
      </header>

      <dialog
        ref={bagDialog}
        className={s.drawer}
        aria-labelledby="bag-title"
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
      >
        <div className={s.drawerInner}>
          <div className={s.drawerHead}>
            <h2 id="bag-title">Your Bag ({bagItems.length})</h2>
            <button type="button" className={s.iconBtn} aria-label="Close bag" onClick={() => bagDialog.current?.close()}><CloseIcon /></button>
          </div>

          {bagItems.length === 0 ? (
            <p className={s.drawerEmpty}>Your bag is empty. Add a watch to see it here.</p>
          ) : (
            <ul className={s.bagList}>
              {bagItems.map((p) => (
                <li key={p.id}>
                  <span className={s.bagImg}><Image src={p.image} alt="" width={p.w} height={p.h} sizes="64px" /></span>
                  <span className={s.bagText}><strong>{p.name}</strong><small>{p.size} mm · {strapOptions.find((o) => o.value === p.strap)?.label}</small><span>{usd(p.price)}</span></span>
                  <button type="button" className={s.linkBtn} onClick={() => store.toggleBag(p.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}

          <div className={s.drawerFoot}>
            <p><span>Subtotal</span><strong>{usd(subtotal)}</strong></p>
            <small>We confirm availability, shipping and payment by email within one business day.</small>
            {bagItems.length > 0 ? (
              <a
                className={s.btnDark}
                href={`mailto:hello@example.com?subject=${encodeURIComponent("Order request")}&body=${encodeURIComponent(
                  `I'd like to order:\n${bagItems.map((p) => `- ${p.name} (${usd(p.price)})`).join("\n")}\n\nSubtotal: ${usd(subtotal)}`,
                )}`}
              >
                Request to Order
              </a>
            ) : (
              <button type="button" className={s.btnDark} disabled>Request to Order</button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
