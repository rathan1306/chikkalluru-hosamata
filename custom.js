
/* SLIDER FUNCTIONALITY */
let currentSlide = 0;
const slides = document.querySelectorAll('.events-slider .slide');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function goToSlide(n) {
  showSlide(n);
}

// Auto-advance slides
setInterval(() => {
  showSlide(currentSlide + 1);
}, 7000);

/* LANGUAGE SYSTEM */
let lang = "en";

function applyLanguage() {
  // Update font family based on language
  if (lang === "kn") {
    document.body.style.fontFamily = "'Noto Serif Kannada', serif";
  } else {
    document.body.style.fontFamily = "'Poppins', sans-serif";
  }

  // Update all text content
  document.querySelectorAll("[data-en]").forEach(el => {
    const text = el.dataset[lang];
    if (text) {
      el.textContent = text;
    }
  });
}

function toggleLang() {
  lang = lang === "en" ? "kn" : "en";
  applyLanguage();
}

/* MOBILE MENU TOGGLE */
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
}

// Close menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navMenu').classList.remove('active');
  });
});

/* SCROLL ANIMATIONS */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.scroll-animate').forEach(el => {
  observer.observe(el);
});

/* SMOOTH SCROLLING */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* INITIALIZE ON PAGE LOAD */
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage();
});

/* ACTIVE NAV HIGHLIGHT BASED ON VISIBLE SECTION */
function initSectionObserver() {
  const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const targets = navLinks
    .map(a => a.getAttribute('href'))
    .map(href => document.querySelector(href))
    .filter(Boolean);

  if (!targets.length) return;

  const obsOptions = {
    root: null,
    threshold: 0.45
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        // remove active from all and set on this
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, obsOptions);

  targets.forEach(t => observer.observe(t));
}

// initialize observer after DOM ready
document.addEventListener('DOMContentLoaded', initSectionObserver);

/* ABOUT CAROUSEL */

let currentIndex = 0;

function moveCarousel(direction) {
  const container = document.querySelector('.about-carousel');
  if (!container) return;
  const wrapper = container.querySelector('.carousel-wrapper');
  const track = container.querySelector('.carousel-track');
  const cards = container.querySelectorAll('.card');
  const prevBtn = container.querySelector('.carousel-btn.prev');
  const nextBtn = container.querySelector('.carousel-btn.next');

  if (!cards.length) return;

  // compute gap from CSS and use actual card widths for accurate snapping
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const widths = Array.from(cards).map(c => Math.round(c.getBoundingClientRect().width));
  const singleCardWidth = widths[0] || 0;

  const maxTranslate = Math.round(track.scrollWidth - wrapper.clientWidth);

  // determine how many cards fit fully in the viewport by summing widths
  let sum = 0;
  let visibleCount = 0;
  for (let i = 0; i < widths.length; i++) {
    if (i > 0) sum += gap; // add gap between cards
    sum += widths[i];
    if (sum <= wrapper.clientWidth + 0.5) {
      visibleCount++;
    } else break;
  }
  visibleCount = Math.max(1, visibleCount);

  // update index and clamp so last page shows full cards
  currentIndex += direction;
  const maxIndex = Math.max(0, cards.length - visibleCount);
  currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex);

  // compute translate using single card width + gap
  let translateX = Math.round(currentIndex * (singleCardWidth + gap));

  // Clamp to allowable translate range
  if (translateX < 0) translateX = 0;
  if (translateX > maxTranslate) translateX = maxTranslate;

  // apply transform using 3d for smoother rendering
  track.style.transform = `translate3d(-${translateX}px, 0, 0)`;

  // Disable buttons (if present)
  if (prevBtn) prevBtn.disabled = currentIndex === 0;
  if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
}

window.addEventListener("load", () => {
  if (document.querySelector('.about-carousel')) moveCarousel(0);
});

window.addEventListener("resize", () => {
  if (document.querySelector('.about-carousel')) {
    currentIndex = 0;
    moveCarousel(0);
  }
});


