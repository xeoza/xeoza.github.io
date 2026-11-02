/* Celikkol & Zykin Advisory — progressive enhancement only.
   Works without JS: content, navigation and language links are plain HTML. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function showAll() {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  }

  if (reduce || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav a[href^="#"]')
  );
  var bySection = {};
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    var section = document.getElementById(id);
    if (section) bySection[id] = link;
  });

  if ("IntersectionObserver" in window && navLinks.length) {
    var clearCurrent = function () {
      navLinks.forEach(function (link) { link.removeAttribute("aria-current"); });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = bySection[entry.target.id];
        if (!link) return;
        clearCurrent();
        link.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(bySection).forEach(function (id) {
      spy.observe(document.getElementById(id));
    });
  }
})();
