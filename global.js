/* ============================================================
   APEX CONSTRUCTION — GLOBAL JS
   Handles: fragment loading, header scroll, mobile menu,
            active nav, scroll reveal
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Load HTML Fragments ── */
  async function loadFragment(url, placeholderId) {
    const el = document.getElementById(placeholderId);
    if (!el) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed: ${url}`);
      const html = await res.text();
      el.innerHTML = html;
      el.replaceWith(...el.childNodes); // unwrap placeholder
    } catch (err) {
      console.warn('Fragment load error:', err);
    }
  }

  async function initFragments() {
    await Promise.all([
      loadFragment('header.html', 'header-placeholder'),
      loadFragment('footer.html', 'footer-placeholder'),
    ]);
    // After loading, init header behaviors
    initHeader();
    initActiveNav();
  }

  /* ── 2. Header Scroll Effect ── */
  function initHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const update = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();

    // Mobile hamburger
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        menu.classList.toggle('open');
      });
    }
  }

  /* ── 3. Active Nav Link ── */
  function initActiveNav() {
    const page = document.body.dataset.page || '';
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
      if (link.dataset.page === page) link.classList.add('active');
    });
  }

  /* ── 4. Scroll Reveal ── */
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ── 5. Counter Animation ── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = prefix + (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', () => {
    initFragments();
    initReveal();
    initCounters();
  });

})();
