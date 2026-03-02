/* ============================================================
   ABOUT PAGE — about.js
   ============================================================ */
(function () {
  'use strict';

  function initTeamCards() {
    document.querySelectorAll('.team-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const img = card.querySelector('.team-img');
        if (img) img.style.transform = 'scale(1.04)';
        img.style.transition = 'transform 0.5s ease';
      });
      card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.team-img');
        if (img) img.style.transform = '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initTeamCards);
})();
