/**
 * Site-wide settings. Change the brand name here and it updates everywhere.
 * Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://yourdomain.com) for correct
 * social-share and sitemap URLs. On Vercel it falls back to the deployment URL.
 */
export const site = {
  /** Wordmark (logos, big background words) */
  name: "TIME VAULT",
  /** Name used in sentences */
  displayName: "Time Vault",
  title: "Time Vault — Precision Wristwatches",
  description:
    "Discover iconic watches that blend precision engineering with bold, contemporary design. Every Time Vault watch is built to last a lifetime.",
  domainLabel: "www.timevault.com",
  /** Customer-service email used across the site (orders, help, privacy requests). */
  email: "hello@example.com",
  address: ["Your street address", "City, Country"],
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
