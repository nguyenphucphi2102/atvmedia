(function () {
  "use strict";

  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  const counters = document.querySelectorAll(".metric b[data-count]");
  const heroPanel = document.querySelector(".hero-panel");

  function animateCount(el) {
    const target = Number(el.getAttribute("data-count")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
        return;
      }

      el.textContent = String(target) + suffix;
    }

    requestAnimationFrame(tick);
  }

  if (heroPanel && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach((counter) => animateCount(counter));
            counterObserver.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    counterObserver.observe(heroPanel);
  }
})();
