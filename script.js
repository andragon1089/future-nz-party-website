/* ==============================================================
   MODEL NZ POLITICAL PARTY WEBSITE — SHARED BEHAVIOUR
   ==============================================================
   Loaded by every page. Three small, independent jobs:
   1. Toggle the mobile navigation menu.
   2. Highlight the current page's link in the navigation bar.
   3. Fade/slide content smoothly into view as the visitor scrolls.
   No external libraries, no data is stored or sent anywhere.
   ============================================================== */

(function () {
  "use strict";

  /* ---------- 1. Mobile navigation toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("primary-nav");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2. Highlight the current page in the nav ---------- */
  if (links) {
    var here = window.location.pathname.split("/").pop();
    if (here === "") { here = "index.html"; }
    links.querySelectorAll("a").forEach(function (link) {
      var target = link.getAttribute("href");
      if (target === here) {
        link.classList.add("current");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- 3. Scroll-reveal for images, cards and blocks ---------- */
  var items = document.querySelectorAll(".reveal");
  if (items.length) {
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      items.forEach(function (el) { observer.observe(el); });
    }
  }
})();
