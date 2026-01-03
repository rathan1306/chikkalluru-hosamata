
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
}, 5000);

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

/* ABOUT CAROUSEL */
let currentIndex = 0;

function moveCarousel(direction) {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.card');
  const cardWidth = cards[0].offsetWidth + 20; // card width + gap
  const visibleCards = window.innerWidth > 992 ? 3 : window.innerWidth > 600 ? 2 : 1;
  const maxIndex = cards.length - visibleCards;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

