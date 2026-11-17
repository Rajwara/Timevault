import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site, siteUrl } from "@/lib/site";
import { loaderHtml } from "@/lib/loader";
import "./globals.css";

const archivo = localFont({
  src: "./fonts/archivo-var.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const inter = localFont({
  src: "./fonts/inter-var.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: site.title, template: `%s — ${site.displayName}` },
  description: site.description,
  applicationName: site.displayName,
  keywords: ["watches", "wristwatches", "chronograph", "luxury watches", "Swiss watches", site.displayName, "TimeVault"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.displayName,
    title: site.title,
    description: site.description,
    images: [{ url: "/assets/feature-watch.webp", width: 721, height: 1400, alt: `${site.displayName} wristwatch` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/assets/feature-watch.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JavaScript runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {/* Storefront loader (verbatim snippet). display:contents keeps this wrapper out of the layout. */}
        <div style={{ display: "contents" }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: loaderHtml }} />
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
