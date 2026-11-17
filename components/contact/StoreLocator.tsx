"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { STORES, directionsUrl, hoursRows, openStatus, serviceLabels, telHref, type Service, type StoreType } from "@/lib/stores";
import s from "./contact.module.css";

// Leaflet needs the browser, so the map is only rendered client-side
const StoreMap = dynamic(() => import("./StoreMap"), { ssr: false, loading: () => <div className={s.mapBox}><div className={s.mapLoading}>Loading map…</div></div> });

export default function StoreLocator() {
  const [type, setType] = useState<"all" | StoreType>("all");
  const [service, setService] = useState<"all" | Service>("all");
  const [openNow, setOpenNow] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [, tick] = useState(0);
  const mapTop = useRef<HTMLDivElement>(null);

  // Re-evaluate "open now" every minute
  useEffect(() => { const t = setInterval(() => tick((n) => n + 1), 60_000); return () => clearInterval(t); }, []);

  const stores = useMemo(
    () => STORES.filter((x) => (type === "all" || x.type === type) && (service === "all" || x.services.includes(service)) && (!openNow || openStatus(x.hours).open)),
    [type, service, openNow],
  );
  useEffect(() => { if (selected && !stores.some((x) => x.id === selected)) setSelected(null); }, [stores, selected]);

  const select = useCallback((id: string | null) => setSelected(id), []);
  const showOnMap = (id: string) => {
    setSelected(id);
    mapTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className={s.mapWrap} ref={mapTop}>
        <form className={s.filterBar} data-filter-bar onSubmit={(e) => e.preventDefault()} aria-label="Filter locations">
          <label className={s.select}>
            <span className="sr-only">Location type</span>
            <select value={type} onChange={(e) => setType(e.target.value as typeof type)}>
              <option value="all">All locations</option>
              <option value="boutique">Boutiques</option>
              <option value="service">Service centre</option>
            </select>
          </label>
          <label className={s.select}>
            <span className="sr-only">Service</span>
            <select value={service} onChange={(e) => setService(e.target.value as typeof service)}>
              <option value="all">All services</option>
              {(Object.keys(serviceLabels) as Service[]).map((k) => <option key={k} value={k}>{serviceLabels[k]}</option>)}
            </select>
          </label>
          <button type="button" className={`${s.toggle} ${openNow ? s.toggleOn : ""}`} aria-pressed={openNow} onClick={() => setOpenNow((v) => !v)}>
            <span className={s.toggleDot} aria-hidden="true" /> Open now
          </button>
          <span className={s.count} aria-live="polite">{stores.length} {stores.length === 1 ? "location" : "locations"}</span>
        </form>

        <StoreMap stores={stores} selected={selected} onSelect={select} />
      </div>

      <div className={s.storeGrid}>
        {stores.length === 0 && <p className={s.none}>No locations match these filters. Try turning off &ldquo;Open now&rdquo;.</p>}
        {stores.map((st) => {
          const status = openStatus(st.hours);
          return (
            <article key={st.id} className={`${s.store} ${selected === st.id ? s.storeOn : ""}`}>
              <div className={s.storeImg}>
                <Image src={st.image} alt="" fill sizes="(max-width: 760px) 100vw, 380px" />
                <span className={s.storeType}>{st.type === "service" ? "Service centre" : "Boutique"}</span>
                {st.isNew && <span className={s.storeNew}>New</span>}
              </div>
              <div className={s.storeBody}>
                <h3>{st.name}</h3>
                <p className={s.storeAddr}>{st.address}</p>
                <p className={`${s.status} ${status.open ? s.open : s.closed}`}><span aria-hidden="true" />{status.text}</p>
                <dl className={s.hours}>
                  {hoursRows(st.hours).map((r) => (
                    <div key={r.days}><dt>{r.days}</dt><dd>{r.time}</dd></div>
                  ))}
                </dl>
                <p className={s.storeServices}>{st.services.map((x) => serviceLabels[x]).join(" · ")}</p>
                <div className={s.storeFoot}>
                  <a href={telHref(st.phone)} className={s.storePhone}>{st.phone}</a>
                  <div className={s.storeBtns}>
                    <button type="button" className={s.ghostBtn} onClick={() => showOnMap(st.id)}>Show on map</button>
                    <a className={s.darkBtn} href={directionsUrl(st)} target="_blank" rel="noopener noreferrer">Directions</a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
