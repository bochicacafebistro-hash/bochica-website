// ── Langue ────────────────────────────────────────────
let currentLang = 'fr';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    el.innerHTML = el.getAttribute('data-' + lang);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.textContent.toLowerCase() === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
  // Accessibilité : mettre à jour l'attribut lang pour les lecteurs d'écran
  document.documentElement.lang = (lang === 'es') ? 'es' : (lang === 'en') ? 'en-CA' : 'fr-CA';
  localStorage.setItem('bochica-lang', lang);
  // Mettre à jour le badge de statut dans la bonne langue
  if (typeof renderStatus === 'function') renderStatus();
}

function restoreLang() {
  const saved = localStorage.getItem('bochica-lang');
  if (saved) setLang(saved);
}

// ── Nav scroll ────────────────────────────────────────
function initNav() {
  const fab = document.getElementById('fab-reserve');
  const reservationSec = document.getElementById('reservation');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.getElementById('nav').classList.toggle('scrolled', y > 60);
    // Afficher le FAB après 400px et le cacher quand on approche de la section réservation
    if (fab) {
      let show = y > 400;
      if (show && reservationSec) {
        const rect = reservationSec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) show = false;
      }
      fab.classList.toggle('visible', show);
    }
  });
}

// ── Menu mobile ───────────────────────────────────────
function toggleMenu() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('mobile-btn');
  const isOpen = links.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  // Accessibilité : synchroniser aria-expanded et aria-label
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  const lang = currentLang || 'fr';
  const labels = {
    fr: { open: 'Fermer le menu', closed: 'Ouvrir le menu' },
    en: { open: 'Close menu', closed: 'Open menu' },
    es: { open: 'Cerrar menú', closed: 'Abrir menú' }
  };
  btn.setAttribute('aria-label', isOpen ? labels[lang].open : labels[lang].closed);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('mobile-btn');
  links.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  const lang = currentLang || 'fr';
  const labels = { fr: 'Ouvrir le menu', en: 'Open menu', es: 'Abrir menú' };
  btn.setAttribute('aria-label', labels[lang] || labels.fr);
  document.body.style.overflow = '';
}

function initMobileMenu() {
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
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

// ── Onglets Menu ──────────────────────────────────────
function setMenuTab(tab, el) {
  document.querySelectorAll('.menu-section').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab).style.display = 'block';
  if (el) el.classList.add('active');
}

// ── Fiches de plats : photos + badges + modale ────────
// Sections qui ont photo + modale clickable (toutes sauf les extras, qui ne sont plus dans le menu)
const DISH_SECTIONS_WITH_MODAL = [
  'tab-entrees', 'tab-arepas', 'tab-bols', 'tab-repas',
  'tab-breuvages', 'tab-cocktails', 'tab-bieres', 'tab-desserts'
];
// Sections dont la modale affiche la liste des extras disponibles
const EXTRAS_SECTIONS = ['tab-arepas', 'tab-bols', 'tab-repas'];
// Sections qui reçoivent la mention Sans gluten
const GF_SECTIONS = ['tab-entrees', 'tab-arepas', 'tab-bols', 'tab-repas'];
// Plats qui contiennent du gluten (pas de mention)
const NO_GF_KEYWORDS = ['hot-dog', 'hot dog', 'hotdog', 'burger'];
// Plats avec option sans gluten offerte
const OPTIONAL_GF_KEYWORDS = ['picada suprema', 'salchipapas', 'suprema'];
// Sections qui reçoivent la mention Option végé / Végé
const VEG_SECTIONS = ['tab-arepas', 'tab-bols'];
// Plats déjà 100 % végétariens (mention Végé au lieu d'Option végé)
const FULL_VEG_KEYWORDS = ['végétarien', 'vegetarien', 'vegetarian', 'vegetariano'];

