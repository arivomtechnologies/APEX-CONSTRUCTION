/* ============================================================
   WHY US PAGE — whyus.js
   ============================================================ */
(function () {
  'use strict';

  /* Animated progress bars for stats on scroll */
  function initProgressBars() {
    const items = document.querySelectorAll('.why-stat');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.3 });
    items.forEach(item => observer.observe(item));
  }

  /* Reason items hover accent line */
  function initReasonHover() {
    document.querySelectorAll('.reason-item').forEach(item => {
      item.style.position = 'relative';
      item.addEventListener('mouseenter', () => {
        item.style.borderLeftColor = 'var(--gold)';
      });
      item.addEventListener('mouseleave', () => {
        item.style.borderLeftColor = '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initProgressBars();
    initReasonHover();
  });
})();
