"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const FADE_MS = 400;     // fade-out length
const MIN_MS = 600;      // keep it up long enough not to flash
const FALLBACK_MS = 8000; // never block the page longer than this

/**
 * Full-screen loader shown on the first page load, until the window `load` event.
 * It is server-rendered (so it covers the page instantly) and only appears once per full
 * page load — moving between pages inside the site doesn't show it again.
 */
export default function SiteLoader() {
  const [phase, setPhase] = useState<"show" | "leaving" | "gone">("show");

  useEffect(() => {
    const started = performance.now();
    let fadeTimer: ReturnType<typeof setTimeout>;
    let waitTimer: ReturnType<typeof setTimeout>;

    const dismiss = () => {
      setPhase("leaving");
      fadeTimer = setTimeout(() => setPhase("gone"), FADE_MS);
    };
    const fallback = setTimeout(dismiss, FALLBACK_MS);
    const onLoad = () => {
      clearTimeout(fallback);
      waitTimer = setTimeout(dismiss, Math.max(0, MIN_MS - (performance.now() - started)));
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(fallback);
      clearTimeout(fadeTimer);
      clearTimeout(waitTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <>
      {/* Without JavaScript the loader could never be dismissed, so hide it. */}
      <noscript><style>{"#site-loader{display:none!important}html{overflow:auto!important}"}</style></noscript>
      <div
        id="site-loader"
        className={phase === "leaving" ? "leaving" : undefined}
        role="status"
        aria-label="Loading"
        style={site.loaderImage ? { backgroundImage: `url("${site.loaderImage}")` } : undefined}
      >
        {!site.loaderImage && (
          <div className="site-loader__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" className="site-loader__logo">
              <path fill="currentColor" d="M16 2l2.6 6.3L25 5.7l-2.6 6.3L29 14.6l-6.6 1.4L25 22.3l-6.4-2.6L16 30l-2.6-10.3L7 22.3l2.6-6.3L3 14.6l6.6-2.6L7 5.7l6.4 2.6z" />
              <circle cx="16" cy="16" r="3.4" fill="#ff4a17" />
            </svg>
            <span className="site-loader__word">{site.name}</span>
            <span className="site-loader__bar"><i /></span>
          </div>
        )}
      </div>
    </>
  );
}