function initDishCards() {
  document.querySelectorAll('.menu-section').forEach(section => {
    const sectionId = section.id;
    const addModal = DISH_SECTIONS_WITH_MODAL.includes(sectionId);
    const addGF = GF_SECTIONS.includes(sectionId);
    const addVeg = VEG_SECTIONS.includes(sectionId);

    section.querySelectorAll('.menu-card').forEach(card => {
      const nameEl = card.querySelector('.menu-card-name');
      if (!nameEl) return;
      const rawName = (nameEl.getAttribute('data-fr') || nameEl.textContent || '').toLowerCase();

      // Envelopper le contenu existant dans .menu-card-body (sauf si déjà fait)
      if (addModal && !card.classList.contains('has-photo')) {
        card.classList.add('has-photo', 'clickable');

        // Déplacer tout le contenu actuel dans un body
        const body = document.createElement('div');
        body.className = 'menu-card-body';
        while (card.firstChild) body.appendChild(card.firstChild);

        // Le prix se déplace hors du body pour être en position absolue
        const priceInBody = body.querySelector('.menu-card-price');

        // Ajouter la photo — image personnalisée si data-photo, sinon placeholder Bochica
        const photo = document.createElement('div');
        const photoSrc = card.getAttribute('data-photo') || 'images/Logo%20Bochica%202026-8.png';
        const isPlaceholder = !card.getAttribute('data-photo');
        photo.className = isPlaceholder ? 'menu-card-photo placeholder' : 'menu-card-photo';
        const img = document.createElement('img');
        img.src = photoSrc;
        const dishName = (nameEl.getAttribute('data-fr') || nameEl.textContent || '').trim();
        img.alt = dishName ? `${dishName} — plat colombien chez Bochica` : 'Plat colombien Bochica';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.onerror = function() {
          photo.classList.add('placeholder');
          img.src = 'images/Logo%20Bochica%202026-8.png';
        };
        photo.appendChild(img);
        card.appendChild(photo);
        card.appendChild(body);
        if (priceInBody) card.appendChild(priceInBody);
      }

      // Collecter les badges à afficher
      const badges = [];
      if (addGF) {
        const gf = computeGFBadge(rawName);
        if (gf) badges.push(gf);
      }
      if (addVeg) {
        const veg = computeVegBadge(rawName);
        if (veg) badges.push(veg);
      }

      // Ajouter les badges (icônes + tooltip au hover)
      if (badges.length > 0 && !card.querySelector('.menu-card-badges')) {
        const badgesEl = document.createElement('div');
        badgesEl.className = 'menu-card-badges';
        badges.forEach(badge => {
          const span = document.createElement('span');
          span.className = 'badge ' + badge.cls;
          span.setAttribute('aria-label', badge.fr);
          span.setAttribute('role', 'img');
          // Icône SVG
          span.innerHTML = badge.iconSvg;
          // Label visible au hover (tooltip CSS)
          const label = document.createElement('span');
          label.className = 'badge-label';
          label.setAttribute('data-fr', badge.fr);
          label.setAttribute('data-en', badge.en);
          label.setAttribute('data-es', badge.es);
          label.textContent = badge.fr;
          span.appendChild(label);
          badgesEl.appendChild(span);
        });

        // Badges placés dans le body, juste sous le nom du plat
        const target = card.querySelector('.menu-card-body') || card;
        const nameInTarget = target.querySelector('.menu-card-name');
        if (nameInTarget && nameInTarget.nextSibling) {
          target.insertBefore(badgesEl, nameInTarget.nextSibling);
        } else if (nameInTarget) {
          target.appendChild(badgesEl);
        } else {
          target.appendChild(badgesEl);
        }
      }

      // Clic → ouvrir la modale (avec support clavier complet)
      if (addModal) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        const dishName = (nameEl.getAttribute('data-fr') || nameEl.textContent || '').trim();
        if (dishName) card.setAttribute('aria-label', `Voir les détails : ${dishName}`);
        card.addEventListener('click', () => openDish(card));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDish(card);
          }
        });
      }
    });
  });
}

