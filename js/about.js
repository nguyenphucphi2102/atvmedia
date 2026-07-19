(function(){
  "use strict";

  // Header đổ bóng khi cuộn
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  });

  // Back to top
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealIO.observe(el));
  }

  // Count-up cho số liệu ấn tượng
  const counters = document.querySelectorAll('.stat-box b[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + (target >= 1000 ? '+' : (target < 60 ? '+' : ''));
    }
    requestAnimationFrame(tick);
  };
  const statsSection = document.querySelector('.sec-stats');
  if (statsSection && counters.length) {
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(animateCount);
          statIO.disconnect();
        }
      });
    }, { threshold: 0.4 });
    statIO.observe(statsSection);
  }
})();