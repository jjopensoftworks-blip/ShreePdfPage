/*
 * no-inspect.js — LIGHT deterrent only.
 *
 * This is NOT security. Anything the browser renders is downloadable, and this is trivially
 * bypassed (view-source, curl/wget, disabling JavaScript, browser menus, mobile). It only raises
 * the bar for casual right-click / F12. Real anti-scraping & bot protection belongs at the edge:
 * enable Cloudflare **Bot Fight Mode** + a rate-limiting/WAF rule on this Pages site.
 *
 * It deliberately does NOT do devtools-open detection or blank/redirect the page — that behavior
 * is user-hostile, breaks accessibility, and still doesn't stop a determined scraper.
 */
(function () {
  "use strict";

  // Suppress the right-click context menu.
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Suppress the common devtools / view-source keyboard shortcuts.
  document.addEventListener("keydown", function (e) {
    var key = (e.key || "").toLowerCase();
    var ctrl = e.ctrlKey || e.metaKey;
    var isDevtools = key === "f12" || (ctrl && e.shiftKey && (key === "i" || key === "j" || key === "c"));
    var isViewSource = ctrl && key === "u";
    if (isDevtools || isViewSource) {
      e.preventDefault();
    }
  });
})();