// SVG icônes pour les badges (style Lucide, héritage couleur via currentColor)
const ICON_GF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 22 22 2"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/></svg>';
const ICON_VEG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96a1 1 0 0 1 1.8.84A14 14 0 0 1 21 12c0 5-4.5 8-8 8z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>';

function computeGFBadge(name) {
  // Pas de mention pour les plats avec gluten
  if (NO_GF_KEYWORDS.some(k => name.includes(k))) return null;
  // Option sans gluten offerte
  if (OPTIONAL_GF_KEYWORDS.some(k => name.includes(k))) {
    return {
      cls: 'badge-gf-opt',
      iconSvg: ICON_GF,
      fr: 'Option sans gluten',
      en: 'Gluten-free option',
      es: 'Opción sin gluten'
    };
  }
  // Sans gluten par défaut
  return {
    cls: 'badge-gf',
    iconSvg: ICON_GF,
    fr: 'Sans gluten',
    en: 'Gluten-free',
    es: 'Sin gluten'
  };
}

function computeVegBadge(name) {
  // Plat déjà 100 % végétarien → badge Végé
  if (FULL_VEG_KEYWORDS.some(k => name.includes(k))) {
    return {
      cls: 'badge-veg',
      iconSvg: ICON_VEG,
      fr: 'Végé',
      en: 'Veggie',
      es: 'Vegetariano'
    };
  }
  // Option végé disponible pour tous les autres bols et arepas
  return {
    cls: 'badge-veg-opt',
    iconSvg: ICON_VEG,
    fr: 'Option végé',
    en: 'Veggie option',
    es: 'Opción vegetariana'
  };
}

