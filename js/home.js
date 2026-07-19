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
  const current = words[wIndex];
  if (!deleting) {
    chIndex++;
    rotateEl.textContent = current.slice(0, chIndex);
    if (chIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400); // dừng lại khi gõ xong
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
typeLoop();

// 2) Particle bay lên ngẫu nhiên trong hero
const particlesWrap = document.getElementById("particles");
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

// 3) Đếm số chạy (count-up) khi banner xuất hiện trong khung nhìn
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
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach(animateCount);
        io.disconnect();
      }
    });
  },
  { threshold: 0.4 },
);
io.observe(document.querySelector(".hero-stats"));
