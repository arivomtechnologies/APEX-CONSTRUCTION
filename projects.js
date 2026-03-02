/* ============================================================
   PROJECTS PAGE — projects.js
   ============================================================ */
(function () {
  'use strict';

  function initFilter() {
    const btns  = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.pm-card');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active state
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
            // re-trigger reveal
            setTimeout(() => card.classList.add('visible'), 10);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initFilter);
})();
