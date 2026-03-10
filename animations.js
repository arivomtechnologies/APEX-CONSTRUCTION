/* ============================================================
   LA CASTLE HOMES — ANIMATIONS ENGINE
   Advanced scroll reveal and interactive animations
   ============================================================ */

(function () {
  'use strict';

  /* ── Configuration ── */
  const CONFIG = {
    revealThreshold: 0.15,
    revealMargin: '0px 0px -80px 0px',
    counterThreshold: 0.5,
    scrollAnimationDelay: 50,
  };

  /* ── 1. Enhanced Scroll Reveal with Stagger ── */
  function initAdvancedReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Apply stagger effect to grouped reveals
          const parent = entry.target.parentElement;
          const siblings = Array.from(parent?.querySelectorAll('.reveal') || []);
          const siblingIndex = siblings.indexOf(entry.target);

          if (siblingIndex > 0) {
            entry.target.classList.add(`stagger-${Math.min(siblingIndex, 4)}`);
          }

          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: CONFIG.revealThreshold,
      rootMargin: CONFIG.revealMargin,
    });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  /* ── 2. Directional Reveal Animations ── */
  function initDirectionalReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: CONFIG.revealThreshold,
      rootMargin: CONFIG.revealMargin,
    });

    document.querySelectorAll('.reveal-left, .reveal-right, .reveal-zoom').forEach(el => {
      observer.observe(el);
    });
  }

  /* ── 3. Enhanced Counter Animation ── */
  function animateCounterAdvanced(el) {
    const target = parseFloat(el.dataset.target);
    if (isNaN(target)) return;

    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const start = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = target * eased;

      el.textContent = prefix +
        (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) +
        suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  function initAdvancedCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounterAdvanced(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: CONFIG.counterThreshold });

    document.querySelectorAll('[data-target]').forEach(el => {
      observer.observe(el);
    });
  }

  /* ── 4. Parallax Scroll Effect ── */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    let ticking = false;
    let lastScrollY = 0;

    const updateParallax = () => {
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const yOffset = lastScrollY * speed;
        el.style.transform = `translateY(${yOffset}px)`;
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 5. Smooth Scroll Navigation ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });

          // Update URL without reload
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  /* ── 6. Service Card Hover Animation ── */
  function initServiceCardAnimations() {
    document.querySelectorAll('.service-card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;

      card.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.svc-icon');
        if (icon) {
          icon.style.animation = 'none';
          setTimeout(() => {
            icon.style.animation = '';
          }, 10);
        }
      });
    });
  }

  /* ── 7. Project Card Interaction ── */
  function initProjectCardAnimations() {
    document.querySelectorAll('.proj-card').forEach((card, index) => {
      const img = card.querySelector('img');
      if (img) {
        card.addEventListener('mouseenter', function () {
          img.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        });
      }
    });
  }

  /* ── 8. Page Load Animation ── */
  function initPageLoadAnimation() {
    // Add fade-in to main content
    const main = document.querySelector('main');
    if (main) {
      main.style.opacity = '0';
      main.style.animation = 'fadeIn 0.6s ease-out forwards';
    }

    // Stagger header load
    const header = document.getElementById('site-header');
    if (header) {
      header.style.animation = 'slideDown 0.5s ease-out forwards';
    }
  }

  /* ── 9. Button Ripple Effect ── */
  function initRippleEffect() {
    document.querySelectorAll('.btn-gold, .btn-outline, .btn-outline-gold').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.backgroundColor = 'rgba(255,255,255,0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /* ── 10. Testimonial Card Stagger ── */
  function initTestimonialAnimations() {
    document.querySelectorAll('.testi-card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.15}s`;
    });
  }

  /* ── 11. Navigation Active State Animation ── */
  function initNavAnimations() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  /* ── 12. Scroll Progress Indicator ── */
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  /* ── 13. Intersection Observer for Animations ── */
  function createAnimationObserver(selector, animationClass, options = {}) {
    const defaultOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -60px 0px',
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    }, defaultOptions);

    document.querySelectorAll(selector).forEach(el => {
      observer.observe(el);
    });
  }

  /* ── 14. Image Lazy Load with Animation ── */
  function initLazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.style.animation = 'fadeIn 0.6s ease-out forwards';
          observer.unobserve(img);
        }
      });
    }, { threshold: 0.1 });

    images.forEach(img => imageObserver.observe(img));
  }

  /* ── 15. Form Input Animation ── */
  function initFormAnimations() {
    const inputs = document.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      input.addEventListener('focus', function () {
        this.style.boxShadow = '0 0 0 3px rgba(201, 168, 76, 0.2)';
      });

      input.addEventListener('blur', function () {
        this.style.boxShadow = 'none';
      });
    });
  }

  /* ── Initialize All ── */
  function initAll() {
    // Existing functions (from global.js should still work)
    initPageLoadAnimation();
    initAdvancedReveal();
    initDirectionalReveals();
    initAdvancedCounters();
    initParallax();
    initSmoothScroll();
    initServiceCardAnimations();
    initProjectCardAnimations();
    initRippleEffect();
    initTestimonialAnimations();
    initNavAnimations();
    initScrollProgress();
    initLazyLoadImages();
    initFormAnimations();

    // Custom animation observers
    createAnimationObserver('.about-image', 'visible', {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px',
    });

    createAnimationObserver('.about-badge', 'visible', {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px',
    });
  }

  /* ── Boot ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Reinitialize on dynamic content
  window.addEventListener('load', () => {
    initAdvancedCounters();
    initServiceCardAnimations();
    initProjectCardAnimations();
  });

})();
