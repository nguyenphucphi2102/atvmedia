/* ============================================================
   home.js — Toàn bộ hiệu ứng JS cho Banner + Các section trang chủ
   Đã bọc trong IIFE để tránh xung đột biến (let/const trùng tên)
   khi có nhiều file <script> khác trên cùng 1 trang.
   ============================================================ */
(function () {
  "use strict";

  /* 1) Hiệu ứng gõ chữ (typewriter) trong tiêu đề Banner */
  const words = [
    "Thành lập công ty",
    "Chữ ký số & Hoá đơn ĐT",
    "Thiết kế Website",
    "Bán lẻ & TMĐT",
    "Vận tải - Kho bãi",
  ];
  const rotateEl = document.getElementById("rotateText");
  let wIndex = 0,
    chIndex = 0,
    deleting = false;

  function typeLoop() {
    if (!rotateEl) return; // an toàn nếu trang không có banner
    const current = words[wIndex];
    if (!deleting) {
      chIndex++;
      rotateEl.textContent = current.slice(0, chIndex);
      if (chIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      chIndex--;
      rotateEl.textContent = current.slice(0, chIndex);
      if (chIndex === 0) {
        deleting = false;
        wIndex = (wIndex + 1) % words.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 70);
  }
  if (rotateEl) typeLoop();

  /* 2) Particle bay lên ngẫu nhiên trong hero */
  const particlesWrap = document.getElementById("particles");
  if (particlesWrap) {
    const PARTICLE_COUNT = 26;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement("span");
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = 6 + Math.random() * 8;
      const bottom = Math.random() * 40;
      p.style.left = left + "%";
      p.style.bottom = bottom + "%";
      p.style.animationDelay = delay + "s";
      p.style.animationDuration = duration + "s";
      particlesWrap.appendChild(p);
    }
  }

  /* 3) Đếm số chạy (count-up) khi banner xuất hiện trong khung nhìn */
  const counters = document.querySelectorAll(".hero-stats b[data-count]");
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else
        el.textContent =
          target +
          (target >= 24 && target < 100 ? "" : target >= 1000 ? "+" : "");
    }
    requestAnimationFrame(tick);
  };
  const heroStatsEl = document.querySelector(".hero-stats");
  if (heroStatsEl && counters.length) {
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach(animateCount);
            countIO.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    countIO.observe(heroStatsEl);
  }

  /* 4) Scroll-reveal cho các section còn lại của trang chủ */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach((el) => revealIO.observe(el));
  }
})();
