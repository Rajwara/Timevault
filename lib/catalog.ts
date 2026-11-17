/** Full product catalogue used by the /shop page. */

export type Line = "pilot" | "aurum" | "racer" | "naut";
export type Style = "classic" | "sport" | "modern";
export type Strap = "leather" | "metal" | "rubber" | "nylon";
export type Dial = "black" | "blue" | "silver" | "cream" | "grey";
export type Tag = "sale" | "new" | "bestseller";

export type Product = {
  id: string;
  name: string;
  line: Line;
  style: Style;
  strap: Strap;
  dial: Dial;
  size: number; // case diameter, mm
  price: number;
  was?: number;
  image: string;
  w: number;
  h: number;
  tags: Tag[];
  added: number; // higher = newer
  blurb: string;
};

export const products: Product[] = [
  { id: "pilot", name: "Pilot Chronograph", line: "pilot", style: "sport", strap: "leather", dial: "black", size: 42, price: 437, was: 580, image: "/assets/product-1.webp", w: 527, h: 800, tags: ["sale", "bestseller"], added: 3, blurb: "Black dial, three sub-dials and a riveted leather strap, made for the skies." },
  { id: "aurum", name: "Aurum Blue", line: "aurum", style: "classic", strap: "metal", dial: "blue", size: 40, price: 11450, was: 12700, image: "/assets/product-2.webp", w: 496, h: 800, tags: ["sale"], added: 5, blurb: "Rose-gold case and bracelet with a deep sunburst blue dial." },
  { id: "racer", name: "Racer Chrono", line: "racer", style: "sport", strap: "leather", dial: "silver", size: 43, price: 9000, image: "/assets/product-3.webp", w: 489, h: 800, tags: ["bestseller"], added: 4, blurb: "Silver dial with red chrono hands and a perforated racing strap." },
  { id: "naut", name: "Vanta Naut", line: "naut", style: "modern", strap: "rubber", dial: "black", size: 41, price: 745, was: 930, image: "/assets/product-4.webp", w: 613, h: 800, tags: ["sale", "bestseller"], added: 6, blurb: "Our signature model — bold, precise and crafted for collectors." },
  { id: "field", name: "Field Automatic", line: "pilot", style: "classic", strap: "nylon", dial: "grey", size: 39, price: 1290, image: "/assets/feature-watch.webp", w: 721, h: 1400, tags: [], added: 2, blurb: "A clean field watch on a NATO strap, built for everyday wear." },
  { id: "diver", name: "Deep Diver 300", line: "naut", style: "sport", strap: "rubber", dial: "black", size: 44, price: 2150, was: 2400, image: "/assets/hero-watch.webp", w: 843, h: 1100, tags: ["sale"], added: 7, blurb: "300m water resistance, a screw-down crown and luminous indices." },
  { id: "heritage", name: "Heritage Dress", line: "aurum", style: "classic", strap: "leather", dial: "cream", size: 38, price: 2450, image: "/assets/arrival-1.webp", w: 900, h: 900, tags: ["new"], added: 12, blurb: "Cream dial with gold indices on a brown alligator-grain strap." },
  { id: "pilot-night", name: "Pilot Night Chrono", line: "pilot", style: "sport", strap: "leather", dial: "black", size: 42, price: 3200, image: "/assets/arrival-2.webp", w: 900, h: 900, tags: ["new"], added: 11, blurb: "Matte black dial and stitched leather, legible in any light." },
  { id: "racer-tachy", name: "Racer Tachymeter", line: "racer", style: "sport", strap: "leather", dial: "silver", size: 42, price: 8750, was: 9400, image: "/assets/arrival-3.webp", w: 900, h: 900, tags: ["new", "sale"], added: 10, blurb: "Silver tachymeter dial with red details, inspired by motorsport." },
  { id: "aurum-sunburst", name: "Aurum Sunburst", line: "aurum", style: "classic", strap: "metal", dial: "blue", size: 40, price: 6800, image: "/assets/arrival-4.webp", w: 900, h: 900, tags: ["new"], added: 9, blurb: "Rose-gold case and bracelet around a sunburst blue dial." },
  { id: "orbit", name: "Orbit Skeleton", line: "racer", style: "modern", strap: "leather", dial: "blue", size: 41, price: 12900, image: "/assets/arrival-5.webp", w: 900, h: 900, tags: ["new"], added: 8, blurb: "Open-worked blue dial showing the movement inside." },
  { id: "naut-black", name: "Vanta Naut Black", line: "naut", style: "modern", strap: "rubber", dial: "black", size: 41, price: 790, image: "/assets/arrival-6.webp", w: 900, h: 900, tags: ["new"], added: 13, blurb: "The signature Naut in brushed steel with an all-black dial." },
];

export const lineOptions: { value: Line; label: string }[] = [
  { value: "pilot", label: "Pilot Series" },
  { value: "aurum", label: "Aurum Collection" },
  { value: "racer", label: "Racer Line" },
  { value: "naut", label: "Naut Signature" },
];
export const styleOptions: { value: Style; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "sport", label: "Sport" },
  { value: "modern", label: "Modern" },
];
export const strapOptions: { value: Strap; label: string }[] = [
  { value: "leather", label: "Leather" },
  { value: "metal", label: "Metal bracelet" },
  { value: "rubber", label: "Rubber" },
  { value: "nylon", label: "Nylon (NATO)" },
];
export const dialOptions: { value: Dial; label: string; color: string }[] = [
  { value: "black", label: "Black", color: "#141414" },
  { value: "blue", label: "Blue", color: "#1f4fa8" },
  { value: "silver", label: "Silver", color: "#c9cdd2" },
  { value: "grey", label: "Grey", color: "#6f7378" },
  { value: "cream", label: "Cream", color: "#efe6cf" },
];
export const priceOptions = [
  { value: "u1000", label: "Under $1,000", min: 0, max: 999 },
  { value: "1-5k", label: "$1,000 – $5,000", min: 1000, max: 5000 },
  { value: "5-10k", label: "$5,000 – $10,000", min: 5001, max: 10000 },
  { value: "o10k", label: "Over $10,000", min: 10001, max: Infinity },
] as const;
export const sizeOptions = [
  { value: "s", label: "38 – 40 mm", min: 0, max: 40 },
  { value: "m", label: "41 – 42 mm", min: 41, max: 42 },
  { value: "l", label: "43 mm +", min: 43, max: Infinity },
] as const;
export const tagOptions: { value: Tag; label: string }[] = [
  { value: "sale", label: "On sale" },
  { value: "new", label: "New arrival" },
  { value: "bestseller", label: "Bestseller" },
];

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "name-asc", label: "Alphabetically, A–Z" },
  { value: "name-desc", label: "Alphabetically, Z–A" },
] as const;
export type Sort = (typeof sortOptions)[number]["value"];

export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const discount = (p: Product) => (p.was ? Math.round((1 - p.price / p.was) * 100) : 0);
