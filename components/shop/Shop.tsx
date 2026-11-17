"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  dialOptions, discount, lineOptions, priceOptions, products, sizeOptions, sortOptions, strapOptions, styleOptions, tagOptions, usd,
  type Product, type Sort,
} from "@/lib/catalog";
import { useStore } from "@/lib/cart";
import { BagIcon, CheckIcon, ChevronLeft, ChevronRight, CloseIcon, EyeIcon, FilterIcon, Grid2Icon, Grid3Icon, HeartIcon, ListIcon, SearchIcon } from "./Icons";
import s from "@/app/shop/shop.module.css";

const PER_PAGE = 9;

/* ---------- Filters <-> URL ---------- */
const groups = {
  line: { title: "Collections", options: lineOptions },
  cat: { title: "Style", options: styleOptions },
  dial: { title: "Dial Colour", options: dialOptions },
  strap: { title: "Strap Material", options: strapOptions },
  price: { title: "Price", options: priceOptions },
  size: { title: "Case Size", options: sizeOptions },
  tag: { title: "Tags", options: tagOptions },
} as const;
type GroupKey = keyof typeof groups;
const groupKeys = Object.keys(groups) as GroupKey[];
type Filters = Record<GroupKey, string[]>;

function readFilters(q: URLSearchParams): Filters {
  const f = {} as Filters;
  for (const k of groupKeys) {
    const allowed = new Set<string>(groups[k].options.map((o) => o.value));
    f[k] = (q.get(k) ?? "").split(",").filter((v) => allowed.has(v));
  }
  return f;
}

function matchGroup(p: Product, k: GroupKey, values: string[]) {
  if (values.length === 0) return true;
  switch (k) {
    case "line": return values.includes(p.line);
    case "cat": return values.includes(p.style);
    case "dial": return values.includes(p.dial);
    case "strap": return values.includes(p.strap);
    case "tag": return values.some((v) => p.tags.includes(v as Product["tags"][number]));
    case "price": return priceOptions.some((o) => values.includes(o.value) && p.price >= o.min && p.price <= o.max);
    case "size": return sizeOptions.some((o) => values.includes(o.value) && p.size >= o.min && p.size <= o.max);
  }
}

const matches = (p: Product, f: Filters, search: string, wish: string[] | null, except?: GroupKey) =>
  groupKeys.every((k) => k === except || matchGroup(p, k, f[k])) &&
  (!search || `${p.name} ${p.blurb} ${p.line} ${p.style} ${p.strap}`.toLowerCase().includes(search.toLowerCase())) &&
  (!wish || wish.includes(p.id));

function sortList(list: Product[], sort: Sort) {
  const l = [...list];
  switch (sort) {
    case "newest": return l.sort((a, b) => b.added - a.added);
    case "price-asc": return l.sort((a, b) => a.price - b.price);
    case "price-desc": return l.sort((a, b) => b.price - a.price);
    case "name-asc": return l.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc": return l.sort((a, b) => b.name.localeCompare(a.name));
    default: return l;
  }
}

/* ---------- Page ---------- */
export function ShopFromUrl() {
  const params = useSearchParams();
  return <Shop query={params.toString()} />;
}

