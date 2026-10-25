// ── Langue ────────────────────────────────────────────
// Chaque langue a sa propre adresse : / (fr), /en/, /es/ — pages générées par tools/build_lang.py.
// La langue de la page vient de <html data-page-lang="…">. setLang() sert encore au contenu
// ajouté par JS (badges, modale, statut ouvert/fermé).
const PAGE_LANG = document.documentElement.getAttribute('data-page-lang') || 'fr';
const LANG_PATHS = { fr: '/', en: '/en/', es: '/es/' };
let currentLang = PAGE_LANG;

function saveLang(lang) {
  try { localStorage.setItem('bochica-lang', lang); } catch (e) {}
}

// Aller vers la version d'une autre langue (en gardant la section : #menu, #horaires…)
function goLang(lang) {
  saveLang(lang);
  if (lang !== PAGE_LANG && LANG_PATHS[lang]) {
    window.location.href = LANG_PATHS[lang] + window.location.hash;
    return true;
  }
  return false;
}

function initLangLinks() {
  document.querySelectorAll('a.lang-btn[data-lang]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      goLang(a.getAttribute('data-lang'));
    });
  });
}

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    el.innerHTML = el.getAttribute('data-' + lang);
  });
  // Attributs traduits (lecteurs d'écran, images, cartes)
  [['aria', 'aria-label'], ['alt', 'alt'], ['title', 'title']].forEach(([key, attr]) => {
    document.querySelectorAll('[data-' + key + '-' + lang + ']').forEach(el => {
      el.setAttribute(attr, el.getAttribute('data-' + key + '-' + lang));
    });
  });
  // Prix : 12,50 $ (fr/es) · $12.50 (en)
  document.querySelectorAll('[data-amount]').forEach(el => {
    el.textContent = formatPrice(el.getAttribute('data-amount'), lang);
  });
  // Libellé accessible des cartes de plats
  document.querySelectorAll('.menu-card[role="button"]').forEach(card => {
    const nameEl = card.querySelector('.menu-card-name');
    if (!nameEl) return;
    const name = (nameEl.getAttribute('data-' + lang) || nameEl.textContent || '').trim();
    card.setAttribute('aria-label', DETAILS_LABEL[lang] + name);
  });
  // Bouton hamburger
  const mobileBtn = document.getElementById('mobile-btn');
  if (mobileBtn) {
    const open = mobileBtn.getAttribute('aria-expanded') === 'true';
    const lbl = { fr: ['Ouvrir le menu', 'Fermer le menu'], en: ['Open menu', 'Close menu'], es: ['Abrir menú', 'Cerrar menú'] };
    mobileBtn.setAttribute('aria-label', lbl[lang][open ? 1 : 0]);
  }
  // Accessibilité : mettre à jour l'attribut lang pour les lecteurs d'écran
  document.documentElement.lang = (lang === 'es') ? 'es' : (lang === 'en') ? 'en-CA' : 'fr-CA';
  saveLang(lang);
  // Mettre à jour le badge de statut dans la bonne langue
  if (typeof renderStatus === 'function') renderStatus();
}

const DETAILS_LABEL = { fr: 'Voir les détails : ', en: 'View details: ', es: 'Ver detalles: ' };

function formatPrice(amount, lang) {
  const n = parseFloat(amount);
  if (isNaN(n)) return amount;
  const txt = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return lang === 'en' ? '$' + txt : txt.replace('.', ',') + ' $';
}

// La page est déjà dans la bonne langue : on applique juste la langue au contenu ajouté par JS
function restoreLang() {
  setLang(PAGE_LANG);
}

