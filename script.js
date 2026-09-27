// Guarded — this file is now shared by index.html and dashboard-preview.html
// (both load it so the score-card count-up works in either place), and the
// preview file has no navbar/burger/accordion to attach to.

// Navbar scroll state
const navbar = document.getElementById('navbar');
if (navbar) {
  const heroHeight = () => document.querySelector('.hero')?.offsetHeight ?? 0;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > heroHeight() - 80);
  });
}

// Mobile burger menu
const burger = document.getElementById('burger');
const nav = document.getElementById('navbar-nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// FAQ accordion — instant toggle, no animation
document.querySelectorAll('.accordion__trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion__item');
    const isOpen = item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });
});

// Fade-in sections on scroll
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in').forEach((el) => fadeObserver.observe(el));

// Health score count-up (0 → target), triggered once per element when it
// becomes visible. querySelectorAll, not querySelector — this element now
// appears more than once per page (HeroCard1 in the hero AND the same
// component reused inside the full dashboard in Deep-dive), and each
// instance must animate independently the first time IT scrolls into view.
function initCountUp(root = document) {
  root.querySelectorAll('[data-count-to]:not([data-count-wired])').forEach((countEl) => {
    countEl.setAttribute('data-count-wired', 'true'); // guards against double-wiring on re-runs
    const target = parseInt(countEl.dataset.countTo, 10);
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const duration = 1200;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            entry.target.textContent = Math.round(progress * target);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    countObserver.observe(countEl);
  });
}
initCountUp();
// components.js dispatches this after it injects HeroCard1/dashboard markup
// into the page — that markup's [data-count-to] elements don't exist yet
// during the initCountUp() call above, so they need their own pass.
document.addEventListener('dashboard-components-mounted', () => initCountUp());
