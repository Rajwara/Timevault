/**
 * Site-wide settings. Change the brand name here and it updates everywhere.
 * Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://yourdomain.com) for correct
 * social-share and sitemap URLs. On Vercel it falls back to the deployment URL.
 */
export const site = {
  name: "VANTA",
  title: "VANTA — Precision Wristwatches",
  description:
    "Discover iconic watches that blend precision engineering with bold, contemporary design. Every VANTA watch is built to last a lifetime.",
  domainLabel: "www.vanta.com",
  address: ["Your street address", "City, Country"],
  /**
   * Optional image for the page loader, e.g. "/loader.gif" (put the file in /public).
   * Leave empty to use the built-in animated VANTA mark.
   */
  loaderImage: "",
  social: {
    instagram: "#",
    x: "#",
    tiktok: "#",
  },
};

export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
