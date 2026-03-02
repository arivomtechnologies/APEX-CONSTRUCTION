/* ============================================================
   SERVICES PAGE — services.js
   ============================================================ */
(function () {
  'use strict';

  /* Highlight nav item on scroll to service section */
  function initSectionHighlight() {
    const sections = document.querySelectorAll('.svc-item[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.title = `${entry.target.querySelector('h2').textContent} — Apex Construction`;
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
  }

  document.addEventListener('DOMContentLoaded', initSectionHighlight);
})();
