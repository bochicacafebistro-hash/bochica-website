/* ═══════════════════════════════════════════════════════════════
   Témoins et consentement — Loi 25 (Québec)
   ───────────────────────────────────────────────────────────────
   Principe : RIEN de tiers qui dépose des témoins ne se charge avant un « oui ».
   - Mesure publicitaire (Google Ads) : la balise Google n'est chargée qu'après consentement.
   - Contenus externes (carte Google, fil Instagram/Behold) : chargés après consentement,
     ou au clic sur « Afficher » (pour cette visite seulement).
   - Le choix est gardé 12 mois dans le navigateur (clé bochica-consent), puis redemandé.
   - Lien « Gérer les témoins » (attribut data-consent-open) pour changer d'idée en tout temps.

   ⚙️ RÉGLAGES GOOGLE ADS : remplir ADS_ID et les étiquettes (Google Ads → Objectifs →
   Conversions → l'action → « Configurer la balise » → « Utiliser Google Tag Manager »).
   Laisser vide = aucune balise chargée, même avec consentement.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var CONFIG = {
    ADS_ID: 'AW-16766092846',  // compte Google Ads 617-658-9448
    LABELS: {
      reserve: 'bX4oCKyvk5IdEK6M2bo-',  // « Clic Réserver (Libro) »
      order: '6QSpCK-vk5IdEK6M2bo-',    // « Clic Commander en ligne »
      call: 'yxvHCLKvk5IdEK6M2bo-'      // « Clic telephone (site Web) »
    }
  };

  var KEY = 'bochica-consent';
  var VERSION = 1;
  var MAX_AGE = 365 * 24 * 3600 * 1000; // 12 mois

  var TXT = {
    fr: {
      region: 'Témoins et vie privée',
      title: 'Témoins et vie privée',
      body: 'Avec votre accord, nous utilisons des témoins pour mesurer l’efficacité de nos publicités Google (ex. : clics sur « Réserver ») et pour afficher la carte Google et nos publications Instagram. Vous pouvez changer d’idée en tout temps avec « Gérer les témoins », au bas de la page.',
      policy: 'Politique de confidentialité',
      refuse: 'Tout refuser',
      custom: 'Personnaliser',
      accept: 'Tout accepter',
      save: 'Enregistrer mes choix',
      essTitle: 'Essentiels',
      essDesc: 'Toujours actifs. Mémorisent votre langue et votre choix de témoins, dans votre navigateur seulement.',
      adsTitle: 'Mesure publicitaire (Google Ads)',
      adsDesc: 'Nous indique si nos annonces Google mènent à des réservations, commandes ou appels, et permet de vous présenter nos annonces sur les services de Google. Données traitées par Google, possiblement à l’extérieur du Québec.',
      extTitle: 'Contenus externes (Google Maps, Instagram)',
      extDesc: 'Affiche la carte interactive et notre fil Instagram. Ces services peuvent déposer leurs propres témoins.',
      mapMsg: 'La carte Google est masquée tant que vous n’avez pas accepté les contenus externes.',
      igMsg: 'Nos publications Instagram sont masquées tant que vous n’avez pas accepté les contenus externes.',
      show: 'Afficher (cette fois-ci)',
      always: 'Toujours afficher'
    },
    en: {
      region: 'Cookies and privacy',
      title: 'Cookies and privacy',
      body: 'With your consent, we use cookies to measure how well our Google ads work (e.g. clicks on “Reserve”) and to display the Google map and our Instagram posts. You can change your mind at any time with “Manage cookies” at the bottom of the page.',
      policy: 'Privacy policy',
      refuse: 'Reject all',
      custom: 'Customize',
      accept: 'Accept all',
      save: 'Save my choices',
      essTitle: 'Essential',
      essDesc: 'Always on. They remember your language and your cookie choice, in your browser only.',
      adsTitle: 'Ad measurement (Google Ads)',
      adsDesc: 'Tells us whether our Google ads lead to reservations, orders or calls, and lets us show you our ads on Google services. Data processed by Google, possibly outside Québec.',
      extTitle: 'External content (Google Maps, Instagram)',
      extDesc: 'Displays the interactive map and our Instagram feed. These services may set their own cookies.',
      mapMsg: 'The Google map is hidden until you accept external content.',
      igMsg: 'Our Instagram posts are hidden until you accept external content.',
      show: 'Show (this time)',
      always: 'Always show'
    },
    es: {
      region: 'Cookies y privacidad',
      title: 'Cookies y privacidad',
      body: 'Con su consentimiento, usamos cookies para medir la eficacia de nuestros anuncios de Google (p. ej.: clics en «Reservar») y para mostrar el mapa de Google y nuestras publicaciones de Instagram. Puede cambiar de opinión en cualquier momento con «Gestionar cookies», al pie de la página.',
      policy: 'Política de privacidad',
      refuse: 'Rechazar todo',
      custom: 'Personalizar',
      accept: 'Aceptar todo',
      save: 'Guardar mis opciones',
      essTitle: 'Esenciales',
      essDesc: 'Siempre activas. Recuerdan su idioma y su elección de cookies, solo en su navegador.',
      adsTitle: 'Medición publicitaria (Google Ads)',
      adsDesc: 'Nos indica si nuestros anuncios de Google generan reservas, pedidos o llamadas, y permite mostrarle nuestros anuncios en los servicios de Google. Datos tratados por Google, posiblemente fuera de Quebec.',
      extTitle: 'Contenido externo (Google Maps, Instagram)',
      extDesc: 'Muestra el mapa interactivo y nuestro feed de Instagram. Estos servicios pueden instalar sus propias cookies.',
      mapMsg: 'El mapa de Google está oculto hasta que acepte el contenido externo.',
      igMsg: 'Nuestras publicaciones de Instagram están ocultas hasta que acepte el contenido externo.',
      show: 'Mostrar (esta vez)',
      always: 'Mostrar siempre'
    }
  };

  // ── Utilitaires ─────────────────────────────────────────────
  function lang() {
    var l = (document.documentElement.getAttribute('lang') || 'fr').slice(0, 2).toLowerCase();
    return TXT[l] ? l : 'fr';
  }
  function t(k) { return TXT[lang()][k]; }

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!c || c.v !== VERSION || !c.ts || Date.now() - c.ts > MAX_AGE) return null;
      return { ads: !!c.ads, ext: !!c.ext };
    } catch (e) { return null; }
  }
  function write(c) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, ads: !!c.ads, ext: !!c.ext, ts: Date.now() })); } catch (e) {}
  }

  var state = read();          // null = pas encore de choix
  var extThisVisit = false;    // « Afficher (cette fois-ci) »

  // ── Google Ads (chargé seulement après consentement) ────────
  var gtagLoaded = false;
  function loadAds() {
    if (gtagLoaded || !CONFIG.ADS_ID) return;
    gtagLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted',
      analytics_storage: 'denied', functionality_storage: 'denied', personalization_storage: 'denied',
      security_storage: 'granted'
    });
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.ADS_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.ADS_ID);
    document.head.appendChild(s);
  }
  function revokeAds() {
    // Retrait du consentement : on avise la balise (si chargée) et on recharge pour la retirer de la page.
    if (gtagLoaded && window.gtag) {
      window.gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    }
    return gtagLoaded;
  }
  function trackConversion(kind) {
    if (!gtagLoaded || !window.gtag || !CONFIG.LABELS[kind]) return;
    window.gtag('event', 'conversion', { send_to: CONFIG.ADS_ID + '/' + CONFIG.LABELS[kind], transport_type: 'beacon' });
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (/libroreserve\.com/i.test(h)) trackConversion('reserve');
    else if (/order-online\.ai/i.test(h)) trackConversion('order');
    else if (/^tel:/i.test(h)) trackConversion('call');
  }, true);

  // ── Contenus externes ───────────────────────────────────────
  var beholdLoaded = false;
  var extLoaded = false;
  function loadExternal() {
    extLoaded = true;
    document.querySelectorAll('iframe[data-consent-src]').forEach(function (f) {
      f.src = f.getAttribute('data-consent-src');
      f.removeAttribute('data-consent-src');
    });
    if (!beholdLoaded && document.querySelector('behold-widget')) {
      beholdLoaded = true;
      var s = document.createElement('script');
      s.type = 'module';
      s.src = 'https://w.behold.so/widget.js';
      document.head.appendChild(s);
    }
    document.querySelectorAll('.consent-ph').forEach(function (p) { p.remove(); });
  }
  function addPlaceholders() {
    if (state && state.ext) return;
    document.querySelectorAll('iframe[data-consent-src]').forEach(function (f) {
      placeholder(f, 'mapMsg');
    });
    var bw = document.querySelector('behold-widget');
    if (bw) placeholder(bw, 'igMsg');
  }
  function placeholder(target, msgKey) {
    if (target.previousElementSibling && target.previousElementSibling.classList.contains('consent-ph')) return;
    var p = document.createElement('div');
    p.className = 'consent-ph';
    p.setAttribute('data-msg', msgKey);
    p.innerHTML = '<p class="consent-ph__msg"></p><div class="consent-ph__btns">' +
      '<button type="button" class="consent-btn consent-btn--ghost" data-act="once"></button>' +
      '<button type="button" class="consent-btn" data-act="always"></button></div>';
    p.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-act]');
      if (!b) return;
      if (b.getAttribute('data-act') === 'always') {
        state = { ads: state ? state.ads : false, ext: true };
        write(state);
        if (banner) hideBanner();
      } else {
        extThisVisit = true;
      }
      loadExternal();
    });
    target.parentNode.insertBefore(p, target);
    labelPlaceholder(p);
  }
  function labelPlaceholder(p) {
    p.querySelector('.consent-ph__msg').textContent = t(p.getAttribute('data-msg'));
    p.querySelector('[data-act="once"]').textContent = t('show');
    p.querySelector('[data-act="always"]').textContent = t('always');
  }

  // ── Bannière ────────────────────────────────────────────────
  var banner = null;
  function buildBanner() {
    banner = document.createElement('div');
    banner.className = 'consent';
    banner.setAttribute('role', 'region');
    banner.innerHTML =
      '<div class="consent__inner">' +
        '<h2 class="consent__title" id="consent-title"></h2>' +
        '<p class="consent__body"><span data-k="body"></span> <a href="/privacy.html" data-k="policy"></a></p>' +
        '<div class="consent__panel" hidden>' +
          '<label class="consent__opt"><input type="checkbox" checked disabled/><span><strong data-k="essTitle"></strong><small data-k="essDesc"></small></span></label>' +
          '<label class="consent__opt"><input type="checkbox" name="ads"/><span><strong data-k="adsTitle"></strong><small data-k="adsDesc"></small></span></label>' +
          '<label class="consent__opt"><input type="checkbox" name="ext"/><span><strong data-k="extTitle"></strong><small data-k="extDesc"></small></span></label>' +
        '</div>' +
        '<div class="consent__btns">' +
          '<button type="button" class="consent-btn" data-act="refuse" data-k="refuse"></button>' +
          '<button type="button" class="consent-btn consent-btn--ghost" data-act="custom" data-k="custom"></button>' +
          '<button type="button" class="consent-btn consent-btn--ghost" data-act="save" data-k="save" hidden></button>' +
          '<button type="button" class="consent-btn" data-act="accept" data-k="accept"></button>' +
        '</div>' +
      '</div>';
    banner.setAttribute('aria-labelledby', 'consent-title');
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'accept') decide({ ads: true, ext: true });
      else if (act === 'refuse') decide({ ads: false, ext: false });
      else if (act === 'custom') openPanel();
      else if (act === 'save') decide({
        ads: banner.querySelector('input[name="ads"]').checked,
        ext: banner.querySelector('input[name="ext"]').checked
      });
    });
    document.body.appendChild(banner);
    labelBanner();
  }
  function labelBanner() {
    if (!banner) return;
    banner.querySelector('#consent-title').textContent = t('title');
    banner.querySelectorAll('[data-k]').forEach(function (el) { el.textContent = t(el.getAttribute('data-k')); });
  }
  function openPanel() {
    banner.querySelector('.consent__panel').hidden = false;
    banner.querySelector('[data-act="custom"]').hidden = true;
    banner.querySelector('[data-act="save"]').hidden = false;
    banner.querySelector('input[name="ads"]').checked = !!(state && state.ads);
    banner.querySelector('input[name="ext"]').checked = !!(state && state.ext);
    banner.querySelector('input[name="ads"]').focus();
  }
  function showBanner(withPanel) {
    if (!banner) buildBanner();
    banner.hidden = false;
    document.documentElement.classList.add('consent-open');
    if (withPanel) openPanel();
  }
  function hideBanner() {
    if (!banner) return;
    banner.hidden = true;
    document.documentElement.classList.remove('consent-open');
    var p = banner.querySelector('.consent__panel');
    p.hidden = true;
    banner.querySelector('[data-act="custom"]').hidden = false;
    banner.querySelector('[data-act="save"]').hidden = true;
  }

  function decide(c) {
    var hadAds = !!(state && state.ads);
    state = { ads: !!c.ads, ext: !!c.ext };
    write(state);
    hideBanner();
    apply();
    // Consentement retiré après avoir été donné : recharger pour retirer les scripts tiers déjà chargés.
    if ((hadAds && !state.ads && revokeAds()) || (!state.ext && extLoaded && !extThisVisit)) {
      location.reload();
    }
  }

  function apply() {
    if (state && state.ads) loadAds();
    if ((state && state.ext) || extThisVisit) loadExternal();
    else addPlaceholders();
  }

  // ── Démarrage ───────────────────────────────────────────────
  function whenLangGateClosed(cb) {
    var root = document.documentElement;
    if (!root.classList.contains('lang-gate-on')) return cb();
    var mo = new MutationObserver(function () {
      if (!root.classList.contains('lang-gate-on')) { mo.disconnect(); cb(); }
    });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
  }

  function init() {
    apply();
    document.addEventListener('click', function (e) {
      var o = e.target.closest && e.target.closest('[data-consent-open]');
      if (!o) return;
      e.preventDefault();
      showBanner(true);
    });
    if (!state) whenLangGateClosed(function () { showBanner(false); });
  }

  // API minimale (ex. : la page Confidentialité change de langue sans recharger)
  window.BochicaConsent = {
    relabel: function () {
      labelBanner();
      document.querySelectorAll('.consent-ph').forEach(labelPlaceholder);
    },
    open: function () { showBanner(true); },
    get: function () { return state ? { ads: state.ads, ext: state.ext } : null; }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
