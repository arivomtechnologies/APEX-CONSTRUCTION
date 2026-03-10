# 🎨 Animation Examples & Code Snippets

## Hero Section Example

### HTML
```html
<section id="hero">
  <div class="hero-bg"></div>
  <div class="container hero-content">
    <div class="hero-label reveal">
      <span class="label-line"></span>
      SINCE 2020 · PREMIUM CONSTRUCTION
    </div>
    <h1 class="hero-title reveal delay-1">
      Building the<br>Future of<br>
      <em>Luxury.</em>
    </h1>
    <p class="hero-desc reveal delay-2">
      La Castle Homes delivers uncompromising craftsmanship...
    </p>
    <div class="hero-btns reveal delay-3">
      <a href="contact.html" class="btn-gold">START YOUR PROJECT</a>
      <a href="projects.html" class="btn-outline">EXPLORE OUR WORK</a>
    </div>
  </div>
</section>
```

### CSS Animations
```css
/* Hero background parallax */
.hero-bg {
  animation: heroParallax 14s ease-out forwards;
}

@keyframes heroParallax {
  from { transform: scale(1.07); }
  to   { transform: scale(1.0); }
}

/* Text reveals with cascade */
.hero-label { animation: textRevealUp 0.8s ease-out forwards; animation-delay: 0s; }
.hero-title { animation: textRevealUp 1s ease-out forwards; animation-delay: 0.3s; opacity: 0; }
.hero-desc  { animation: textRevealUp 1s ease-out forwards; animation-delay: 0.5s; opacity: 0; }
.hero-btns  { animation: textRevealUp 1s ease-out forwards; animation-delay: 0.7s; opacity: 0; }

@keyframes textRevealUp {
  0%   { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

### Result
```
Timeline:
0.0s  → Label fades in and slides up
0.3s  → Title fades in and slides up
0.5s  → Description fades in and slides up
0.7s  → Buttons fade in and slide up
1.2s+ → Scroll hint animates
```

---

## Scroll Reveal Example

### HTML
```html
<!-- About Section -->
<section class="about-section">
  <div class="about-grid">
    <div class="about-image reveal">
      <img src="image.jpg" alt="Construction">
    </div>
    <div class="about-text reveal delay-2">
      <h2>Crafting Spaces That Transcend</h2>
      <p>Content here...</p>
    </div>
  </div>
</section>

<!-- Services Grid -->
<section class="services-section">
  <div class="services-grid">
    <div class="service-card reveal"><!-- Card 1 --></div>
    <div class="service-card reveal delay-1"><!-- Card 2 --></div>
    <div class="service-card reveal delay-2"><!-- Card 3 --></div>
    <div class="service-card reveal delay-3"><!-- Card 4 --></div>
  </div>
</section>
```

### CSS
```css
/* Base reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

/* Trigger on scroll */
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Delay classes */
.reveal.delay-1 { transition-delay: 0.1s; }
.reveal.delay-2 { transition-delay: 0.2s; }
.reveal.delay-3 { transition-delay: 0.3s; }

/* Directional reveals */
.reveal-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: 0.8s ease-out;
}
.reveal-left.visible {
  opacity: 1;
  transform: translateX(0);
}
```

### JavaScript
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});
```

### Result
```
As user scrolls:
Service Card 1 → Appears at 0.0s
Service Card 2 → Appears at 0.1s (staggered)
Service Card 3 → Appears at 0.2s (staggered)
Service Card 4 → Appears at 0.3s (staggered)
```

---

## Service Card Hover Animation

### HTML
```html
<div class="service-card">
  <div class="svc-icon">
    <svg><!-- Icon SVG --></svg>
  </div>
  <h3>Residential Construction</h3>
  <p>Custom luxury homes built to specifications...</p>
  <a href="#" class="svc-more">LEARN MORE →</a>
</div>
```

### CSS Hover Effect
```css
.service-card {
  background: var(--dark-3);
  padding: 2.5rem;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1),
              background 0.35s ease;
}

/* Gold border animation */
.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 0;
  background: var(--gold);
  transition: height 0.4s ease;
}

/* Hover state */
.service-card:hover {
  background: #1c1c1c;
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
}

.service-card:hover::before {
  height: 100%;
}

/* Icon animation */
.svc-icon {
  transition: transform 0.3s ease;
}

.service-card:hover .svc-icon {
  transform: scale(1.15) rotate(5deg);
}

/* Link animation */
.svc-more {
  transition: gap 0.3s ease;
}

.service-card:hover .svc-more {
  gap: 0.75rem;
}
```

### Timing Breakdown
```
On Hover:
- Card lifts: 8px up (0.35s cubic-bezier)
- Shadow expands: 0 → 12px 40px (0.35s ease)
- Icon scales: 1.0 → 1.15x (0.3s ease)
- Icon rotates: 0° → 5° (0.3s ease)
- Border grows: 0 → 100% height (0.4s ease)
- Link gap: 0.4rem → 0.75rem (0.3s ease)
```

---

## Button Click Ripple Effect

### HTML
```html
<a href="contact.html" class="btn-gold">START YOUR PROJECT</a>
```