// ── Écran de choix de langue (mobile, première visite) ──
function initLangGate() {
  const root = document.documentElement;
  const gate = document.getElementById('lang-gate');
  if (!gate) return;
  if (!root.classList.contains('lang-gate-on')) { gate.remove(); return; }

  // Langue suggérée selon le téléphone (fr par défaut)
  const prefs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'fr'])
    .map(l => String(l).slice(0, 2).toLowerCase());
  const suggested = prefs.find(l => ['fr', 'en', 'es'].includes(l)) || 'fr';

  // Rendre le reste de la page inactif pendant le choix (focus + lecteurs d'écran)
  const others = [...document.body.children].filter(el => el !== gate && el.tagName !== 'SCRIPT');
  others.forEach(el => el.setAttribute('inert', ''));

  const close = (lang) => {
    if (goLang(lang)) return; // autre langue → on part vers /en/ ou /es/
    others.forEach(el => el.removeAttribute('inert'));
    gate.classList.add('is-leaving');
    const done = () => { root.classList.remove('lang-gate-on'); gate.remove(); };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reduce ? done() : setTimeout(done, 350);
  };

  gate.querySelectorAll('.lang-gate__btn').forEach(btn => {
    if (btn.dataset.lang === suggested) btn.classList.add('is-suggested');
    btn.addEventListener('click', () => close(btn.dataset.lang));
  });
  gate.addEventListener('keydown', e => { if (e.key === 'Escape') close(suggested); });
  const first = gate.querySelector('.is-suggested');
  if (first) first.focus({ preventScroll: true });
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
      const menuSec = document.getElementById('menu');
      if (show && menuSec && window.innerWidth <= 760) {
        const r = menuSec.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) show = false;
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

// ── Menu : catégories + sous-onglets (oct. 2026, inspiré de La Cage) ──
// Ordinateur : rangée de catégories (.menu-cats). Mobile : bouton « ≡ Bouffe ▾ » qui ouvre
// la feuille #menu-cat-sheet. Dessous : sous-onglets générés à partir des .menu-subsection-title
// de la catégorie affichée ; l'onglet actif suit le défilement.
const MENU_CATS = {
  bouffe: ['tab-entrees', 'tab-arepas', 'tab-repas'],
  breuvages: ['tab-breuvages'],
  cocktails: ['tab-cocktails'],
  bieres: ['tab-bieres'],
  desserts: ['tab-desserts']
};
// Icônes des sous-sections de la Bouffe (même style que les icônes de catégories)
const SUB_ICONS = {
  'tab-entrees': 'M3 16a9 9 0 0 1 18 0zM7 16l1-3M11 16l.5-4M15 16l-.5-4M18 16l-1-3',
  'tab-arepas': 'M4 10c0-2.2 3.6-4 8-4s8 1.8 8 4-3.6 4-8 4-8-1.8-8-4zM4 10v3c0 2.2 3.6 4 8 4s8-1.8 8-4v-3',
  'tab-repas': 'M3 11h18a9 9 0 0 1-18 0zM8 7c0-1 1-1.2 1-2.5M12 7c0-1 1-1.2 1-2.5M16 7c0-1 1-1.2 1-2.5'
};
const ARROW_SVG = '<svg viewBox="0 0 34 22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><path d="M0 11h32M22 1l10 10-10 10"/></svg>';
let currentMenuCat = 'bouffe';
let menuSpyLock = 0;

function iconSvg(d) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="' + d + '"/></svg>';
}
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
// Hauteur de la nav fixe + de la barre du menu (pour viser sous les deux)
function navHeight() {
  const nav = document.getElementById('nav');
  return nav ? nav.getBoundingClientRect().height : 64;
}
function syncMenuStickyTop() {
  document.documentElement.style.setProperty('--menu-sticky-top', Math.round(navHeight()) + 'px');
}
function menuStickyBottom() {
  const bar = document.getElementById('menu-nav');
  return navHeight() + (bar ? bar.getBoundingClientRect().height : 0);
}

