// ============================================
// NAV: background on scroll + active link tracking
// ============================================
const nav = document.getElementById('site-nav');
const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.getElementById('navToggle');
const navLinksWrap = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section, header.hero');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksWrap.classList.toggle('open');
});
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksWrap.classList.remove('open');
  });
});

// highlight active section link
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(sec => { if (sec.id) sectionObserver.observe(sec); });

// ============================================
// SCROLL REVEAL
// ============================================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================
// PROJECT GALLERIES — Swiper "cards" effect
// One stacked, swipeable deck of images per project row.
// ============================================
if (typeof Swiper !== 'undefined') {
  document.querySelectorAll('.project-visual').forEach((visual) => {
    const el = visual.querySelector('.project-swiper');
    const fractionEl = visual.querySelector('.swiper-fraction');
    const prevEl = visual.querySelector('.swiper-nav.prev');
    const nextEl = visual.querySelector('.swiper-nav.next');
    if (!el) return;

    const total = el.querySelectorAll('.swiper-slide').length;

    const swiper = new Swiper(el, {
      effect: 'cards',
      grabCursor: true,
      loop: true,
      cardsEffect: {
        perSlideOffset: 9,
        perSlideRotate: 4,
        slideShadows: false,
      },
      navigation: {
        prevEl,
        nextEl,
      },
      autoplay: {
        delay: 3200,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      on: {
        slideChange(sw) {
          if (!fractionEl) return;
          const idx = (sw.realIndex + 1).toString().padStart(2, '0');
          const count = total.toString().padStart(2, '0');
          fractionEl.innerHTML = `<span class="cur">${idx}</span> / ${count}`;
        },
      },
    });

    // set initial fraction label
    if (fractionEl) {
      fractionEl.innerHTML = `<span class="cur">01</span> / ${total.toString().padStart(2, '0')}`;
    }
  });
}