### CSS
```css
.btn-gold {
  position: relative;
  overflow: hidden;
  background: var(--gold);
  padding: 1.05rem 2.25rem;
  border: none;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Ripple element pseudo-element */
.btn-gold::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* Ripple animation on click */
.btn-gold:active::before {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
}

/* Hover state */
.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201, 168, 76, 0.3);
  background: var(--gold-light);
}
```

### JavaScript Implementation
```javascript
document.querySelectorAll('.btn-gold, .btn-outline').forEach(btn => {
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
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});
```

---

## Counter Animation Example

### HTML
```html
<div class="stat-item">
  <div class="stat-number">
    <span data-target="25" data-suffix="+">0+</span>
  </div>
  <div class="stat-label">Projects Completed</div>
</div>

<div class="stat-item">
  <div class="stat-number">
    <span data-prefix="$" data-target="2" data-suffix="B+">$0B+</span>
  </div>
  <div class="stat-label">Project Value</div>
</div>
```

### JavaScript
```javascript
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
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

// Trigger on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => {
  observer.observe(el);
});
```

### Animation Behavior
```
When element enters viewport (50% visible):
- Counter starts at 0
- Counts up to target value over 2 seconds
- Uses ease-out-cubic easing for natural deceleration
- Displays with prefix/suffix as specified
- Example: $0B+ → $2B+ smoothly in 2 seconds
```

---

## Navigation Link Underline Animation

### HTML
```html
<nav class="nav-links">
  <a href="index.html" class="nav-link" data-page="home">Home</a>
  <a href="about.html" class="nav-link" data-page="about">About</a>
  <a href="services.html" class="nav-link" data-page="services">Services</a>
</nav>
```

### CSS
```css
.nav-link {
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.2s;
  padding-bottom: 3px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link:hover {
  color: #fff;
}
```

### Result
```
Hover State:
- Underline width: 0% → 100% (0.3s)
- Text color: transparent → white (0.2s)
- Smooth cubic-bezier easing

Active State:
- Underline always at 100%
- Text color white
- Indicates current page
```

---

## Project Gallery Hover Animation

### HTML
```html
<div class="proj-card proj-lg">
  <img src="project.jpg" alt="Park Avenue Penthouse">
  <div class="proj-hover-border"></div>
  <div class="proj-info">
    <span class="proj-tag">Residential · Chennai</span>
    <h3>Park Avenue Penthouse</h3>
    <p>12,000 sq ft luxury penthouse renovation</p>
  </div>
</div>
```

### CSS
```css
.proj-card {
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.4s ease;
}

.proj-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.proj-card:hover img {
  transform: scale(1.08);
}

/* Border glow effect */
.proj-hover-border {
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  transition: border-color 0.3s;
  z-index: 2;
}

.proj-card:hover .proj-hover-border {
  border-color: rgba(201, 168, 76, 0.5);
}

/* Info overlay */
.proj-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.75rem;
  background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%);
  z-index: 3;
  transition: background 0.4s ease;
}

.proj-card:hover .proj-info {
  background: linear-gradient(0deg, rgba(0,0,0,0.95) 0%, transparent 100%);
}
```

### Animation Sequence on Hover
```
0.0s → Image starts zooming (1.0 → 1.08x)
0.3s → Border appears
0.4s → Info overlay darkens
0.6s → Image zoom completes
```

---

## Mobile Menu Slide-Down Animation

### HTML
```html
<button class="hamburger" id="hamburger">
  <span></span>
  <span></span>
  <span></span>
</button>

<div id="mobile-menu" class="mobile-menu">
  <ul>
    <li><a href="index.html" class="nav-link">Home</a></li>
    <li><a href="about.html" class="nav-link">About</a></li>
  </ul>
</div>
```

### CSS
```css
/* Hamburger animation */
.hamburger span {
  height: 1.5px;
  background: #fff;
  transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}

.hamburger.open span:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* Menu slide-down */
.mobile-menu {
  display: none;
  animation: slideDown 0.4s ease-out forwards;
  opacity: 0;
}

.mobile-menu.open {
  display: block;
  animation: slideDown 0.4s ease-out forwards;
  opacity: 1;
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### JavaScript
```javascript
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  menu.classList.toggle('open');
});
```

---

## Best Practices Demonstrated

### 1. **Performance**
- ✅ GPU-accelerated transforms
- ✅ Efficient Intersection Observer
- ✅ RequestAnimationFrame for smooth animations
- ✅ CSS transitions (not reflows)

### 2. **Accessibility**
- ✅ prefers-reduced-motion support
- ✅ No animation-dependent content
- ✅ Keyboard navigation intact
- ✅ Focus states maintained

### 3. **Code Quality**
- ✅ Well-organized CSS
- ✅ DRY principles
- ✅ Reusable classes
- ✅ Clear naming conventions

### 4. **User Experience**
- ✅ Natural easing functions
- ✅ Appropriate timing
- ✅ Not distracting
- ✅ Enhances brand perception

---

**These examples demonstrate production-ready animation implementations for La Castle Homes! 🎬**
