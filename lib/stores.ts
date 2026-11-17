/**
 * Boutiques and service centre in Dubai shown on /contact.
 * DUMMY DATA: the names, phone numbers and hours are placeholders — replace them
 * with your real locations before launch. Coordinates are approximate.
 */

export type StoreType = "boutique" | "service";
export type Service = "servicing" | "straps" | "engraving" | "sizing";

/** Opening hours by weekday (0 = Sunday … 6 = Saturday), 24h "HH:MM"; "24:00" means midnight. */
export type Hours = Record<number, [string, string] | null>;

export type Store = {
  id: string;
  name: string;
  area: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  type: StoreType;
  services: Service[];
  hours: Hours;
  image: string;
  isNew?: boolean;
};

const mallLate: Hours = { 0: ["10:00", "23:00"], 1: ["10:00", "23:00"], 2: ["10:00", "23:00"], 3: ["10:00", "23:00"], 4: ["10:00", "24:00"], 5: ["10:00", "24:00"], 6: ["10:00", "24:00"] };
const mall: Hours = { 0: ["10:00", "22:00"], 1: ["10:00", "22:00"], 2: ["10:00", "22:00"], 3: ["10:00", "22:00"], 4: ["10:00", "24:00"], 5: ["10:00", "24:00"], 6: ["10:00", "24:00"] };
const street: Hours = { 0: ["10:00", "22:00"], 1: ["10:00", "22:00"], 2: ["10:00", "22:00"], 3: ["10:00", "22:00"], 4: ["10:00", "23:00"], 5: ["14:00", "23:00"], 6: ["10:00", "23:00"] };
const office: Hours = { 0: null, 1: ["09:00", "18:00"], 2: ["09:00", "18:00"], 3: ["09:00", "18:00"], 4: ["09:00", "18:00"], 5: ["09:00", "13:00"], 6: ["10:00", "16:00"] };

export const STORES: Store[] = [
  { id: "dubai-mall", name: "The Dubai Mall", area: "Downtown Dubai", address: "Level 1, Fashion Avenue, The Dubai Mall, Downtown Dubai", lat: 25.1985, lng: 55.2796, phone: "+971 4 555 0101", type: "boutique", services: ["straps", "sizing", "engraving"], hours: mallLate, image: "/assets/story-2a.webp" },
  { id: "moe", name: "Mall of the Emirates", area: "Al Barsha", address: "Ground Floor, Fashion Dome, Mall of the Emirates, Al Barsha 1", lat: 25.1181, lng: 55.2006, phone: "+971 4 555 0102", type: "boutique", services: ["straps", "sizing"], hours: mall, image: "/assets/story-1.webp" },
  { id: "marina", name: "Dubai Marina Mall", area: "Dubai Marina", address: "Level 1, Dubai Marina Mall, Sheikh Zayed Road, Dubai Marina", lat: 25.0763, lng: 55.1405, phone: "+971 4 555 0103", type: "boutique", services: ["straps", "sizing"], hours: mall, image: "/assets/video-thumb.webp" },
  { id: "city-walk", name: "City Walk", area: "Al Wasl", address: "Building 8, City Walk, Al Safa Street, Al Wasl", lat: 25.2063, lng: 55.2622, phone: "+971 4 555 0104", type: "boutique", services: ["straps", "engraving"], hours: street, image: "/assets/story-2b.webp", isNew: true },
  { id: "festival-city", name: "Dubai Festival City Mall", area: "Festival City", address: "Level 1, Dubai Festival City Mall, Al Rebat Street", lat: 25.2222, lng: 55.3524, phone: "+971 4 555 0105", type: "boutique", services: ["straps", "sizing"], hours: mall, image: "/assets/arrival-4.webp" },
  { id: "ibn-battuta", name: "Ibn Battuta Mall", area: "Jebel Ali", address: "China Court, Ibn Battuta Mall, Sheikh Zayed Road, Jebel Ali", lat: 25.0446, lng: 55.1186, phone: "+971 4 555 0106", type: "boutique", services: ["straps"], hours: mall, image: "/assets/arrival-2.webp" },
  { id: "dubai-hills", name: "Dubai Hills Mall", area: "Dubai Hills Estate", address: "Ground Floor, Dubai Hills Mall, Al Khail Road", lat: 25.1025, lng: 55.2398, phone: "+971 4 555 0107", type: "boutique", services: ["straps", "sizing", "engraving"], hours: mall, image: "/assets/arrival-3.webp", isNew: true },
  { id: "service-centre", name: "Service Centre & Studio", area: "Al Quoz", address: "Warehouse 42, Alserkal Avenue, Al Quoz 1", lat: 25.1416, lng: 55.2253, phone: "+971 4 555 0123", type: "service", services: ["servicing", "straps", "sizing", "engraving"], hours: office, image: "/assets/arrival-5.webp" },
];

export const serviceLabels: Record<Service, string> = {
  servicing: "Watch servicing",
  straps: "Strap fitting",
  sizing: "Bracelet sizing",
  engraving: "Engraving",
};

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const fmt = (t: string) => {
  if (t === "24:00") return "Midnight";
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}${m ? ":" + String(m).padStart(2, "0") : ""}${h < 12 ? "am" : "pm"}`;
};
export const formatRange = (r: [string, string] | null) => (r ? `${fmt(r[0])} – ${fmt(r[1])}` : "Closed");

/** Weekly hours grouped into rows like "Sun – Wed: 10am – 10pm". */
export function hoursRows(h: Hours) {
  const rows: { days: string; time: string }[] = [];
  let start = 0;
  for (let d = 1; d <= 7; d++) {
    if (d === 7 || formatRange(h[d]) !== formatRange(h[start])) {
      const label = start === d - 1 ? DAYS[start].slice(0, 3) : `${DAYS[start].slice(0, 3)} – ${DAYS[d - 1].slice(0, 3)}`;
      rows.push({ days: label, time: formatRange(h[start]) });
      start = d;
    }
  }
  return rows;
}

/** Current day/time in Dubai (UTC+4, no daylight saving). */
export function dubaiNow(date = new Date()) {
  const d = new Date(date.getTime() + 4 * 3600_000);
  return { day: d.getUTCDay(), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() };
}
const mins = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

export function openStatus(h: Hours, date = new Date()) {
  const { day, minutes } = dubaiNow(date);
  const today = h[day];
  if (today && minutes >= mins(today[0]) && minutes < mins(today[1])) return { open: true, text: `Open · closes ${fmt(today[1]).toLowerCase()}` };
  if (today && minutes < mins(today[0])) return { open: false, text: `Closed · opens ${fmt(today[0])}` };
  for (let i = 1; i <= 7; i++) {
    const next = h[(day + i) % 7];
    if (next) return { open: false, text: `Closed · opens ${i === 1 ? "tomorrow" : DAYS[(day + i) % 7]} ${fmt(next[0])}` };
  }
  return { open: false, text: "Closed" };
}

export const directionsUrl = (s: Store) => `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`;
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