function initMenuNav() {
  const bar = document.getElementById('menu-nav');
  if (!bar) return;
  syncMenuStickyTop();
  const navEl = document.getElementById('nav');
  // La nav rapetisse au défilement (padding 18 → 12 px) : suivre sa vraie hauteur (border-box)
  if (navEl && window.ResizeObserver) new ResizeObserver(syncMenuStickyTop).observe(navEl, { box: 'border-box' });
  if (navEl) navEl.addEventListener('transitionend', syncMenuStickyTop);
  window.addEventListener('resize', syncMenuStickyTop);

  // Titres de sous-sections : id pour les ancres + icône (texte déplacé dans un span pour setLang)
  let n = 0;
  document.querySelectorAll('#menu .menu-section').forEach(sec => {
    sec.querySelectorAll('.menu-subsection-title').forEach((t, i) => {
      t.id = t.id || 'menu-sub-' + (++n);
      if (t.querySelector('.menu-sub-label')) return;
      const label = document.createElement('span');
      label.className = 'menu-sub-label';
      ['fr', 'en', 'es'].forEach(l => {
        const v = t.getAttribute('data-' + l);
        if (v != null) { label.setAttribute('data-' + l, v); t.removeAttribute('data-' + l); }
      });
      label.innerHTML = t.innerHTML;
      t.innerHTML = '';
      if (i === 0 && SUB_ICONS[sec.id]) t.insertAdjacentHTML('beforeend', iconSvg(SUB_ICONS[sec.id]));
      t.appendChild(label);
    });
  });

  // Catégories (ordinateur)
  document.querySelectorAll('.menu-cat').forEach(btn => {
    btn.addEventListener('click', () => setMenuCat(btn.dataset.cat, true));
  });

  // Feuille de choix (mobile) : copie des boutons de catégories
  const list = document.getElementById('menu-sheet-list');
  const sheet = document.getElementById('menu-cat-sheet');
  const toggle = document.getElementById('menu-cat-toggle');
  if (list && sheet && toggle) {
    document.querySelectorAll('.menu-cat').forEach(btn => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'menu-sheet-item';
      item.dataset.cat = btn.dataset.cat;
      item.innerHTML = btn.querySelector('.menu-cat-icon').outerHTML + btn.querySelector('.menu-cat-name').outerHTML + ARROW_SVG;
      item.addEventListener('click', () => { closeMenuSheet(); setMenuCat(item.dataset.cat, true); });
      list.appendChild(item);
    });
    toggle.addEventListener('click', openMenuSheet);
    document.getElementById('menu-sheet-close').addEventListener('click', () => closeMenuSheet(true));
    sheet.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.stopPropagation(); closeMenuSheet(true); }
      if (e.key === 'Tab') {
        const f = sheet.querySelectorAll('button');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  setMenuCat('bouffe', false);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; updateMenuSpy(); });
  }, { passive: true });
}

function setMenuCat(cat, scroll) {
  if (!MENU_CATS[cat]) return;
  currentMenuCat = cat;
  const ids = MENU_CATS[cat];
  document.querySelectorAll('#menu .menu-section').forEach(s => {
    s.style.display = ids.includes(s.id) ? '' : 'none';
  });
  document.querySelectorAll('.menu-cat').forEach(b => {
    const on = b.dataset.cat === cat;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  document.querySelectorAll('.menu-sheet-item').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
    if (b.dataset.cat === cat) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
  });
  // Nom affiché sur le bouton mobile
  const cur = document.getElementById('menu-cat-current');
  const src = document.querySelector('.menu-cat[data-cat="' + cat + '"] .menu-cat-name');
  if (cur && src) {
    copyLangAttrs(src, cur);
    cur.innerHTML = src.getAttribute('data-' + currentLang) || src.innerHTML;
  }
  buildMenuSubtabs();
  // Les cartes « reveal » d'une catégorie cachée n'ont pas encore été animées : les montrer
  ids.forEach(id => document.querySelectorAll('#' + id + ' .reveal').forEach(el => el.classList.add('visible')));

  if (scroll) {
    const first = document.getElementById(ids[0]);
    const bar = document.getElementById('menu-nav');
    if (first && bar) {
      // Remonter au début de la catégorie seulement si on est déjà plus bas que la barre
      const target = first.getBoundingClientRect().top + window.scrollY - menuStickyBottom() + 1;
      if (window.scrollY > target) window.scrollTo({ top: target, behavior: 'auto' });
    }
  }
  updateMenuSpy();
}

function buildMenuSubtabs() {
  const wrap = document.getElementById('menu-subtabs');
  if (!wrap) return;
  wrap.innerHTML = '';
  MENU_CATS[currentMenuCat].forEach(id => {
    document.querySelectorAll('#' + id + ' .menu-subsection-title').forEach(t => {
      const a = document.createElement('a');
      a.className = 'menu-subtab';
      a.href = '#' + t.id;
      a.dataset.target = t.id;
      const svg = t.querySelector('svg');
      if (svg) a.appendChild(svg.cloneNode(true));
      const lbl = t.querySelector('.menu-sub-label');
      const span = document.createElement('span');
      if (lbl) { copyLangAttrs(lbl, span); span.innerHTML = lbl.innerHTML; }
      a.appendChild(span);
      a.addEventListener('click', e => {
        e.preventDefault();
        goToMenuSub(t);
        setActiveSubtab(t.id);
        menuSpyLock = Date.now() + 700; // le défilement doux ne doit pas faire clignoter l'onglet
      });
      wrap.appendChild(a);
    });
  });
  wrap.hidden = wrap.children.length < 2;
}

