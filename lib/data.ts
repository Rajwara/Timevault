export type Product = {
  id: string;
  name: string;
  word: string;
  desc: string;
  price: string;
  discount: string;
  image: string;
  up?: boolean;
};

export const products: Product[] = [
  { id: "pilot", name: "Pilot Chronograph", word: "Pilot", desc: "Black dial, three sub-dials and riveted leather strap, made for the skies.", price: "$437", discount: "25%", image: "/assets/product-1.webp", up: true },
  { id: "aurum", name: "Aurum Blue", word: "Aurum", desc: "Rose-gold case and bracelet with a deep sunburst blue dial.", price: "$11,450", discount: "10%", image: "/assets/product-2.webp" },
  { id: "racer", name: "Racer Chrono", word: "Racer", desc: "Silver dial with red chrono hands and a perforated racing strap.", price: "$9,000", discount: "15%", image: "/assets/product-3.webp", up: true },
  { id: "naut", name: "Vault Naut", word: "Vault", desc: "Our signature model — bold, precise and crafted for collectors.", price: "$745", discount: "20%", image: "/assets/product-4.webp" },
];

export type Category = "classic" | "modern" | "sport";

export type Arrival = {
  id: string;
  name: string;
  word: string;
  desc: string;
  price: string;
  image: string;
  cat: Category;
};

export const arrivals: Arrival[] = [
  { id: "heritage", name: "Heritage Dress", word: "Heritage", desc: "Cream dial with gold indices and brown leather strap.", price: "$2,450", image: "/assets/arrival-1.webp", cat: "classic" },
  { id: "pilot-night", name: "Pilot Night Chrono", word: "Pilot", desc: "Matte black dial and stitched leather, legible in any light.", price: "$3,200", image: "/assets/arrival-2.webp", cat: "sport" },
  { id: "racer-tachy", name: "Racer Tachymeter", word: "Racer", desc: "Silver tachymeter dial with red details, inspired by motorsport.", price: "$8,750", image: "/assets/arrival-3.webp", cat: "sport" },
  { id: "aurum-sunburst", name: "Aurum Sunburst", word: "Aurum", desc: "Rose-gold case and bracelet around a sunburst blue dial.", price: "$6,800", image: "/assets/arrival-4.webp", cat: "classic" },
  { id: "orbit", name: "Orbit Skeleton", word: "Orbit", desc: "Open-worked blue dial showing the movement inside.", price: "$12,900", image: "/assets/arrival-5.webp", cat: "modern" },
  { id: "naut-black", name: "Vault Naut Black", word: "Vault", desc: "The signature Naut in brushed steel with an all-black dial.", price: "$790", image: "/assets/arrival-6.webp", cat: "modern" },
];

export const filters: { label: string; value: Category | "all" }[] = [
  { label: "New Watches", value: "all" },
  { label: "Classic", value: "classic" },
  { label: "Modern", value: "modern" },
  { label: "Sport", value: "sport" },
];

export const featuresLeft = [
  { icon: "◈", title: "Quality Materials", text: "Made from high quality materials" },
  { icon: "◎", title: "Modern Design", text: "Known for its minimalist and elegant design" },
  { icon: "◷", title: "Accuracy", text: "Swiss-made movement, seconds-perfect" },
];

export const featuresRight = [
  { icon: "◐", title: "Convenient to Use", text: "Very light and does not feel heavy on the wrist" },
  { icon: "⬡", title: "Safe to Use", text: "Hypoallergenic, safe for every skin type" },
  { icon: "✳", title: "Vault Naut", text: "A bold, precision-crafted signature piece" },
];

export const navLinks = [
  { href: "#top", label: "Home", id: "top" },
  { href: "#products", label: "Products", id: "products" },
  { href: "#arrivals", label: "Watches", id: "arrivals" },
  { href: "#stories", label: "Stories", id: "stories" },
  { href: "#features", label: "Brand", id: "features" },
];
