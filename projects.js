/* ============================================================
   PROJECTS PAGE — projects.js
   ============================================================ */
(function () {
  'use strict';

  /* ── Filter ── */
  function initFilter() {
    const btns  = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.pm-card');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
            setTimeout(() => card.classList.add('visible'), 10);
          } else {
            card.classList.add('hidden');
          }
        });
        buildImageList();
        renderDots();
      });
    });
  }

  /* ── Lightbox state ── */
  let images = [];
  let currentIndex = 0;
  let overlay, lbImg, captionText, counter, dotsWrap;

  function buildImageList() {
    images = Array.from(
      document.querySelectorAll('.pm-card:not(.hidden) img')
    );
  }

  /* ── DOM creation ── */
  function createLightbox() {
    overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image preview');

    overlay.innerHTML = `
      <div class="lightbox-inner">
        <button class="lightbox-close" aria-label="Close preview">&#x2715;</button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous image">&#8592;</button>
        <img id="lb-img" src="" alt="">
        <button class="lightbox-nav lightbox-next" aria-label="Next image">&#8594;</button>
        <div class="lightbox-caption">
          <span class="lightbox-caption-text" id="lb-caption"></span>
          <span class="lightbox-counter" id="lb-counter"></span>
        </div>
        <div class="lightbox-dots" id="lb-dots"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    lbImg       = overlay.querySelector('#lb-img');
    captionText = overlay.querySelector('#lb-caption');
    counter     = overlay.querySelector('#lb-counter');
    dotsWrap    = overlay.querySelector('#lb-dots');

    overlay.querySelector('.lightbox-close')
      .addEventListener('click', closeLightbox);
    overlay.querySelector('.lightbox-prev')
      .addEventListener('click', () => navigate(-1));
    overlay.querySelector('.lightbox-next')
      .addEventListener('click', () => navigate(1));

    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', e => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  /* ── Dots ── */
  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    images.forEach((_, i) => {
      const d = document.createElement('span');
      d.className = 'lb-dot' + (i === currentIndex ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
  }

  function updateDots() {
    dotsWrap.querySelectorAll('.lb-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  /* ── Open / close ── */
  function openLightbox(index) {
    currentIndex = index;
    setImage(images[currentIndex], false);
    renderDots();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbImg.focus();
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function setImage(imgEl, fade) {
    const show = () => {
      lbImg.src = imgEl.src;
      lbImg.alt = imgEl.alt;
      
      counter.textContent     = `${currentIndex + 1} / ${images.length}`;
      lbImg.classList.remove('fading');
      updateDots();
    };
    if (fade) {
      lbImg.classList.add('fading');
      setTimeout(show, 180);
    } else {
      show();
    }
  }

  /* ── Navigation ── */
  function navigate(dir) {
    goTo((currentIndex + dir + images.length) % images.length);
  }

  function goTo(index) {
    currentIndex = index;
    setImage(images[currentIndex], true);
  }

  /* ── Attach card click handlers ── */
  function initCardClicks() {
    document.querySelectorAll('.pm-card').forEach(card => {
      card.addEventListener('click', () => {
        buildImageList();
        const img   = card.querySelector('img');
        const index = images.indexOf(img);
        if (index !== -1) openLightbox(index);
      });
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    initFilter();
    buildImageList();
    createLightbox();
    initCardClicks();
  });

})();  // ← only one closing wrapper