function goToMenuSub(t) {
  const top = t.getBoundingClientRect().top + window.scrollY - menuStickyBottom() - 4;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

function setActiveSubtab(id) {
  const wrap = document.getElementById('menu-subtabs');
  if (!wrap) return;
  let activeEl = null;
  wrap.querySelectorAll('.menu-subtab').forEach(a => {
    const on = a.dataset.target === id;
    a.classList.toggle('active', on);
    if (on) { a.setAttribute('aria-current', 'true'); activeEl = a; } else a.removeAttribute('aria-current');
  });
  // Garder l'onglet actif visible dans la rangée (mobile)
  if (activeEl && wrap.scrollWidth > wrap.clientWidth) {
    const left = activeEl.offsetLeft - (wrap.clientWidth - activeEl.offsetWidth) / 2;
    wrap.scrollTo({ left: Math.max(0, left), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

function updateMenuSpy() {
  if (Date.now() < menuSpyLock) return;
  const titles = [];
  MENU_CATS[currentMenuCat].forEach(id => document.querySelectorAll('#' + id + ' .menu-subsection-title').forEach(t => titles.push(t)));
  if (!titles.length) return;
  const limit = menuStickyBottom() + 40;
  let cur = titles[0].id;
  titles.forEach(t => { if (t.getBoundingClientRect().top <= limit) cur = t.id; });
  const wrap = document.getElementById('menu-subtabs');
  const active = wrap && wrap.querySelector('.menu-subtab.active');
  if (!active || active.dataset.target !== cur) setActiveSubtab(cur);
}

let menuSheetOpener = null;
function openMenuSheet() {
  const sheet = document.getElementById('menu-cat-sheet');
  const toggle = document.getElementById('menu-cat-toggle');
  if (!sheet) return;
  menuSheetOpener = toggle;
  sheet.hidden = false;
  requestAnimationFrame(() => sheet.classList.add('open'));
  if (toggle) toggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  const cur = sheet.querySelector('.menu-sheet-item.active') || sheet.querySelector('button');
  if (cur) setTimeout(() => cur.focus(), 30);
}
function closeMenuSheet(restoreFocus) {
  const sheet = document.getElementById('menu-cat-sheet');
  const toggle = document.getElementById('menu-cat-toggle');
  if (!sheet || sheet.hidden) return;
  sheet.classList.remove('open');
  sheet.hidden = true;
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  if (restoreFocus && menuSheetOpener) menuSheetOpener.focus();
}

// Compatibilité : ancien nom de fonction (onglet → catégorie)
function setMenuTab(tab) {
  const cat = Object.keys(MENU_CATS).find(k => MENU_CATS[k].includes('tab-' + tab));
  if (cat) setMenuCat(cat, true);
}

// ── Fiches de plats : photos + badges + modale ────────
// Sections qui ont photo + modale clickable (toutes sauf les extras, qui ne sont plus dans le menu)
const DISH_SECTIONS_WITH_MODAL = [
  'tab-entrees', 'tab-arepas', 'tab-repas',
  'tab-breuvages', 'tab-cocktails', 'tab-bieres', 'tab-desserts'
];
// Sections dont la modale affiche la liste des extras disponibles
const EXTRAS_SECTIONS = ['tab-arepas', 'tab-repas'];
// Sections qui reçoivent la mention Sans gluten
const GF_SECTIONS = ['tab-entrees', 'tab-arepas', 'tab-repas'];
// Plats qui contiennent du gluten (pas de mention)
// chuleta valluna = farinée ; soupe du jour = pas de mention (confirmé 12 oct. 2026)
const NO_GF_KEYWORDS = ['hot-dog', 'hot dog', 'hotdog', 'burger', 'chuleta', 'soupe'];
// Plats avec option sans gluten offerte
const OPTIONAL_GF_KEYWORDS = ['picada suprema', 'salchipapas', 'suprema'];
// Sections qui reçoivent la mention Option végé / Végé
const VEG_SECTIONS = ['tab-arepas'];
// Plats hors de ces sections qui ont une version végé (badge Option végé)
const VEG_OPTION_DISHES = ['bol medellín'];
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
        const photoSrc = card.getAttribute('data-photo') || '/images/Logo%20Bochica%202026-8.png';
        const isPlaceholder = !card.getAttribute('data-photo');
        photo.className = isPlaceholder ? 'menu-card-photo placeholder' : 'menu-card-photo';
        const img = document.createElement('img');
        img.src = photoSrc;
        const dishName = (nameEl.getAttribute('data-fr') || nameEl.textContent || '').trim();
        // Texte alternatif = nom du plat/boisson, traduit par setLang() via data-alt-*
        ['fr', 'en', 'es'].forEach(l => {
          const n = (nameEl.getAttribute('data-' + l) || nameEl.textContent || '').trim();
          if (n) img.setAttribute('data-alt-' + l, n);
        });
        img.alt = dishName || 'Bochica';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.onerror = function() {
          photo.classList.add('placeholder');
          img.src = '/images/Logo%20Bochica%202026-8.png';
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
      if (addVeg || VEG_OPTION_DISHES.some(k => rawName.includes(k))) {
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
        if (dishName) card.setAttribute('aria-label', DETAILS_LABEL.fr + dishName);
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


// Étiquettes sur la photo d'un plat : <div class="menu-card" data-flag="new|weekend|share|sunday">
const DISH_FLAGS = {
  new: { cls: 'flag-new', fr: 'Nouveau', en: 'New', es: 'Nuevo' },
  weekend: { cls: 'flag-dark', fr: 'Ven. – dim.', en: 'Fri – Sun', es: 'Vie. – dom.' },
  share: { cls: 'flag-blue', fr: 'À partager', en: 'To share', es: 'Para compartir' },
  sunday: { cls: 'flag-yellow', fr: 'Dim. 5 $', en: 'Sun. $5', es: 'Dom. 5 $' }
};
function addDishFlags() {
  document.querySelectorAll('.menu-card[data-flag]').forEach(card => {
    const f = DISH_FLAGS[card.getAttribute('data-flag')];
    const photo = card.querySelector('.menu-card-photo');
    if (!f || !photo || photo.querySelector('.menu-flag')) return;
    const span = document.createElement('span');
    span.className = 'menu-flag ' + f.cls;
    ['fr', 'en', 'es'].forEach(l => span.setAttribute('data-' + l, f[l]));
    span.textContent = f[currentLang] || f.fr;
    photo.appendChild(span);
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
  // Option végé disponible pour les autres arepas farcies et le Bol Medellín
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

  // Afficher la section Extras seulement pour les arepas et les repas
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
  0: [12, 20.5], // dimanche
  1: null,       // lundi
  2: null,       // mardi
  3: [17, 21],   // mercredi
  4: [17, 21],   // jeudi
  5: [12, 22],   // vendredi
  6: [12, 22.5]  // samedi
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
    return mm ? `${h12}:${String(mm).padStart(2,'0')} ${period}` : `${h12} ${period}`;
  }
  if (lang === 'es') return `${hh}:${String(mm).padStart(2,'0')}`;
  return mm ? `${hh}h${String(mm).padStart(2,'0')}` : `${hh}h`;
}
function getQuebecDate() {
  // Forcer le fuseau Montréal/Québec pour ne pas dépendre du fuseau du visiteur
  const now = new Date();
  const qStr = now.toLocaleString('en-US', { timeZone: 'America/Toronto' });
  return new Date(qStr);
}
// ── Promos : étiquette « Aujourd'hui » sur la promo du jour (heure de Québec) ──
function initPromoToday() {
  const day = getQuebecDate().getDay();
  document.querySelectorAll('.promo-card[data-promo-day]').forEach(card => {
    if (Number(card.getAttribute('data-promo-day')) !== day) return;
    card.classList.add('is-today');
    if (card.querySelector('.promo-card__today')) return;
    const tag = document.createElement('span');
    tag.className = 'promo-card__today';
    tag.setAttribute('data-fr', "Aujourd'hui");
    tag.setAttribute('data-en', 'Today');
    tag.setAttribute('data-es', 'Hoy');
    tag.textContent = "Aujourd'hui";
    card.prepend(tag);
  });
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
  renderStatusInto(document.getElementById('status-pill'), document.getElementById('status-text'));
  renderStatusInto(document.getElementById('menu-status'), document.getElementById('menu-status-text'));
}
function renderStatusInto(pill, txt) {
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
  addDishFlags();
  initMenuNav();
  initPromoToday();
  restoreLang();
  initLangLinks();
  initLangGate();
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