// ── Modale fiche de plat ──────────────────────────────
let lastFocusedCard = null;
function openDish(card) {
  const modal = document.getElementById('dish-modal');
  if (!modal) return;
  // Mémoriser la carte d'origine pour y restaurer le focus à la fermeture
  lastFocusedCard = card;

  const nameEl = card.querySelector('.menu-card-name');
  const descEl = card.querySelector('.menu-card-desc');
  const priceEl = card.querySelector('.menu-card-price');
  const badgesSrc = card.querySelector('.menu-card-badges');

  const mName = document.getElementById('dish-modal-name');
  const mDesc = document.getElementById('dish-modal-desc');
  const mPrice = document.getElementById('dish-modal-price');
  const mBadges = document.getElementById('dish-modal-badges');
  const mImg = document.getElementById('dish-modal-img');
  const mPh = modal.querySelector('.dish-modal-photo-ph');
  const mExtras = document.getElementById('dish-modal-extras');

  // Afficher la section Extras seulement pour les arepas, bols et repas
  if (mExtras) {
    const parentSection = card.closest('.menu-section');
    const showExtras = parentSection && EXTRAS_SECTIONS.includes(parentSection.id);
    mExtras.style.display = showExtras ? '' : 'none';
  }

  // Nom (copie des attributs data-*)
  if (nameEl) {
    mName.innerHTML = nameEl.innerHTML;
    copyLangAttrs(nameEl, mName);
  } else {
    mName.textContent = '';
  }

  // Description
  if (descEl) {
    mDesc.innerHTML = descEl.innerHTML;
    copyLangAttrs(descEl, mDesc);
    mDesc.style.display = '';
  } else {
    mDesc.textContent = '';
    mDesc.style.display = 'none';
  }

  // Prix
  mPrice.textContent = priceEl ? priceEl.textContent : '';

  // Badges (copie profonde)
  mBadges.innerHTML = badgesSrc ? badgesSrc.innerHTML : '';

  // Photo (placeholder pour l'instant)
  const photoSrc = card.getAttribute('data-photo');
  if (photoSrc) {
    mImg.src = photoSrc;
    mImg.style.display = '';
    if (mPh) mPh.style.display = 'none';
  } else {
    mImg.removeAttribute('src');
    mImg.style.display = 'none';
    if (mPh) mPh.style.display = '';
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Propager l'alt de la vignette vers la modale (accessibilité)
  const cardImg = card.querySelector('.menu-card-photo img');
  if (cardImg && mImg && mImg.src) mImg.alt = cardImg.alt || '';

  // Réappliquer la traduction sur le contenu fraîchement injecté
  setLang(currentLang);

  // Déplacer le focus dans la modale
  const closeBtn = modal.querySelector('.dish-modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

function closeDish(e) {
  // Si appelé depuis un clic sur l'overlay, on ne ferme que si la cible EST l'overlay
  if (e && e.currentTarget && e.target !== e.currentTarget) return;
  const modal = document.getElementById('dish-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Restaurer le focus sur la carte d'origine
  if (lastFocusedCard && typeof lastFocusedCard.focus === 'function') {
    lastFocusedCard.focus();
  }
}

// Focus trap à l'intérieur de la modale (accessibilité)
function trapFocusInModal(e) {
  const modal = document.getElementById('dish-modal');
  if (!modal || !modal.classList.contains('open') || e.key !== 'Tab') return;
  const focusables = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function copyLangAttrs(src, dst) {
  ['data-fr', 'data-en', 'data-es'].forEach(attr => {
    if (src.hasAttribute(attr)) dst.setAttribute(attr, src.getAttribute(attr));
  });
}

// ── Statut Ouvert / Fermé ─────────────────────────────
// Horaires : dimanche=0, lundi=1, ..., samedi=6
// [heureOuverture, heureFermeture] en heures décimales (17.5 = 17h30). null = fermé.
const SCHEDULE = {
  0: [13, 21],   // dimanche
  1: null,       // lundi
  2: null,       // mardi
  3: [17, 21],   // mercredi
  4: [17, 21],   // jeudi
  5: [12, 22],   // vendredi
  6: [13, 23]    // samedi
};
const DAY_NAMES = {
  fr: ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'],
  en: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  es: ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
};
function formatHour(h, lang) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  if (lang === 'en') {
    const period = hh >= 12 ? 'pm' : 'am';
    const h12 = hh > 12 ? hh - 12 : (hh === 0 ? 12 : hh);
    return mm ? `${h12}:${String(mm).padStart(2,'0')}${period}` : `${h12}${period}`;
  }
  return mm ? `${hh}h${String(mm).padStart(2,'0')}` : `${hh}h`;
}
function getQuebecDate() {
  // Forcer le fuseau Montréal/Québec pour ne pas dépendre du fuseau du visiteur
  const now = new Date();
  const qStr = now.toLocaleString('en-US', { timeZone: 'America/Toronto' });
  return new Date(qStr);
}
function computeStatus() {
  const now = getQuebecDate();
  const day = now.getDay();
  const hourNow = now.getHours() + now.getMinutes() / 60;
  const today = SCHEDULE[day];

  if (today) {
    const [open, close] = today;
    if (hourNow >= open && hourNow < close) {
      return { open: true, nextChange: close, nextDay: day };
    }
    if (hourNow < open) {
      return { open: false, nextChange: open, nextDay: day, todayOpens: true };
    }
  }
  // Trouver la prochaine ouverture
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (SCHEDULE[d]) {
      return { open: false, nextChange: SCHEDULE[d][0], nextDay: d, daysAhead: i };
    }
  }
  return { open: false };
}
function renderStatus() {
  const pill = document.getElementById('status-pill');
  const txt = document.getElementById('status-text');
  if (!pill || !txt) return;
  const lang = currentLang || 'fr';
  const s = computeStatus();
  const days = DAY_NAMES[lang];

  pill.classList.remove('open', 'closed');
  let fr, en, es;

  if (s.open) {
    pill.classList.add('open');
    const hF = formatHour(s.nextChange, 'fr');
    const hE = formatHour(s.nextChange, 'en');
    const hS = formatHour(s.nextChange, 'es');
    fr = `Ouvert · ferme à ${hF}`;
    en = `Open · closes at ${hE}`;
    es = `Abierto · cierra a las ${hS}`;
  } else {
    pill.classList.add('closed');
    if (s.todayOpens) {
      const hF = formatHour(s.nextChange, 'fr');
      const hE = formatHour(s.nextChange, 'en');
      const hS = formatHour(s.nextChange, 'es');
      fr = `Fermé · ouvre à ${hF}`;
      en = `Closed · opens at ${hE}`;
      es = `Cerrado · abre a las ${hS}`;
    } else if (s.nextDay !== undefined) {
      const hF = formatHour(s.nextChange, 'fr');
      const hE = formatHour(s.nextChange, 'en');
      const hS = formatHour(s.nextChange, 'es');
      fr = `Fermé · ouvre ${DAY_NAMES.fr[s.nextDay]} ${hF}`;
      en = `Closed · opens ${DAY_NAMES.en[s.nextDay]} ${hE}`;
      es = `Cerrado · abre ${DAY_NAMES.es[s.nextDay]} ${hS}`;
    } else {
      fr = 'Fermé'; en = 'Closed'; es = 'Cerrado';
    }
  }

  txt.setAttribute('data-fr', fr);
  txt.setAttribute('data-en', en);
  txt.setAttribute('data-es', es);
  txt.textContent = ({ fr, en, es })[lang] || fr;
}

// ── Formulaire de contact ─────────────────────────────
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const msg = {
    fr: {
      sending: 'Envoi en cours…',
      success: '✅ Merci ! Votre message a bien été envoyé. Nous répondons dans les 24-48 h.',
      error: 'Une erreur est survenue. Écrivez-nous directement à bochicacafebistro@gmail.com',
      notconfigured: '📧 Votre app courriel s\'ouvre — cliquez sur Envoyer pour finaliser l\'envoi à bochicacafebistro@gmail.com'
    },
    en: {
      sending: 'Sending…',
      success: '✅ Thank you! Your message has been sent. We reply within 24-48 h.',
      error: 'Something went wrong. Please write us at bochicacafebistro@gmail.com',
      notconfigured: '📧 Your email app is opening — click Send to finalize to bochicacafebistro@gmail.com'
    },
    es: {
      sending: 'Enviando…',
      success: '✅ ¡Gracias! Tu mensaje ha sido enviado. Respondemos en 24-48 h.',
      error: 'Ocurrió un error. Escríbenos a bochicacafebistro@gmail.com',
      notconfigured: '📧 Se abre tu app de correo — haz clic en Enviar para finalizar a bochicacafebistro@gmail.com'
    }
  };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lang = currentLang || 'fr';
    const t = msg[lang];

    // Si Formspree n'est pas configuré, basculer vers mailto
    if (form.action.includes('VOTRE_ID_FORMSPREE')) {
      const data = new FormData(form);
      const body = `Nom: ${data.get('nom')}%0D%0ACourriel: ${data.get('email')}%0D%0ATéléphone: ${data.get('telephone')||'—'}%0D%0ASujet: ${data.get('sujet')}%0D%0A%0D%0A${data.get('message')}`;
      window.location.href = `mailto:bochicacafebistro@gmail.com?subject=${encodeURIComponent(data.get('sujet')||'Message du site')}&body=${body}`;
      status.className = 'form-status success';
      status.textContent = t.notconfigured;
      return;
    }

    status.className = 'form-status';
    status.textContent = t.sending;
    status.style.display = 'block';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        status.className = 'form-status success';
        status.textContent = t.success;
        form.reset();
      } else {
        status.className = 'form-status error';
        status.textContent = t.error;
      }
    } catch {
      status.className = 'form-status error';
      status.textContent = t.error;
    }
  });
}

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDishCards();
  restoreLang();
  initNav();
  initMobileMenu();
  initScrollReveal();
  initYear();
  renderStatus();
  initContactForm();
  // Rafraîchir toutes les minutes
  setInterval(renderStatus, 60000);
});

// Fermer la modale avec Échap + focus trap
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDish();
  trapFocusInModal(e);
});
