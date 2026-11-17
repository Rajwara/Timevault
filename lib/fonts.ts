import { Big_Shoulders, Space_Grotesk } from "next/font/google";

/** Headings, logo, small uppercase labels, giant wordmarks. */
export const heading = Big_Shoulders({ subsets: ["latin"], axes: ["opsz"], variable: "--font-heading", display: "swap", adjustFontFallback: false });

/** Body text, nav, buttons, product names, prices. */
export const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });
