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
  // Mettre à jour le badge de statut dans la bonne langue
  if (typeof renderStatus === 'function') renderStatus();
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

        // Ajouter la photo placeholder
        const photo = document.createElement('div');
        photo.className = 'menu-card-photo empty';
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

      // Ajouter les badges
      if (badges.length > 0 && !card.querySelector('.menu-card-badges')) {
        const badgesEl = document.createElement('div');
        badgesEl.className = 'menu-card-badges';
        badges.forEach(badge => {
          const span = document.createElement('span');
          span.className = 'badge ' + badge.cls;
          span.setAttribute('data-fr', badge.fr);
          span.setAttribute('data-en', badge.en);
          span.setAttribute('data-es', badge.es);
          span.textContent = badge.fr;
          badgesEl.appendChild(span);
        });

        // Insérer après le nom (dans body si has-photo, sinon directement)
        const target = card.querySelector('.menu-card-body') || card;
        const nameInTarget = target.querySelector('.menu-card-name');
        if (nameInTarget && nameInTarget.nextSibling) {
          target.insertBefore(badgesEl, nameInTarget.nextSibling);
        } else {
          target.appendChild(badgesEl);
        }
      }

      // Clic → ouvrir la modale
      if (addModal) {
        card.addEventListener('click', () => openDish(card));
      }
    });
  });
}

function computeGFBadge(name) {
  // Pas de mention pour les plats avec gluten
  if (NO_GF_KEYWORDS.some(k => name.includes(k))) return null;
  // Option sans gluten offerte
  if (OPTIONAL_GF_KEYWORDS.some(k => name.includes(k))) {
    return {
      cls: 'badge-gf-opt',
      fr: 'Option sans gluten',
      en: 'Gluten-free option',
      es: 'Opción sin gluten'
    };
  }
  // Sans gluten par défaut
  return {
    cls: 'badge-gf',
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
      fr: 'Végé',
      en: 'Veggie',
      es: 'Vegetariano'
    };
  }
  // Option végé disponible pour tous les autres bols et arepas
  return {
    cls: 'badge-veg-opt',
    fr: 'Option végé',
    en: 'Veggie option',
    es: 'Opción vegetariana'
  };
}

// ── Modale fiche de plat ──────────────────────────────
function openDish(card) {
  const modal = document.getElementById('dish-modal');
  if (!modal) return;

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

  // Réappliquer la traduction sur le contenu fraîchement injecté
  setLang(currentLang);
}

function closeDish(e) {
  // Si appelé depuis un clic sur l'overlay, on ne ferme que si la cible EST l'overlay
  if (e && e.currentTarget && e.target !== e.currentTarget) return;
  const modal = document.getElementById('dish-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
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
      error: 'Une erreur est survenue. Écrivez-nous directement à info@bochicacafebistro.ca',
      notconfigured: 'Le formulaire n\'est pas encore configuré. Écrivez-nous à info@bochicacafebistro.ca'
    },
    en: {
      sending: 'Sending…',
      success: '✅ Thank you! Your message has been sent. We reply within 24-48 h.',
      error: 'Something went wrong. Please write us at info@bochicacafebistro.ca',
      notconfigured: 'The form is not yet configured. Please write us at info@bochicacafebistro.ca'
    },
    es: {
      sending: 'Enviando…',
      success: '✅ ¡Gracias! Tu mensaje ha sido enviado. Respondemos en 24-48 h.',
      error: 'Ocurrió un error. Escríbenos a info@bochicacafebistro.ca',
      notconfigured: 'El formulario aún no está configurado. Escríbenos a info@bochicacafebistro.ca'
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
      window.location.href = `mailto:info@bochicacafebistro.ca?subject=${encodeURIComponent(data.get('sujet')||'Message du site')}&body=${body}`;
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

// Fermer la modale avec Échap
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDish();
});
