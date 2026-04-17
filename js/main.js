// ── Langue ────────────────────────────────────────────
let currentLang = 'fr';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    el.innerHTML = el.getAttribute('data-' + lang);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
  });
  localStorage.setItem('bochica-lang', lang);
}

function restoreLang() {
  const saved = localStorage.getItem('bochica-lang');
  if (saved) setLang(saved);
}

// ── Nav scroll ────────────────────────────────────────
function initNav() {
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── Menu mobile ───────────────────────────────────────
function toggleMenu() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('mobile-btn');
  const isOpen = links.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('mobile-btn');
  links.classList.remove('open');
  btn.classList.remove('open');
  document.body.style.overflow = '';
}

function initMobileMenu() {
  // Fermer en cliquant sur un lien
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  // Fermer en cliquant en dehors
  document.addEventListener('click', e => {
    const links = document.getElementById('nav-links');
    const btn = document.getElementById('mobile-btn');
    if (links.classList.contains('open') && !links.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });
}

// ── Scroll reveal ─────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Année copyright ───────────────────────────────────
function initYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  restoreLang();
  initNav();
  initMobileMenu();
  initScrollReveal();
  initYear();
});
