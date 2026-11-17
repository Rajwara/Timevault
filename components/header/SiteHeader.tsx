"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import Announcement from "./Announcement";
import Dropdown from "./Dropdown";
import MegaPanel, { MenuColumns } from "@/components/MegaMenu";
import { products, strapOptions, usd } from "@/lib/catalog";
import { useStore } from "@/lib/cart";
import { site } from "@/lib/site";
import s from "./SiteHeader.module.css";

const ic = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const SearchIcon = () => (<svg {...ic}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>);
const UserIcon = () => (<svg {...ic}><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" /></svg>);
const HeartIcon = () => (<svg {...ic}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" /></svg>);
const BagIcon = () => (<svg {...ic}><path d="M5 8h14l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>);
const CloseIcon = () => (<svg {...ic}><path d="M6 6l12 12M18 6 6 18" /></svg>);
const MenuIcon = () => (<svg {...ic}><path d="M4 7h16M4 12h16M4 17h10" /></svg>);
const Check = () => (<svg {...ic}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);

const lines = [
  { id: "pilot", label: "Pilot Series", img: "/assets/product-1.webp", w: 527, h: 800, text: "Cockpit-ready chronographs" },
  { id: "aurum", label: "Aurum Collection", img: "/assets/product-2.webp", w: 496, h: 800, text: "Precious metals, dress dials" },
  { id: "racer", label: "Racer Line", img: "/assets/product-3.webp", w: 489, h: 800, text: "Tachymeters for the track" },
  { id: "naut", label: "Naut Signature", img: "/assets/product-4.webp", w: 613, h: 800, text: "Our integrated sports watch" },
];
const newSale = [
  { label: "New Arrivals", href: "/shop?tag=new&sort=newest", note: "New" },
  { label: "On Sale", href: "/shop?tag=sale", note: "−25%" },
  { label: "Bestsellers", href: "/shop?tag=bestseller" },
  { label: "Under $1,000", href: "/shop?price=u1000" },
  { label: "Over $10,000", href: "/shop?price=o10k" },
];
const languages = [
  { code: "EN", label: "English", ready: true },
  { code: "AR", label: "العربية", ready: false },
  { code: "FR", label: "Français", ready: false },
];
const contact = `mailto:${site.email}`;

export default function SiteHeader() {
  const store = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const bagRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const bagItems = store.bag.map((id) => products.find((p) => p.id === id)).filter((p) => !!p);
  const subtotal = bagItems.reduce((t, p) => t + p.price, 0);
  const plural = (n: number) => `${n} ${n === 1 ? "item" : "items"}`;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
    menuRef.current?.close();
  };
  const closeMenu = () => menuRef.current?.close();

  const searchForm = (id: string, autoFocus = false) => (
    <form role="search" className={s.search} onSubmit={submit}>
      <SearchIcon />
      <label htmlFor={id} className="sr-only">Search watches</label>
      <input id={id} type="search" placeholder="I'm looking for…" value={query} autoFocus={autoFocus} onChange={(e) => setQuery(e.target.value)} />
    </form>
  );

  return (
    <>
      <Announcement />

      <header className={s.header}>
        <div className={s.bar}>
          {/* ---------- Left ---------- */}
          <div className={s.left}>
            <button type="button" className={`${s.iconBtn} ${s.burger}`} aria-label="Open menu" onClick={() => menuRef.current?.showModal()}>
              <MenuIcon />
            </button>
            <button type="button" className={`${s.iconBtn} ${s.searchToggle} ${s.mobileOnly}`} aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen((o) => !o)}>
              <SearchIcon />
            </button>
            <nav className={s.nav} aria-label="Main">
              <Dropdown label="Watches" size="mega">
                {(close) => <MegaPanel onNavigate={close} />}
              </Dropdown>
              <Dropdown label="Collections">
                {(close) => (
                  <ul className={s.lineList}>
                    {lines.map((l) => (
                      <li key={l.id}>
                        <Link href={`/shop?line=${l.id}`} onClick={close}>
                          <span className={s.lineImg}><Image src={l.img} alt="" width={l.w} height={l.h} sizes="44px" /></span>
                          <span><strong>{l.label}</strong><small>{l.text} · {products.filter((p) => p.line === l.id).length} watches</small></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </Dropdown>
              <Dropdown label="New & Sale" triggerClassName={s.hideXl}>
                {(close) => (
                  <ul className={s.plainList}>
                    {newSale.map((l) => (
                      <li key={l.href}><Link href={l.href} onClick={close}>{l.label}{l.note && <span className={s.note}>{l.note}</span>}</Link></li>
                    ))}
                  </ul>
                )}
              </Dropdown>
              <Link href="/shop" className={s.pill}>Shop All Watches</Link>
            </nav>
          </div>

          {/* ---------- Logo ---------- */}
          <Link href="/" className={s.logo} aria-label={`${site.displayName} home`}>{site.name}</Link>

          {/* ---------- Right ---------- */}
          <div className={s.right}>
            <Link href="/blog" className={`${s.textLink} ${s.hideXl}`} aria-current={pathname.startsWith("/blog") ? "page" : undefined}>Journal</Link>
            <Link href="/contact" className={`${s.textLink} ${s.hideLg}`} aria-current={pathname === "/contact" ? "page" : undefined}>Stores &amp; Contact</Link>
            <div className={s.searchInline}>{searchForm("header-search")}</div>
            <button type="button" className={`${s.iconBtn} ${s.searchToggle} ${s.tabletOnly}`} aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen((o) => !o)}>
              <SearchIcon />
            </button>
            <div className={s.desktopOnly}>
              <Dropdown label="EN" align="right" ariaLabel="Language: English" triggerClassName={s.lang}>
                {(close) => (
                  <ul className={s.plainList}>
                    {languages.map((l) => (
                      <li key={l.code}>
                        <button type="button" disabled={!l.ready} aria-current={l.code === "EN" ? "true" : undefined} onClick={close}>
                          <span lang={l.code.toLowerCase()}>{l.label}</span>
                          {l.code === "EN" ? <Check /> : <span className={s.soon}>Soon</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Dropdown>
            </div>
            <div className={s.desktopOnly}>
              <Dropdown label={<UserIcon />} align="right" ariaLabel="My account" triggerClassName={s.iconTrigger}>
                {(close) => (
                  <div className={s.account}>
                    <p className={s.accountTitle}>My account</p>
                    <ul className={s.plainList}>
                      <li><Link href="/shop?wish=1" onClick={close}>Wishlist <span className={s.muted}>{store.wish.length}</span></Link></li>
                      <li><button type="button" onClick={() => { close(); bagRef.current?.showModal(); }}>Shopping bag <span className={s.muted}>{store.bag.length}</span></button></li>
                      <li><a href={`${contact}?subject=${encodeURIComponent("Order status")}`} onClick={close}>Track an order</a></li>
                      <li><Link href="/faq" onClick={close}>Help &amp; FAQ</Link></li>
                    </ul>
                  </div>
                )}
              </Dropdown>
            </div>
            <Link href="/shop?wish=1" className={`${s.iconBtn} ${s.hideSm}`} aria-label={`Wishlist, ${plural(store.wish.length)}`}>
              <HeartIcon />
              {store.wish.length > 0 && <span className={s.count} aria-hidden="true">{store.wish.length}</span>}
            </Link>
            <button type="button" className={s.iconBtn} aria-label={`Shopping bag, ${plural(store.bag.length)}`} onClick={() => bagRef.current?.showModal()}>
              <BagIcon />
              {store.bag.length > 0 && <span className={s.count} aria-hidden="true">{store.bag.length}</span>}
            </button>
          </div>
        </div>

        {searchOpen && <div className={s.searchRow}>{searchForm("header-search-row", true)}</div>}
      </header>

      {/* ---------- Mobile menu ---------- */}
      <dialog ref={menuRef} className={s.drawer} aria-label="Menu" onClick={(e) => { if (e.target === e.currentTarget) closeMenu(); }}>
        <div className={s.drawerInner}>
          <div className={s.drawerHead}>
            <span className={s.logo}>{site.name}</span>
            <button type="button" className={s.iconBtn} aria-label="Close menu" onClick={closeMenu}><CloseIcon /></button>
          </div>
          {searchForm("menu-search")}
          <Link href="/shop" className={`${s.pill} ${s.pillBlock}`} onClick={closeMenu}>Shop All Watches</Link>

          {[
            { key: "watches", label: "Watches", body: <MenuColumns compact onNavigate={closeMenu} /> },
            { key: "collections", label: "Collections", body: (
              <ul className={s.lineList}>
                {lines.map((l) => (
                  <li key={l.id}><Link href={`/shop?line=${l.id}`} onClick={closeMenu}>
                    <span className={s.lineImg}><Image src={l.img} alt="" width={l.w} height={l.h} sizes="44px" /></span>
                    <span><strong>{l.label}</strong><small>{l.text}</small></span>
                  </Link></li>
                ))}
              </ul>
            ) },
            { key: "new", label: "New & Sale", body: (
              <ul className={s.plainList}>{newSale.map((l) => <li key={l.href}><Link href={l.href} onClick={closeMenu}>{l.label}</Link></li>)}</ul>
            ) },
          ].map((sec) => {
            const open = mobileSection === sec.key;
            return (
              <div key={sec.key} className={s.acc}>
                <button type="button" className={s.accHead} aria-expanded={open} onClick={() => setMobileSection(open ? null : sec.key)}>
                  {sec.label}<span className={`${s.plus} ${open ? s.plusOpen : ""}`} aria-hidden="true" />
                </button>
                {open && <div className={s.accBody}>{sec.body}</div>}
              </div>
            );
          })}

          <nav className={s.drawerLinks} aria-label="More">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/collection" onClick={closeMenu}>Lookbook</Link>
            <Link href="/blog" onClick={closeMenu}>Journal</Link>
            <Link href="/shop?wish=1" onClick={closeMenu}>Wishlist ({store.wish.length})</Link>
            <Link href="/faq" onClick={closeMenu}>Help &amp; FAQ</Link>
            <Link href="/contact" onClick={closeMenu}>Stores &amp; Contact</Link>
          </nav>
          <p className={s.drawerLang}>Language: <strong>English</strong> <span className={s.soon}>More soon</span></p>
        </div>
      </dialog>

      {/* ---------- Bag ---------- */}
      <dialog ref={bagRef} className={`${s.drawer} ${s.drawerRight}`} aria-labelledby="bag-title" onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}>
        <div className={s.drawerInner}>
          <div className={s.drawerHead}>
            <h2 id="bag-title">Your Bag ({bagItems.length})</h2>
            <button type="button" className={s.iconBtn} aria-label="Close bag" onClick={() => bagRef.current?.close()}><CloseIcon /></button>
          </div>
          {bagItems.length === 0 ? (
            <div className={s.bagEmpty}>
              <p>Your bag is empty.</p>
              <Link href="/shop" className={s.pill} onClick={() => bagRef.current?.close()}>Shop All Watches</Link>
            </div>
          ) : (
            <ul className={s.bagList}>
              {bagItems.map((p) => (
                <li key={p.id}>
                  <span className={s.bagImg}><Image src={p.image} alt="" width={p.w} height={p.h} sizes="64px" /></span>
                  <span className={s.bagText}>
                    <strong>{p.name}</strong>
                    <small>{p.size} mm · {strapOptions.find((o) => o.value === p.strap)?.label}</small>
                    <span>{usd(p.price)}</span>
                  </span>
                  <button type="button" className={s.linkBtn} onClick={() => store.toggleBag(p.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
          <div className={s.bagFoot}>
            <p><span>Subtotal</span><strong>{usd(subtotal)}</strong></p>
            <small>We confirm availability, shipping and payment by email within one business day.</small>
            {bagItems.length > 0 ? (
              <a
                className={`${s.pill} ${s.pillBlock}`}
                href={`${contact}?subject=${encodeURIComponent("Order request")}&body=${encodeURIComponent(
                  `I'd like to order:\n${bagItems.map((p) => `- ${p.name} (${usd(p.price)})`).join("\n")}\n\nSubtotal: ${usd(subtotal)}`,
                )}`}
              >
                Request to Order
              </a>
            ) : (
              <button type="button" className={`${s.pill} ${s.pillBlock}`} disabled>Request to Order</button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
