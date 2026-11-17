"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import { directionsUrl, openStatus, serviceLabels, telHref, type Store } from "@/lib/stores";
import s from "./contact.module.css";

type Props = { stores: Store[]; selected: string | null; onSelect: (id: string | null) => void };

/**
 * Leaflet map of Dubai: round photo markers, dark numbered clusters and a
 * React card above the selected store (kept in place as the map moves).
 */
export default function StoreMap({ stores, selected, onSelect }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<Leaflet.Map | null>(null);
  const L = useRef<typeof Leaflet | null>(null);
  const cluster = useRef<Leaflet.MarkerClusterGroup | null>(null);
  const markers = useRef(new Map<string, Leaflet.Marker>());
  const [ready, setReady] = useState(false);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const store = stores.find((x) => x.id === selected) ?? null;

  const icon = (st: Store, active: boolean) =>
    L.current!.divIcon({
      className: "",
      html: `<span class="tv-pin${active ? " is-active" : ""}${st.type === "service" ? " is-service" : ""}"><img src="${st.image}" alt="" /></span>`,
      iconSize: [52, 52],
      iconAnchor: [26, 26],
    });

  // Create the map once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const lf = (await import("leaflet")).default;
      await import("leaflet.markercluster");
      if (cancelled || !box.current || map.current) return;
      L.current = lf;
      const m = lf.map(box.current, { zoomControl: false, scrollWheelZoom: false, attributionControl: true }).setView([25.15, 55.25], 11);
      lf.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(m);
      lf.control.zoom({ position: "bottomright" }).addTo(m);
      // Scroll-to-zoom only after the visitor clicks into the map, so the page still scrolls normally
      m.on("click", () => m.scrollWheelZoom.enable());
      m.on("mouseout", () => m.scrollWheelZoom.disable());
      map.current = m;
      setReady(true);
    })();
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // (Re)build markers whenever the filtered list changes
  useEffect(() => {
    const m = map.current, lf = L.current;
    if (!ready || !m || !lf) return;
    cluster.current?.remove();
    markers.current.clear();
    const group = lf.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 56,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: (c) => lf.divIcon({ className: "", html: `<span class="tv-cluster">${c.getChildCount()}</span>`, iconSize: [48, 48], iconAnchor: [24, 24] }),
    });
    stores.forEach((st) => {
      const mk = lf.marker([st.lat, st.lng], { icon: icon(st, st.id === selected), title: st.name, keyboard: true, riseOnHover: true });
      mk.on("click", () => onSelect(st.id));
      markers.current.set(st.id, mk);
      group.addLayer(mk);
    });
    group.addTo(m);
    cluster.current = group;
    if (stores.length) m.fitBounds(lf.latLngBounds(stores.map((x) => [x.lat, x.lng] as [number, number])), { padding: [90, 90], maxZoom: 13 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, stores]);

  // Highlight + reveal the selected store, and keep its card positioned
  useEffect(() => {
    const m = map.current;
    if (!ready || !m) return;
    markers.current.forEach((mk, id) => {
      const st = stores.find((x) => x.id === id);
      if (st) mk.setIcon(icon(st, id === selected));
    });
    if (!store) { setPoint(null); return; }
    const mk = markers.current.get(store.id);
    const place = () => {
      const p = m.latLngToContainerPoint([store.lat, store.lng]);
      setPoint({ x: p.x, y: p.y });
    };
    if (mk && cluster.current) {
      cluster.current.zoomToShowLayer(mk, () => {
        m.panInside([store.lat, store.lng], { paddingTopLeft: [180, 360], paddingBottomRight: [180, 40] });
        place();
      });
    }
    m.on("move zoom viewreset", place);
    return () => { m.off("move zoom viewreset", place); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, selected, stores]);

  // Escape closes the card
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onSelect(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, onSelect]);

  const status = store ? openStatus(store.hours) : null;

  return (
    <div className={s.mapBox}>
      <div ref={box} className={s.map} role="region" aria-label="Map of Time Vault locations in Dubai" />
      {!ready && <div className={s.mapLoading}>Loading map…</div>}

      {store && point && (
        <div className={s.card} style={{ left: point.x, top: point.y }} role="dialog" aria-label={store.name}>
          <div className={s.cardImg}>
            <Image src={store.image} alt="" fill sizes="280px" />
            {store.isNew && <span className={s.cardBadge}>New</span>}
            <button type="button" className={s.cardClose} aria-label="Close" onClick={() => onSelect(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" /></svg>
            </button>
          </div>
          <div className={s.cardBody}>
            <h3>{store.name}</h3>
            <p className={s.cardLine}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
              {store.area}, Dubai
            </p>
            <ul className={s.cardMeta}>
              <li className={status?.open ? s.open : s.closed}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
                {status?.text}
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" /></svg>
                <a href={telHref(store.phone)}>{store.phone}</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" /></svg>
                {store.services.map((x) => serviceLabels[x]).join(" · ")}
              </li>
            </ul>
            <div className={s.cardFoot}>
              <span className={s.cardType}>{store.type === "service" ? "Service centre" : "Boutique"}</span>
              <a className={s.cardBtn} href={directionsUrl(store)} target="_blank" rel="noopener noreferrer">Get directions</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
