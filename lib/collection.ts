export type Tab = "all" | "classic" | "sport" | "modern";

export type Watch = {
  id: string;
  name: string;
  line: string;
  price: number;
  was?: number;
  image: string;
  w: number;
  h: number;
  cat: Exclude<Tab, "all">;
};

export const watches: Watch[] = [
  { id: "pilot", name: "Pilot Chronograph", line: "Leather · 42mm", price: 437, was: 580, image: "/assets/product-1.webp", w: 527, h: 800, cat: "sport" },
  { id: "aurum", name: "Aurum Blue", line: "Rose gold · 40mm", price: 11450, was: 12700, image: "/assets/product-2.webp", w: 496, h: 800, cat: "classic" },
  { id: "racer", name: "Racer Chrono", line: "Perforated strap · 43mm", price: 9000, image: "/assets/product-3.webp", w: 489, h: 800, cat: "sport" },
  { id: "naut", name: "Vanta Naut", line: "Rubber strap · 41mm", price: 745, was: 930, image: "/assets/product-4.webp", w: 613, h: 800, cat: "modern" },
  { id: "field", name: "Field Automatic", line: "NATO strap · 39mm", price: 1290, image: "/assets/feature-watch.webp", w: 721, h: 1400, cat: "classic" },
  { id: "diver", name: "Deep Diver 300", line: "Rubber strap · 44mm", price: 2150, was: 2400, image: "/assets/hero-watch.webp", w: 843, h: 1100, cat: "modern" },
];

export const tabs: { label: string; value: Tab }[] = [
  { label: "All Watches", value: "all" },
  { label: "Classic", value: "classic" },
  { label: "Sport", value: "sport" },
  { label: "Modern", value: "modern" },
];

export const brands = [
  {
    name: "Pilot Series",
    text: "Instruments for the cockpit: oversized crowns, high-contrast dials and sub-dials you can read at a glance.",
    image: "/assets/story-1.webp",
    picks: ["pilot", "field"],
  },
  {
    name: "Aurum Collection",
    text: "Precious metals and sunburst dials. Hand-polished cases made for evenings that matter.",
    image: "/assets/story-2b.webp",
    picks: ["aurum", "naut"],
  },
  {
    name: "Racer Line",
    text: "Tachymeter bezels, red chrono hands and perforated straps — built around the speed of the track.",
    image: "/assets/video-thumb.webp",
    picks: ["racer", "diver"],
  },
  {
    name: "Naut Signature",
    text: "Our signature integrated-bracelet sports watch, water resistant to 200m and finished by hand.",
    image: "/assets/story-2a.webp",
    picks: ["naut", "diver"],
  },
];

export const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders ship within one business day from our studio. Standard delivery takes 3–5 business days; express delivery arrives in 1–2 days. Every parcel is insured and requires a signature.",
  },
  {
    q: "Is every watch covered by a warranty?",
    a: "Yes. Every watch carries a 5-year international warranty covering the movement and any manufacturing defects. Servicing during that period is free.",
  },
  {
    q: "Can I return or exchange my watch?",
    a: "You can return or exchange an unworn watch within 30 days of delivery. Returns are free — we send you a prepaid, insured shipping label.",
  },
  {
    q: "How do I find the right strap size?",
    a: "Each product page lists case diameter and lug width. Our straps come with a quick-release pin, and we include a free extra strap size on request.",
  },
];

export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const byId = (id: string) => watches.find((w) => w.id === id)!;
