/**
 * Storefront loader — copied verbatim from storefront-loader.html (style, div and script).
 * It is injected as raw HTML right after <body> so it runs before the page renders.
 */
export const loaderHtml = `<style>
  #storefront-loader {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: #fff url("https://rolex-1.myshopify.com/cdn/shop/files/Rolex-Gif.gif?v=1676452895&width=1920") no-repeat center;
    transition: opacity 400ms ease;
  }
  #storefront-loader.leaving { opacity: 0; pointer-events: none; }
  html:has(#storefront-loader:not([hidden])) { overflow: hidden; }
</style>
<div id="storefront-loader" role="status" aria-label="Loading" hidden></div>
<script>
  (() => {
    const loader = document.getElementById('storefront-loader');
    const fadeMs = 400;
    const demoMs = document.title === 'Storefront loader demo' ? 1800 : 0;
    const started = performance.now();
    loader.hidden = false;

    function dismiss() {
      loader.classList.add('leaving');
      setTimeout(() => loader.remove(), fadeMs);
    }

    const fallback = setTimeout(dismiss, 8000);
    function onLoad() {
      clearTimeout(fallback);
      setTimeout(dismiss, Math.max(0, demoMs - (performance.now() - started)));
    }

    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
  })();
</script>`;