export default function Shop({ query }: { query: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const q = useMemo(() => new URLSearchParams(query), [query]);
  const store = useStore();

  const filters = readFilters(q);
  const sort = (sortOptions.find((o) => o.value === q.get("sort"))?.value ?? "featured") as Sort;
  const view = (["grid-2", "grid-3", "list"].includes(q.get("view") ?? "") ? q.get("view") : "grid-3") as "grid-2" | "grid-3" | "list";
  const search = q.get("q") ?? "";
  const wishOnly = q.get("wish") === "1";

  const [drawer, setDrawer] = useState(false);
  const [searchText, setSearchText] = useState(search);
  const [quick, setQuick] = useState<Product | null>(null);
  const quickRef = useRef<HTMLDialogElement>(null);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => setSearchText(search), [search]);

  const update = (changes: Record<string, string | null>, keepPage = false) => {
    const next = new URLSearchParams(q);
    for (const [k, v] of Object.entries(changes)) {
      if (v === null || v === "") next.delete(k);
      else next.set(k, v);
    }
    if (!keepPage) next.delete("page");
    const str = next.toString();
    router.replace(str ? `${pathname}?${str}` : pathname, { scroll: false });
  };

  // Debounced search box -> URL
  useEffect(() => {
    if (searchText === search) return;
    const t = setTimeout(() => update({ q: searchText.trim() || null }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const toggle = (k: GroupKey, v: string) => {
    const cur = filters[k];
    const next = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v];
    update({ [k]: next.join(",") || null });
  };

  const wishList = wishOnly ? store.wish : null;
  const results = sortList(products.filter((p) => matches(p, filters, search, wishList)), sort);
  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const page = Math.min(Math.max(Number(q.get("page")) || 1, 1), pages);
  const shown = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const active = groupKeys.flatMap((k) =>
    filters[k].map((v) => ({ k, v, label: (groups[k].options as readonly { value: string; label: string }[]).find((o) => o.value === v)!.label })),
  );
  const activeCount = active.length + (search ? 1 : 0) + (wishOnly ? 1 : 0);
  const clearAll = () => router.replace(pathname, { scroll: false });

  const goPage = (n: number) => {
    update({ page: n === 1 ? null : String(n) }, true);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openQuick = (p: Product) => { setQuick(p); requestAnimationFrame(() => quickRef.current?.showModal()); };

  // Lock page scroll while the mobile filter drawer is open
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [drawer]);

  return (
    <>
      <div className={s.crumbs}>
        <nav aria-label="Breadcrumb" className={s.wrap}>
          <ol>
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Shop</li>
          </ol>
        </nav>
      </div>

      <div className={`${s.wrap} ${s.layout}`} ref={top}>
        {/* ---------- Sidebar ---------- */}
        <aside className={`${s.sidebar} ${drawer ? s.sidebarOpen : ""}`} aria-label="Filters">
          <div className={s.sideHead}>
            <h2>Filters</h2>
            <button type="button" className={s.iconBtn} aria-label="Close filters" onClick={() => setDrawer(false)}><CloseIcon /></button>
          </div>

          <div className={s.searchBox}>
            <SearchIcon />
            <label htmlFor="shop-search" className="sr-only">Search watches</label>
            <input id="shop-search" type="search" placeholder="Search watches…" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          </div>

          {groupKeys.map((k) => {
            const g = groups[k];
            return (
              <fieldset key={k} className={s.group}>
                <legend>{g.title}</legend>
                {k === "dial" ? (
                  <div className={s.swatches}>
                    {dialOptions.map((o) => {
                      const on = filters.dial.includes(o.value);
                      const n = products.filter((p) => p.dial === o.value && matches(p, filters, search, wishList, "dial")).length;
                      return (
                        <button
                          key={o.value}
                          type="button"
                          className={`${s.swatch} ${on ? s.swatchOn : ""}`}
                          style={{ background: o.color }}
                          aria-pressed={on}
                          aria-label={`${o.label} dial (${n})`}
                          title={`${o.label} (${n})`}
                          onClick={() => toggle("dial", o.value)}
                        >
                          {on && <CheckIcon />}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <ul className={s.checks}>
                    {(g.options as readonly { value: string; label: string }[]).map((o) => {
                      const on = filters[k].includes(o.value);
                      const n = products.filter((p) => matchGroup(p, k, [o.value]) && matches(p, filters, search, wishList, k)).length;
                      return (
                        <li key={o.value}>
                          <label className={`${s.check} ${n === 0 && !on ? s.checkEmpty : ""}`}>
                            <input type="checkbox" checked={on} onChange={() => toggle(k, o.value)} />
                            <span className={s.box} aria-hidden="true"><CheckIcon /></span>
                            <span className={s.checkLabel}>{o.label}</span>
                            <span className={s.checkCount}>{String(n).padStart(2, "0")}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </fieldset>
            );
          })}

          <div className={s.sideFoot}>
            <button type="button" className={s.btnLight} onClick={clearAll} disabled={activeCount === 0}>Clear all</button>
            <button type="button" className={s.btnDark} onClick={() => setDrawer(false)}>Show {results.length} watches</button>
          </div>
        </aside>
        <div className={`${s.scrim} ${drawer ? s.scrimOn : ""}`} onClick={() => setDrawer(false)} aria-hidden="true" />

        {/* ---------- Results ---------- */}
        <section className={s.results} aria-labelledby="shop-title">
          <div className={s.titleRow}>
            <h1 id="shop-title">{wishOnly ? "Your Wishlist" : "Shop All Watches"}</h1>
            <p aria-live="polite">
              {results.length === 0 ? "No results" : `Showing ${(page - 1) * PER_PAGE + 1}–${(page - 1) * PER_PAGE + shown.length} of ${results.length} watches`}
            </p>
          </div>

          <div className={s.toolbar}>
            <button type="button" className={s.filterBtn} onClick={() => setDrawer(true)} aria-expanded={drawer}>
              <FilterIcon /> Filters{activeCount > 0 && <span>{activeCount}</span>}
            </button>
            <div className={s.views} role="group" aria-label="Layout">
              {([["grid-2", Grid2Icon, "Large grid"], ["grid-3", Grid3Icon, "Grid"], ["list", ListIcon, "List"]] as const).map(([v, Icon, label]) => (
                <button key={v} type="button" className={view === v ? s.viewOn : ""} aria-pressed={view === v} aria-label={label} onClick={() => update({ view: v === "grid-3" ? null : v }, true)}>
                  <Icon />
                </button>
              ))}
            </div>
            <label className={s.sort}>
              <span>Sort by</span>
              <select value={sort} onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}>
                {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
          </div>

          {activeCount > 0 && (
            <div className={s.chips}>
              {wishOnly && <button type="button" onClick={() => update({ wish: null })}>Wishlist only <CloseIcon /></button>}
              {search && <button type="button" onClick={() => { setSearchText(""); update({ q: null }); }}>“{search}” <CloseIcon /></button>}
              {active.map((a) => (
                <button type="button" key={`${a.k}-${a.v}`} onClick={() => toggle(a.k, a.v)} aria-label={`Remove filter ${a.label}`}>{a.label} <CloseIcon /></button>
              ))}
              <button type="button" className={s.chipClear} onClick={clearAll}>Clear all</button>
            </div>
          )}

          {shown.length === 0 ? (
            <div className={s.empty}>
              <h2>{wishOnly && store.wish.length === 0 ? "Your wishlist is empty" : "No watches match these filters"}</h2>
              <p>{wishOnly && store.wish.length === 0 ? "Tap the heart on any watch to save it here." : "Try removing a filter or searching for something else."}</p>
              <button type="button" className={s.btnDark} onClick={clearAll}>View all watches</button>
            </div>
          ) : (
            <ul className={`${s.grid} ${view === "grid-2" ? s.grid2 : view === "list" ? s.list : ""}`}>
              {shown.map((p) => {
                const off = discount(p);
                const inBag = store.inBag(p.id);
                const inWish = store.inWish(p.id);
                return (
                  <li key={p.id} className={s.product}>
                    <div className={s.pImg}>
                      {off > 0 && <span className={s.badge}>-{off}%</span>}
                      {p.tags.includes("new") && <span className={`${s.badge} ${s.badgeNew}`}>New</span>}
                      <button type="button" className={s.pImgBtn} onClick={() => openQuick(p)} aria-label={`Quick view ${p.name}`}>
                        <Image src={p.image} alt={p.name} width={p.w} height={p.h} sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 300px" />
                      </button>
                      <div className={s.actions}>
                        <button type="button" className={inBag ? s.actOn : ""} aria-pressed={inBag} aria-label={inBag ? `Remove ${p.name} from bag` : `Add ${p.name} to bag`} onClick={() => store.toggleBag(p.id)}>
                          {inBag ? <CheckIcon /> : <BagIcon />}
                        </button>
                        <button type="button" aria-label={`Quick view ${p.name}`} onClick={() => openQuick(p)}><EyeIcon /></button>
                        <button type="button" className={inWish ? s.actOn : ""} aria-pressed={inWish} aria-label={inWish ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`} onClick={() => store.toggleWish(p.id)}>
                          <HeartIcon filled={inWish} />
                        </button>
                      </div>
                    </div>
                    <div className={s.pInfo}>
                      <p className={s.pLine}>{lineOptions.find((l) => l.value === p.line)?.label}</p>
                      <h3 className={s.pName}>{p.name}</h3>
                      <p className={s.pBlurb}>{p.blurb}</p>
                      <p className={s.pPrice}>
                        {usd(p.price)}
                        {p.was && <s><span className="sr-only">was </span>{usd(p.was)}</s>}
                      </p>
                      <button type="button" className={`${s.btnDark} ${s.pListBtn}`} onClick={() => store.toggleBag(p.id)}>
                        {inBag ? "In your bag" : "Add to bag"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {pages > 1 && (
            <nav className={s.pager} aria-label="Pagination">
              <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => goPage(page - 1)}><ChevronLeft /></button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" className={n === page ? s.pageOn : ""} aria-current={n === page ? "page" : undefined} onClick={() => goPage(n)}>
                  {String(n).padStart(2, "0")}
                </button>
              ))}
              <button type="button" aria-label="Next page" disabled={page === pages} onClick={() => goPage(page + 1)}><ChevronRight /></button>
            </nav>
          )}
        </section>
      </div>

      {/* ---------- Quick view ---------- */}
      <dialog
        ref={quickRef}
        className={s.quick}
        aria-labelledby="quick-title"
        onClose={() => setQuick(null)}
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
      >
        {quick && (
          <div className={s.quickInner}>
            <button type="button" className={`${s.iconBtn} ${s.quickClose}`} aria-label="Close" onClick={() => quickRef.current?.close()}><CloseIcon /></button>
            <div className={s.quickImg}>
              <Image src={quick.image} alt={quick.name} width={quick.w} height={quick.h} sizes="(max-width: 760px) 90vw, 420px" />
            </div>
            <div className={s.quickText}>
              <p className={s.pLine}>{lineOptions.find((l) => l.value === quick.line)?.label}</p>
              <h2 id="quick-title">{quick.name}</h2>
              <p className={s.pPrice}>{usd(quick.price)}{quick.was && <s>{usd(quick.was)}</s>}</p>
              <p className={s.quickBlurb}>{quick.blurb}</p>
              <dl className={s.specs}>
                <div><dt>Case size</dt><dd>{quick.size} mm</dd></div>
                <div><dt>Strap</dt><dd>{strapOptions.find((o) => o.value === quick.strap)?.label}</dd></div>
                <div><dt>Dial</dt><dd>{dialOptions.find((o) => o.value === quick.dial)?.label}</dd></div>
                <div><dt>Style</dt><dd>{styleOptions.find((o) => o.value === quick.style)?.label}</dd></div>
                <div><dt>Warranty</dt><dd>5 years</dd></div>
              </dl>
              <div className={s.quickBtns}>
                <button type="button" className={s.btnDark} onClick={() => store.toggleBag(quick.id)}>
                  {store.inBag(quick.id) ? <><CheckIcon /> In your bag</> : <><BagIcon /> Add to bag</>}
                </button>
                <button type="button" className={`${s.btnLight} ${store.inWish(quick.id) ? s.wishOn : ""}`} aria-pressed={store.inWish(quick.id)} onClick={() => store.toggleWish(quick.id)}>
                  <HeartIcon filled={store.inWish(quick.id)} /> {store.inWish(quick.id) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
