import { faqs } from "./collection";

export type MenuLink = { label: string; href: string; note?: string };
export type MenuColumn = { title: string; links: MenuLink[] };

const helpLabels = ["Delivery & Shipping", "Warranty & Service", "Returns & Exchanges", "Strap Sizing Guide"];

export const megaColumns: MenuColumn[] = [
  {
    title: "Shop by Style",
    links: [
      { label: "All Watches", href: "/shop" },
      { label: "Classic Watches", href: "/shop?cat=classic" },
      { label: "Sport Watches", href: "/shop?cat=sport" },
      { label: "Modern Watches", href: "/shop?cat=modern" },
      { label: "New Arrivals", href: "/shop?tag=new&sort=newest", note: "New" },
      { label: "On Sale", href: "/shop?tag=sale" },
    ],
  },
  {
    title: "Shop by Line",
    links: [
      { label: "Pilot Series", href: "/shop?line=pilot" },
      { label: "Aurum Collection", href: "/shop?line=aurum" },
      { label: "Racer Line", href: "/shop?line=racer" },
      { label: "Naut Signature", href: "/shop?line=naut" },
      { label: "Leather Straps", href: "/shop?strap=leather" },
      { label: "Metal Bracelets", href: "/shop?strap=metal" },
    ],
  },
  {
    title: "Help & Services",
    links: [
      ...faqs.map((_, i) => ({ label: helpLabels[i] ?? faqs[i].q, href: `/collection?faq=${i}#faq` })),
      { label: "Our Story", href: "/collection#about" },
    ],
  },
];

/** Watches shown as image cards on the right of the mega menu. */
export const megaFeatured = [
  { id: "aurum", tag: "Bestseller", href: "/shop?line=aurum" },
  { id: "naut", tag: "Signature", href: "/shop?line=naut" },
];
