# 📋 CONTEXTE — Site Web Bochica

> 🆕 **5 octobre 2026 — Loi 25 + Google Ads** : bannière de consentement (`js/consent.js`), Google Ads (AW-16766092846) chargé **seulement après consentement**, carte Google et Instagram bloqués jusqu'au consentement, politique de confidentialité FR/EN/ES mise à jour, CSP élargie. Voir le CHANGELOG.
>
> **1er octobre 2026 — SEO** : nom officiel « Bochica Restaurant Colombien », code postal **G1K 1K8**, pages **/en/** et **/es/** générées par `tools/build_lang.py`, FAQ visible. Voir `AUDIT_SEO_2026-10.md` et le CHANGELOG.
>
> ⚠️ **Mise à jour majeure précédente : 26 avril 2026 (soir)** — gros audit + fixes : `vercel.json` créé avec headers de sécurité, sitemap.xml corrigé (16 `.jpg`→`.png` + sections actuelles), color-scheme aligné, modale plat avec `role=dialog`, skip link, focus-visible global, contrastes WCAG, section "Suivez-nous" avec widget Behold, 15 photos de plats wirées + recadrées, badges régime en pills colorés sous le nom du plat.
> Voir `AUDIT_DESIGN.md` pour l'ancien rapport d'audit et `CHANGELOG` en fin de document pour l'historique des changements.

## 🏠 Description
Site vitrine trilingue (FR/EN/ES) pour le **restaurant colombien Bochica** à Québec.
Déployé sur **Vercel** via **GitHub** (100% web, aucune installation locale).
Exportable vers **GoDaddy** (hébergement final) — fichiers statiques HTML/CSS/JS.

## 🔗 Liens
- GitHub : https://github.com/bochicacafebistro-hash/bochica-website
- Vercel : déploiement automatique à chaque commit
- Site actuel : https://bochicacafebistro.ca/
- Commande en ligne : https://bochica.order-online.ai/
- Réservations : https://widgets.libroreserve.com/WEB/QC017664192446445AC/book

## 🍽️ Infos du restaurant
- **Nom officiel** (confirmé par le propriétaire, 1er oct. 2026) : **Bochica Restaurant Colombien** — à utiliser PARTOUT (site, fiche Google, annuaires). « Bochica Café Bistro » = ancien nom / nom du domaine et de la page Facebook (gardé seulement en `alternateName` et dans la politique de confidentialité)
- **Adresse** : 430 Rue Saint-Vallier Ouest, Québec (Québec) **G1K 1K8**, Canada — quartier **Saint-Sauveur** (pas Saint-Roch)
- **Coordonnées GPS** (celles de la fiche Google) : 46.811622, -71.239785
- **Fiche Google** : place_id `ChIJmYzJQnqXuEwRTWtbmpZ_2zA` → https://www.google.com/maps/place/?q=place_id:ChIJmYzJQnqXuEwRTWtbmpZ_2zA · lien pour laisser un avis : https://search.google.com/local/writereview?placeid=ChIJmYzJQnqXuEwRTWtbmpZ_2zA
- **TripAdvisor** : https://www.tripadvisor.ca/Restaurant_Review-g155033-d33771823-Reviews-Bochica_cafe_bistro-Quebec_City_Quebec.html
- **La Tiendita** (épicerie) : **n'existe plus** (ne pas la mentionner)
- **Téléphone** : 367-330-8220
- **Courriel** : bochicacafebistro@gmail.com (contact principal) / info@bochicacafebistro.ca
- **Phrase d'accroche** : "Voyagez en Colombie… sans quitter le Québec!"
- **Services** : Souper (avec midi ven/sam/dim)
- **Horaires** :
  - Lundi : Fermé
  - Mardi : Fermé
  - Mercredi : 17h00 – 21h00
  - Jeudi : 17h00 – 21h00
  - Vendredi : 12h00 – 22h00
  - Samedi : 12h00 – 22h30
  - Dimanche : 12h00 – 20h30
- **Réseaux sociaux** :
  - Instagram : https://www.instagram.com/bochica_restaurantcol/
  - Facebook : https://www.facebook.com/61567223975718
  - Handle : @bochicaQC

## 🎨 Design — Direction "Brasserie crème papier" (depuis avril 2026)

> **⚠️ Important** : la direction "brasserie" (typo Bebas Neue + accent jaune impact + énergie sports-bar) est conservée, mais la **palette a été inversée** en cours de route. Le site n'est plus sur fond noir comme prévu initialement par la maquette `design_handoff_bochica_brasserie/` — il est maintenant sur **fond crème papier `#f5f1e8`** avec texte noir chaud. Le bundle de handoff reste comme **référence visuelle** mais ne reflète plus l'état du site.

- **Style** : Brasserie chaleureuse — fond crème papier sur toute la page, texte noir chaud, accents jaune impact, typographie condensée Bebas Neue
- **Fond `body`** : `var(--bg)` + texture (radial-gradient subtil + bruit SVG fixed généré inline) pour donner l'effet "papier"
- **`color-scheme`** : `light` déclaré dans `:root` du CSS
  - ⚠️ **Incohérence à corriger** : `<meta name="color-scheme" content="dark"/>` dans `<head>` (ligne 6) — devrait être `light` pour matcher le CSS et empêcher les navigateurs d'inverser à nouveau le rendu
- **Palette CSS** (variables dans `:root` de `style.css`, lignes 8-90) :
  - **Fonds crème** : `--bg:#f5f1e8` (crème papier, fond principal) · `--bg-2:#ede3d2` (sections alternées) · `--bg-3:#e5d9c4` (tertiaire) · `--cream:#f5f1e8` · `--cream-2:#efe7d5`
  - **Texte foncé** : `--ink:#0e0d0c` · `--text:#0e0d0c` · `--text2:rgba(14,13,12,.72)` · `--text3:rgba(14,13,12,.5)` · `--text-on-cream:#0e0d0c` · `--text-on-cream-2:rgba(14,13,12,.7)` · `--black:#0e0d0c`
  - **Accent principal** : `--accent:#F7B32C` (jaune impact, légèrement plus chaud que le `#f7c81e` de la maquette) · `--accent-hover:#E09E1E` · `--accent-soft:#fef2d4` · `--accent-text:#0e0d0c` · `--accent-warm:#8a6a1a` (eyebrows sur fond crème)
  - **Tricolore Colombie** (conservé pour petits accents) : `--yellow:#F7B32C` · `--blue:#4a90e2` · `--red:#e74c3c`
  - **États** : `--status-open:#7dbf66` · `--status-closed:#d9534f`
  - **Bordures** : `--border-dark:rgba(14,13,12,.1)` · `--border-dark-strong:rgba(14,13,12,.25)` · `--border-light:rgba(245,241,232,.08)` · `--border-light-strong:rgba(245,241,232,.15)`
- **Typographie** :
  - `--font-display` / `--font-heading` : **Bebas Neue** (condensée, majuscules, pour H1/H2/titres cartes)
  - `--font-body` : **Inter** (sans-serif moderne, weights 300-800)
  - `--font-mono` : **JetBrains Mono** (kickers/labels techniques)
- **Échelle typographique** : `--fs-xs` (11) → `--fs-sm` (13) → `--fs-base` (14) → `--fs-md` (16) → `--fs-lg` (18) → `--fs-xl` (22) → `--fs-2xl` (28) → `--fs-3xl` (36) → `--fs-hero` (clamp 48→96px)
- **Espacement** (échelle 4/8) : `--sp-1` (4) → `--sp-2` (8) → `--sp-3` (12) → `--sp-4` (16) → `--sp-5` (20) → `--sp-6` (24) → `--sp-7` (32) → `--sp-8` (48) → `--sp-9` (64) → `--sp-10` (80). Padding global `--pad: 40px` desktop / 20px mobile, `--gap: 28px`
- **Border-radius** : `--radius-xs` (2) → `--radius-sm` (3) → `--radius-md` (6) → `--radius-lg` (8) → `--radius-xl` (16) → `--radius-pill` (100px) → `--radius-full` (50%)
- **Ombres** : `--shadow-sm/md/lg`
- **Transitions** : `--transition-fast` (.15s) · `--transition-base` (.25s) · `--transition-slow` (.35s)

## 🖼️ Logos & Images
Tous les fichiers sont dans le dossier `images/`.

**Logos en usage :**
- `images/Logo Bochica 2026-8.png` (40 KB, RGBA transparent) — **placeholder par défaut des cartes menu** et image de la modale plat
- `images/Logo Bochica 2026-3.png` — **preload prioritaire** dans le HTML, footer texte, schema.org

**Images de promos (section "Promos & activités")** — format carré ~1254×1254, fournies par l'utilisateur (design pro, pas générées par Claude) :
- `images/promo-mercredi.png` — Les Mercredis empanadas (bœuf, poulet ou lechona), 2,25 $
- `images/promo-jeudi.png` — Les Jeudis bières 2×1 sur toutes les bières (canettes ALPHA + Club Bochica)
- `images/promo-vendredi.png` — Les Vendredis bière Club Bochica à 5 $ à l'achat de tout repas ou bol
- ⚠️ Anciennes images `bochica_{mercredi,jeudi,vendredi}_creme_1080x1080.png` **orphelines** (plus référencées dans `index.html`) — à supprimer manuellement (le sandbox ne peut pas supprimer de fichiers)

**Vidéo hero (NOUVEAU)** — le hero est maintenant une `<video autoplay muted loop playsinline>` :
- Source primaire : `videos/hero.mp4` (à uploader)
- Source de secours : URL Pexels `https://videos.pexels.com/video-files/3940084/3940084-hd_1920_1080_30fps.mp4`
- Poster fallback : `images/Logo Bochica 2026-3.png`

**Photos de plats uploadées (26 avril 2026)** — toutes en PNG, auto-recadrées (cadre crème intégré supprimé), 1080×1080, format référencé par `data-photo` dans les cartes menu :
- `bandeja-medellin.png` — Bol Medellín (sert aussi pour Open Graph + Twitter card + carte signature)
- `bol-bogota.png` — Bol Bogotá
- `bol-cali.png` — Bol Cali
- `arepa-classique.png` — utilisée pour les 3 arepas (Végétarienne, Classique, Mixte)
- `bochica-burger.png` — Bochica Burger
- `canastica.png` — Canastica (2x)
- `churrasco.png` — Churrasco
- `guacamole-chips.png` — Guacamole avec chips maison
- `hot-dog-colombien.png` — Hot-Dog Colombien
- `patacones-de-la-casa.png` — Patacones de la Casa (3x)
- `patacon-montanero.png` — Patacon Montanero
- `picada.png` — Picada
- `picadita.png` — Picadita
- `pollo-asado.png` — Pollo Asado
- `salchipapas.png` — Salchipapas
- Backup des originaux (avec cadre crème) dans `images/_backup_avant_crop/`

**À uploader (encore manquants) :**
- `videos/hero.mp4` — vidéo locale d'ambiance Colombie/restaurant *(le fallback Pexels est actif en attendant)*
- `images/about.jpg` — section Notre histoire (placeholder `.ph-ambient` actif)
- Photos de plats encore manquantes (placeholder logo Bochica par défaut) : `yuca-frita`, `suprema`

**Fichiers orphelins à supprimer manuellement :**
- `paracones de la casa.png` (1.5 MB, faute de frappe "paracones"→"patacones", à la racine)
- `.DS_Store` (racine + `images/`) — fichiers macOS
- `images/test` (fichier résiduel 8 octets)
- `preview-ambiances.html` (fichier de dev 21 KB)
- `preview-backgrounds.html` (nouveau fichier de dev/preview à la racine)
- `images/Logo Bochica 2026-6 (1).png`, `Logo Bochica 2026-7.png`, `Logo Bochica 2026-7 (1).png` — non utilisés actuellement

## 🗂️ Structure des fichiers
```
bochica-website/
├── index.html          ← HTML complet (trilingue FR/EN/ES, ~1450 lignes)
├── privacy.html        ← Politique de confidentialité (Loi 25 Québec)
├── preview-backgrounds.html  ← (dev) preview des fonds — à supprimer
├── preview-ambiances.html    ← (dev) ancien preview — à supprimer
├── CONTEXTE.md         ← ce fichier
├── AUDIT_DESIGN.md     ← rapport d'audit complet (17 avril 2026)
├── sitemap.xml         ← sitemap SEO
├── robots.txt          ← directives robots
├── site.webmanifest    ← manifest PWA
├── favicon.ico         ← favicon
├── css/
│   └── style.css       ← tout le CSS
├── js/
│   └── main.js         ← tout le JavaScript (~560 lignes)
├── images/
│   ├── Logo Bochica 2026-3.png  (à optimiser, ~800 KB)
│   ├── Logo Bochica 2026-8.png  (placeholder cartes menu)
│   ├── bochica_{mercredi,jeudi,vendredi}_creme_1080x1080.png
│   ├── favicon-16/32/48.png
│   ├── apple-touch-icon.png
│   ├── icon-192.png, icon-512.png
│   └── (photos de plats à uploader)
├── videos/
│   └── hero.mp4        ← À UPLOADER (fallback Pexels en attendant)
└── design_handoff_bochica_brasserie/   ← bundle de design (référence)
    ├── Bochica Brasserie.html  ← maquette HTML hifi (3 vues SPA)
    └── README.md               ← spec complète : tokens, sections, copy, assets
```

## 📄 Sections du site (dans index.html, dans l'ordre actuel)
Toutes sont englobées dans `<main id="main">`.

1. **Nav** (`#nav`) — fixed, fond crème translucide + blur, logo texte **BOCHICA** (CA en jaune accent) + liens + FR/EN/ES + boutons Commander/Réserver + hamburger mobile
2. **Hero** (`.hero`, ligne 416) — **vidéo plein écran** (autoplay muted loop, fallback Pexels) + overlay sombre + eyebrow "Bochica · Québec" + H1 **BOCHICA** + tagline "Restaurant colombien" + 3 CTAs (Voir le menu / Commander / Réserver)
3. **Ticker jaune** (`.ticker`, ligne 442) — **NOUVEAU** : bande horizontale jaune qui défile avec phrases trilingues : *Ouvert jusqu'à 23h · Salsa le samedi · Match en direct · Happy hour 17h-19h · Cuisine colombienne* (dupliquée pour boucle infinie sans saut)
4. **Band** (`.band`, ligne 459) — barre avec statut ouvert/fermé (dynamique) + adresse + commande en ligne + téléphone (cliquable)
5. **Menu** (`#menu`, ligne 470) — 8 onglets (Entrées, Arepas, Bols, Repas, Breuvages, Cocktails, Bières, Desserts) + cartes avec photo placeholder (logo Bochica 2026-8 sur fond crème, carrées 140×140 / 110×110 mobile), cliquables → modale
6. **Story / Notre histoire** (`#about`, ligne 970) — 2 colonnes : image d'ambiance à gauche (placeholder `.ph-ambient`) + texte à droite avec H2 et highlight jaune sur le mot "restaurant"
7. **Signatures** (`#signatures`, ligne 991) — Saveurs de Colombie : section avec carrousel + flèches, cartes 4:5 avec overlay
8. **Promos & activités** (`#evenements`, ligne 1054) — H2 *"Promos & activités"* (mot "Promos" en jaune accent) — 3 cartes avec image carrée ~1254×1254 :
   - MER · Mercredi des empanadas (bœuf, poulet ou lechona) · 2,25 $ toute la journée
   - JEU · Jeudi bières 2 × 1 sur toutes les bières · toute la journée
   - VEN · Vendredi bière Club Bochica à 5 $ à l'achat de tout repas ou bol
9. ~~**Gallery** (`#gallery`)~~ — **commentée temporairement** (ligne 1107) en attente de vraies photos. Pour la réactiver : décommenter le bloc `<!-- GALLERY -->` dans `index.html`.
10. **Avis/Reviews** (`#avis`, ligne 1127) — 4 cartes avis clients + note Google
11. **Horaires & Contact** (`#horaires`, ligne 1201) — tableau horaires + infos contact + formulaire de contact
12. **Localisation** (`#localisation`, ligne 1353) — carte Google Maps + CTAs itinéraire
13. **CTA Final** (`.cta-final`, `#reservation`, ligne 1380) — fond ambiance + H2 *"Venez manger, rester, danser."* (mot "manger" en jaune) + bouton "Réserver maintenant"
14. **Footer** — logo texte BOCHICA + liens + confidentialité + réseaux sociaux (Instagram, Facebook avec SVG inline) + copyright + barre tricolore (3 divs)
15. **FAB Réserver** (`.fab-reserve`) — bouton flottant mobile uniquement
16. **Dish Modal** (`#dish-modal`) — modale détails d'un plat (carrée 1:1 avec logo Bochica 2026-8 crème en placeholder)

> 🔄 **Réordonnancement par rapport à la version précédente** : `Story/About` est maintenant **avant** `Signatures` et `Promos` (auparavant après les avis). L'ordre vise un récit : qui on est → ce qu'on fait → ce qui se passe cette semaine.

## 🍽️ Menu — Structure des onglets
- **Entrées** — Empanadas, Arepa, Sancochito, Frites, Yuca, Guacamole, Canastica, Patacones, Ailes, Picadita
- **Arepas farcies** — Végétarienne (14$), Classique (15$), Mixte (17$)
- **Bols** — Cali (20$), Bogotá (21$), Medellín (21$), Végétarien (19$)
- **Repas** — Repas enfant, Hot-Dog, Patacon Montanero, Salchipapas, Nachos, Burger, Pollo Asado, Chicharron, Churrasco, Picada, Suprema
- **Breuvages** — Boissons chaudes · Boissons froides · Jus naturels colombiens
- **Cocktails** — Mocktails (8$) · Classics (10$) · Signature (12-12.5$) · Cafés alcoolisés
- **Bières** — ALPHA + Heineken · Vins & Mousseux · Spiritueux
- **Desserts** — Gelatina, Flan Maracuyá, Brazo de Reina, Tres Leches, Cheesecake · Pains colombiens

## 🌐 Multilingue (depuis le 1er oct. 2026 : une adresse par langue)
- **3 pages** : `/` (`index.html`, FR — LA SOURCE), `/en/` (`en/index.html`), `/es/` (`es/index.html`)
- ⚠️ **`en/index.html` et `es/index.html` sont GÉNÉRÉS** par `python3 tools/build_lang.py` à partir des attributs `data-en` / `data-es` d'`index.html`. **Ne jamais les modifier à la main.** Après CHAQUE modification d'`index.html` ou de `tools/faq_data.py` → relancer le script (il met aussi à jour la FAQ et son JSON-LD dans `index.html`)
- La **FAQ** (section visible + JSON-LD FAQPage des 3 pages) vient de `tools/faq_data.py` — source unique, ne pas modifier la FAQ directement dans le HTML
- `<html data-page-lang="fr|en|es">` donne la langue de la page à `main.js` (`PAGE_LANG`)
- Boutons FR/EN/ES = vrais liens `<a class="lang-btn" href="/en/">` (Google les suit) ; au clic, `goLang()` mémorise la langue et garde la section (`#menu`…)
- Sur `/` seulement : un visiteur qui avait choisi EN/ES est renvoyé vers `/en/` ou `/es/` (script inline du `<head>`, jamais pour les robots). L'écran de choix de langue (mobile, 1re visite) n'existe que sur `/`
- Tous les chemins (images, CSS, JS, privacy) sont **absolus** (`/images/…`) pour fonctionner depuis `/en/` et `/es/` — garder cette règle
- `hreflang` fr-CA / en-CA / es / x-default dans les 3 pages + `sitemap.xml`
- `tools/` est dans `.vercelignore` (pas mis en ligne)
- Attributs HTML `data-fr`, `data-en`, `data-es` sur chaque élément à traduire
- Fonction JS `setLang(lang)` dans `main.js` — met à jour `document.documentElement.lang` (accessibilité lecteurs d'écran)
- Langue sauvegardée dans `localStorage` (clé `bochica-lang`)
- Boutons FR / EN / ES dans la nav (avec `aria-pressed` pour accessibilité)

## ✨ Fonctionnalités JS (main.js)
Fonctions présentes (~560 lignes) :
- `setLang(lang)` (ligne 4) — changement de langue + mise à jour de `<html lang>` + `aria-pressed` sur boutons
- `restoreLang()` (ligne 21) — restaure la langue depuis localStorage
- `initNav()` (ligne 27) — nav qui change au scroll + affichage du FAB mobile
- `toggleMenu()` / `closeMenu()` (lignes 46, 63) — menu hamburger mobile avec `aria-expanded`, animation X
- `initMobileMenu()` (ligne 75) — ferme menu au clic lien + clic extérieur
- `initScrollReveal()` (ligne 89) — animation apparition au scroll (respect `prefers-reduced-motion`)
- `initYear()` (ligne 102) — année copyright automatique
- `setMenuTab(tab, el)` (ligne 108) — navigation entre les onglets du menu
- `initDishCards()` (ligne 134) — initialise cartes cliquables (photos, badges GF/Végé, clavier Enter/Espace)
- `computeGFBadge(name)` (ligne 232) / `computeVegBadge(name)` (ligne 253) — calcule les badges régime selon nom du plat et règles (sections, mots-clés)
- `openDish(card)` / `closeDish(e)` (lignes 274, 352) — modale plat avec **focus trap** + restauration focus
- `trapFocusInModal(e)` (ligne 367) / `copyLangAttrs(src, dst)` (ligne 385) — utilitaires modale
- `computeStatus()` / `renderStatus()` (lignes 424, 448) — badge Ouvert/Fermé dynamique trilingue (fuseau Québec, formatHour/getQuebecDate)
- `initContactForm()` (ligne 495) — formulaire Formspree avec fallback mailto, messages trilingues

Constantes de configuration plat (lignes 117-132) : `DISH_SECTIONS_WITH_MODAL`, `EXTRAS_SECTIONS`, `GF_SECTIONS`, `NO_GF_KEYWORDS`, `OPTIONAL_GF_KEYWORDS`, `VEG_SECTIONS`, `FULL_VEG_KEYWORDS`.

## 🎨 Classes CSS importantes
- `.ticker` / `.ticker-track` / `.ticker-item` — bande défilante jaune (NOUVEAU)
- `.hero` / `.hero-img` (vidéo) / `.hero-overlay` / `.hero-content` / `.hero-eyebrow` / `.hero-h1` / `.hero-tagline` / `.hero-btns`
- `.band` / `.band-item` / `.status-item` / `.status-dot` / `.status-text`
- `.menu-tabs` / `.menu-tab` / `.menu-tab.active` — onglets du menu
- `.menu-section` — section de chaque onglet
- `.menu-card` / `.menu-card.has-photo` / `.menu-card.clickable`
- `.badge-gf`, `.badge-gf-opt`, `.badge-veg`, `.badge-veg-opt`
- `.section-eyebrow` / `.section-h2` / `.section-tag` / `.section-title` / `.ornament`
- `.story` / `.story-photo` / `.story-text` / `.story-eyebrow` / `.story-h2` (avec `.highlight` pour mot surligné jaune)
- `.signatures` / `.section-head` / `.carousel-arrows` / `.carousel-arrow`
- `.events` / `.events-grid` / `.event-card` / `.event-card__photo/img/body/kicker/title/desc/meta`
- `.reviews` / `.hours-contact` / `.location` / `.cta-final` / `.cta-final__content/eyebrow/h2/btn`
- `.ph-food` / `.ph-ambient` — placeholders visuels CSS pour photos manquantes
- `.reveal` / `.reveal.visible` — animation scroll (désactivée si prefers-reduced-motion)
- `.dish-modal` / `.dish-modal-content` / `.dish-modal-photo` / `.dish-modal-photo-ph` / `.dish-modal-photo-logo`
- `.fab-reserve` — bouton flottant mobile
- `.btn-primary` / `.btn-outline` — boutons (les anciennes conventions `.btn .btn--variant` du refactoring sont toujours dispo en alias)
- `.accent` (utilitaire texte coloré jaune) / `.highlight` (background jaune sur texte)

## ♿ Accessibilité (acquis depuis avril)
- `<main id="main">` wrap tout le contenu principal
- `document.documentElement.lang` mis à jour dynamiquement par setLang()
- Hamburger : `aria-label`, `aria-expanded`, `aria-controls="nav-links"`
- Boutons langue : `aria-label` (Français/English/Español), `aria-pressed`, `role="group"` parent
- Cartes menu cliquables : `tabindex="0"`, `role="button"`, `aria-label`, handler clavier Enter/Espace
- Modale plat : focus trap Tab/Shift+Tab, restauration du focus à la fermeture
- Ticker : `aria-hidden="true"` (décoratif)
- `:focus-visible` global avec outline accent
- Media query `prefers-reduced-motion` : désactive toutes animations (incluant le défilement du ticker à vérifier)
- Tous les liens externes `target="_blank"` ont `rel="noopener noreferrer"`
- Vidéo hero : `aria-hidden="true"` + `muted` + `playsinline` (autoplay safe iOS/Safari)

## 🔐 Conformité Loi 25 (Québec)
- `privacy.html` — politique de confidentialité complète
- Liée depuis le footer + formulaire de contact
- Consentement implicite à l'envoi du formulaire

## 📨 Formulaire de contact
- Formulaire **Formspree** branché le 27 septembre 2026 : `action="https://formspree.io/f/xwlpwygy"`
- Compte Formspree : bochicacafebistro@gmail.com — formulaire « Site Bochica — Contact »
- Les messages arrivent à bochicacafebistro@gmail.com ; « Répondre » dans Gmail répond directement au client (champ `email`)
- Champs envoyés : `nom`, `email`, `telephone`, `sujet`, `message` + `_subject` (« Nouveau message du site Bochica »), `_language`, honeypot anti-spam `_gotcha`
- Messages de confirmation/erreur trilingues dans `initContactForm()` (main.js). Le code de repli `mailto:` reste mais ne s'active plus (il ne se déclenche que si l'action contient `VOTRE_ID_FORMSPREE`)
- ⚠️ Au premier message reçu, Formspree peut demander d'**activer** le formulaire par courriel. Vérifier les indésirables
- Plan gratuit Formspree : nombre de messages par mois limité — suffisant pour un restaurant

## 🚀 Workflow (depuis 19 avril 2026 — simplifié)
**Tout va directement sur `main`. Pas de branche de test/preview.**

1. Modifier les fichiers localement (via Claude / Cowork ou directement)
2. Ouvrir **GitHub Desktop**, vérifier la branche **`main`**
3. Cocher les fichiers à inclure (ignorer `.claude/` qui est dans `.gitignore`)
4. Écrire un message de commit → cliquer **Commit to main**
5. Cliquer **Push origin** (bouton en haut à droite)
6. **Vercel** redéploie automatiquement en prod (~1 min)
7. Vérifier https://bochicacafebistro.ca/

**⚠️ Note** : les credentials GitHub ne sont pas accessibles depuis le terminal de Claude — seul GitHub Desktop peut faire le push. Claude prépare les fichiers, l'utilisateur fait commit + push.

## 📐 Bundle de design `design_handoff_bochica_brasserie/`
**Référence visuelle**, pas l'état du site. Contient :
- `Bochica Brasserie.html` — maquette HTML hifi (React/Babel standalone, SPA 3 vues : Home, Menu, Événements)
- `README.md` — spec complète : tokens (palette **fond noir** original `#0e0d0c` + accent jaune `#f7c81e`), 3 routes, sections Home, échelle typographique détaillée, comportements, copy exact, assets à produire

⚠️ **Décalage avec le site actuel** : la maquette demande fond noir + texte crème ; le site implémenté a inversé en fond crème + texte noir. Si on veut revenir à la direction sombre originale, le README est la source de vérité. Pour l'instant, le site reste en mode "papier".

## ⚠️ Règles importantes
- Pour changements dans **NAV ou HERO** → donner la section CSS complète
- Pour autres changements → donner juste les lignes à modifier
- Pour changements majeurs → donner le fichier complet
- Images toujours dans `images/` avec chemin `src="images/nom-fichier"`
- Toujours utiliser les variables CSS `var(--accent)` etc. plutôt que d'hardcoder les couleurs
- **Pour le texte jaune sur fond crème** : toujours utiliser `var(--accent-warm)` (`#785a14` depuis sept. 2026, ratio WCAG AA OK), JAMAIS `var(--accent)` (`#F7B32C`, contraste insuffisant). `--accent` est réservé aux fonds remplis (boutons jaunes), aux dots/étoiles décoratives, ou au texte sur fond foncé.
- **Ne pas faire confiance aux deux dossiers `.claude/worktrees/`** (kind-kapitsa, elegant-hopper) : ce sont des copies de travail Claude, ignorées par git, pas la source de vérité
- **Cache-busting CSS/JS OBLIGATOIRE** : `index.html` (+ `en/`, `es/` générés) et `privacy.html` chargent `/css/style.css?v=20261001a` et `/js/main.js?v=20261001a` (paramètre de version dans l'URL). À CHAQUE modification de `style.css` ou `main.js`, il faut incrémenter ce `?v=...` (ex. date du jour, ou un numéro qui monte) sur TOUTES les balises `<link>`/`<script>` qui les chargent — sinon les visiteurs qui ont déjà mis le site en cache ne verront jamais le changement, même après un déploiement réussi (`/css/* /js/*` ont un cache de 5 min mais ancré à l'URL exacte). Voir changelog du 13 septembre pour le détail du bug que ça corrige.

## 📸 WORKFLOW PHOTOS DE PLATS — procédure standard

**Quand l'utilisateur uploade une nouvelle photo de plat, voici la marche à suivre OBLIGATOIRE :**

1. **Identifier le plat** depuis la photo (ingrédients visibles) et matcher avec un nom existant dans le menu (`index.html` cherche `data-photo`)
2. **Renommer le fichier** pour matcher exactement le `data-photo` attendu (ex: `data-photo="images/bol-cali.png"` → fichier `bol-cali.png`, sans espaces, avec tirets)
3. **Auto-recadrer** pour enlever le cadre crème intégré (les photos générées par AI ont souvent ~110-190px de marge crème uniforme `rgb(244,241,231)` autour du sujet) — utiliser le script Python avec PIL :
   ```python
   # Détecter bbox du contenu non-crème, recropper en carré centré, redimensionner à 1080×1080
   ```
   Backup l'original dans `images/_backup_avant_crop/`
4. **Compresser en WebP qualité 82** (PIL ou cwebp) → cible **<200 KB par photo**. Garder l'extension PNG pour le fichier final SI le user n'a pas encore validé le workflow WebP, sinon convertir et adapter le HTML.
5. **Mettre à jour le HTML** :
   - Vérifier que `data-photo="images/<nom>.png"` (ou `.webp`) pointe au bon fichier
   - Mettre à jour le bloc Schema.org JSON-LD `Menu` (`index.html` ligne ~210-260) avec la nouvelle URL
   - Si c'est `bandeja-medellin` : mettre à jour aussi Open Graph + Twitter Card + `Restaurant.image` (lignes ~60, 81, 95)
6. **Mettre à jour `sitemap.xml`** avec la nouvelle URL d'image et `<lastmod>` à jour
7. **Documenter dans CONTEXTE.md CHANGELOG** quels plats ont été ajoutés/recadrés

**Plats encore manquants (placeholder logo affiché en attendant)** : `yuca-frita`, `suprema`

## 🔐 Headers de sécurité (vercel.json)
Configurés dans `vercel.json` à la racine :
- **HSTS** : `max-age=63072000; includeSubDomains; preload`
- **X-Content-Type-Options** : `nosniff`
- **X-Frame-Options** : `SAMEORIGIN`
- **Referrer-Policy** : `strict-origin-when-cross-origin`
- **Permissions-Policy** : géolocalisation/micro/caméra/paiement bloqués
- **CSP** : whitelist explicite (Behold, Pexels, Google Fonts, Maps, Formspree, LibroReserve, Order Online)
- **Cache-Control** sur `/images/*` : `max-age=31536000, immutable`. Sur `/css/* /js/*` : `max-age=300, must-revalidate` (voir changelog du 13 septembre — l'immutable 1 an empêchait les visiteurs récurrents de voir les mises à jour CSS/JS)
- ⚠️ La CSP utilise `'unsafe-inline'` pour scripts/styles (nécessaire pour les onclick et les `<style>` inline du `privacy.html`). À durcir plus tard via nonces si besoin (Vercel-specific).

## 📝 CHANGELOG

### 5 octobre 2026 — Loi 25 : témoins et consentement + mesure Google Ads
- **`js/consent.js`** (nouveau) : bannière « Tout refuser / Personnaliser / Tout accepter » (FR/EN/ES), 3 catégories : Essentiels (toujours), Mesure publicitaire Google Ads, Contenus externes (Google Maps + Instagram/Behold). Choix gardé 12 mois (clé `bochica-consent`), lien « Gérer les témoins » (`data-consent-open`) dans le pied de page.
- **Google Ads** : balise `gtag.js` chargée SEULEMENT après consentement, Consent Mode v2 (analytics toujours refusé). Conversions envoyées au clic : `reserve` (liens LibroReserve), `order` (liens order-online.ai), `call` (liens `tel:`). Réglages en haut de `consent.js` (`CONFIG`) : ID `AW-16766092846`, étiquettes « Clic Réserver (Libro) », « Clic Commander en ligne » et « Clic telephone (site Web) » remplies (étiquettes : Objectifs → Conversions → l'action → Gérer → Utiliser Google Tag Manager).
- **Carte Google** : `<iframe data-consent-src=…>` (plus de `src` direct) ; **Behold** : script retiré du `<head>`, chargé par `consent.js`. Espace réservé avec « Afficher (cette fois-ci) » / « Toujours afficher ».
- **`privacy.html`** : sections 4 (témoins et consentement, `id="temoins"`), 5 (services tiers, avec mention « seulement avec votre consentement »), 6 (partage), 7 nouvelle (communication hors Québec) ; renumérotation 8-11 ; FR/EN/ES.
- **`vercel.json`** : CSP — ajout de googletagmanager, googleadservices, doubleclick, pagead2, google.com/.ca.
- **`css/style.css`** : styles `.consent-*` (bannière, panneau, espaces réservés).
- EFVP (évaluation des facteurs relatifs à la vie privée) rédigée à part (document interne, non publié).
- **Vercel Web Analytics** (activé le 5 oct., plan Hobby gratuit, 50 000 événements/mois) : `<script defer src="/_vercel/insights/script.js">` après `consent.js` dans `index.html` et `privacy.html` (EN/ES via `build_lang.py`). Sans témoins → pas dans la bannière ; mentionné dans `privacy.html` sections 4 et 5 (FR/EN/ES). Tableau de bord : Vercel → bochica-web → Analytics.
- `consent.js` : étiquette de conversion `call` ajoutée ; version de cache `?v=20261005a`.
- ⚠️ Après toute modification de `index.html` : relancer `python3 tools/build_lang.py` (EN/ES).

### 1er octobre 2026 — SEO : nom officiel, code postal, pages EN/ES, FAQ visible (voir `AUDIT_SEO_2026-10.md`)
- **Nom officiel** « Bochica Restaurant Colombien » : `<title>`, `og:site_name`, `author`, JSON-LD `name` (anciens noms en `alternateName`), titres de `privacy.html`
- **Code postal G1K 1K8** (était G1K 1K7) : JSON-LD, Open Graph, `privacy.html` ×3, adresse visible (contact + « Nous trouver »)
- **Coordonnées GPS** alignées sur la fiche Google (46.811622, -71.239785 — l'ancienne position était ~800 m à l'est)
- « Quartier **Saint-Roch** » → « **Saint-Sauveur** » (section Nous trouver, FR/EN/ES)
- Titre : « Bochica Restaurant Colombien · Cuisine latino à Québec » (54 car.) ; meta description 152 car. avec « latino »
- Sous-titre du menu (visible sur mobile) : « Cuisine colombienne et latino à Québec… La plupart de nos plats sont sans gluten. »
- Carte « Medellín » → « Medellín · bandeja paisa » ; nouveau paragraphe « Notre histoire » (nom muisca, latino, sans gluten, service trilingue)
- **FAQ visible** (10 questions, `<details>`) entre Avis et Horaires + lien FAQ dans le pied de page ; JSON-LD FAQPage régénéré (FR/EN/ES) depuis `tools/faq_data.py`
- **Pages `/en/` et `/es/`** générées (`tools/build_lang.py`), `hreflang` ×4, sitemap avec 3 URL + alternates
- JSON-LD : `acceptsReservations: true`, `knowsLanguage`, cuisines EN, `hasMap` + `sameAs` (fiche Google, TripAdvisor, RestoQuébec)
- Bouton « Lire tous les avis sur Google » → lien direct vers la fiche (place_id)
- Écran de langue : titre `<h2>` → `<p>` (n'arrive plus avant le H1)
- `vercel.json` : redirections `/en`→`/en/`, `/es`→`/es/`, `/index.html`→`/`, et `bochica-web.vercel.app` → `bochicacafebistro.ca`
- `main.js` : `PAGE_LANG`, `goLang()`, `initLangLinks()`, chemins d'images absolus
- Cache-busting : `style.css?v=20261001a`, `main.js?v=20261001a`
- Testé (Chromium) : FR/EN/ES ordinateur + mobile 390/320 px, écran de langue, redirection selon la langue mémorisée, modale, statut ouvert/fermé, aucun débordement, aucune erreur JS
- ⚠️ **Sous-domaine `www`** : le DNS pointe vers Vercel mais `www.bochicacafebistro.ca` n'est pas ajouté au projet `bochica-web` → à ajouter dans Vercel → Settings → Domains (redirection 308 vers `bochicacafebistro.ca`). Le connecteur Vercel de Claude n'a pas le droit de modifier le projet
- **Fiche Google** (1er oct., soir) : code postal → G1K 1K8 ; catégories → principale « Restaurant colombien » + « Restaurant latino-américain », « Restaurant sud-américain » (en examen chez Google)
- **Vercel** : `www.bochicacafebistro.ca` ajouté au projet `bochica-web`, redirection 308 → `bochicacafebistro.ca` ✅
- **Google Search Console** : propriété `https://bochicacafebistro.ca/` créée (compte Google de la fiche). Fichier de validation **`googlea4f124349b777744.html`** à la racine — ⚠️ NE JAMAIS LE SUPPRIMER (Google retire l'accès sinon)
- **Bing Webmaster Tools** : site ajouté (compte Microsoft connecté via Google, bochicacafebistro@gmail.com). Fichier de validation **`BingSiteAuth.xml`** à la racine — ⚠️ NE PAS SUPPRIMER non plus
- ⚠️ Le projet Vercel `bochica-v2` est un AUTRE projet (pas le site). Seul `bochica-web` sert bochicacafebistro.ca

### 27 septembre 2026 (i) — Formulaire de contact branché (Formspree)
- `VOTRE_ID_FORMSPREE` → **`xwlpwygy`** ; champ caché `_replyto` vide retiré (Formspree utilise le champ `email` comme adresse de réponse)
- Testé (réponse Formspree simulée) : envoi POST direct, plus d'ouverture de l'app courriel, message de succès FR/EN, formulaire vidé

### 27 septembre 2026 (h) — Nouveau hero « mosaïque de plats » (option B), vidéo retirée
- **Ordinateur/tablette (≥ 761 px)** : fond crème ; à gauche eyebrow « Restaurant colombien · Saint-Sauveur, Québec », H1 « Voyagez en **Colombie** sans quitter le Québec » (surlignage jaune), texte d'intro, boutons Voir le menu / Commander / Réserver, **badge Ouvert/Fermé** ; à droite mosaïque 2×2 décalée : Bol Medellín, Bol Bogotá, Empanadas, Picada. Tout traduit FR/EN/ES
- **Mobile** : inchangé (arrivée directe sur « Notre menu »). Les 4 photos de la mosaïque ne sont **pas téléchargées** sur mobile (`<source media="(min-width: 761px)">` + GIF transparent 1 px en `src`)
- H1 complet pour Google : « Bochica, restaurant colombien à Québec — Voyagez en Colombie… » (1re partie en `.visually-hidden`)
- **Barre d'info `.band` supprimée du HTML** : le badge Ouvert/Fermé (`#status-pill`, `#status-text`) est maintenant dans le hero ; l'adresse est dans le texte d'intro
- **Vidéo Pexels retirée partout** : `<video>`, `initHeroVideo()` (main.js), `dns-prefetch`, CSP `media-src` (vercel.json → `'self'`), mention dans `privacy.html` (FR/EN/ES, date de mise à jour → 27 septembre 2026)
- CSS : bloc « HERO — option B » en fin de `style.css` (remplace le bloc « HERO MOBILE ») ; ancienne règle reduced-motion du hero retirée
- Pour changer une photo de la mosaïque : modifier le `srcset` de la `<source>` dans `index.html` (section HERO)
- Cache-busting : `style.css?v=20260927j`, `main.js?v=20260927e`

### 27 septembre 2026 (g) — Mobile : arrivée directe sur « Notre menu »
- Sur mobile (≤ 760 px), la barre d'info `.band` (ouvert/fermé, adresse, commande, téléphone) est aussi masquée → sous la nav, on voit directement « Notre menu » (padding du haut de `#menu` réduit à 24 px)
- Ces infos restent dans la section « Horaires & contact » et le menu hamburger. Sur ordinateur : rien ne change
- Cache-busting : `style.css?v=20260927i`

### 27 septembre 2026 (f) — Corrections de l'audit complet (voir `AUDIT_2026-09.md`)
**Sécurité / fichiers publics**
- Supprimés : `images/aguardiente Antioqueño.html` + dossier `_files/` (page de boutique téléchargée par erreur, en ligne depuis le 26 avril), `zi5Ybtie` (doublon du zip), `images/test`, aperçus `Claude outputs/`, anciennes promos `bochica_*_creme_1080x1080.png`, `heineken-00-preview.png`
- Nouveau **`.vercelignore`** : `*.md`, `images/_backup_avant_crop/`, `images/_originaux/`, `branding/`, `design_handoff…/`, `*.zip`, `Claude outputs/` restent dans GitHub mais **ne sont plus mis en ligne**. ⚠️ Vérifier après déploiement que https://bochicacafebistro.ca/CONTEXTE.md donne 404
- `.gitignore` : ajout de `Claude outputs/`

**Photos**
- 22 plats PNG → **WebP 800 px** (q80) et 3 promos → **WebP 1000 px** (q85) : **28,4 Mo → 1,4 Mo**. HTML, données Google (JSON-LD) et sitemap mis à jour
- 64 fichiers non utilisés (originaux PNG, doublons avec espaces, anciens logos) **déplacés** dans `images/_originaux/` (pas supprimés, non déployés)
- Dossier `images/` en ligne : ~45 Mo → **3,8 Mo**
- Nouvelle image de partage **`images/og-bochica.jpg`** 1200×630 (logo + Bol Medellín, 81 Ko) pour Facebook/WhatsApp/iMessage
- Guacamole : `data-photo` retiré (fichier inexistant) → logo par défaut, plus d'erreur 404
- ⚠️ **Règle** : les images sont en cache 1 an (`immutable`). Pour remplacer une photo, **toujours lui donner un nouveau nom** (ex. `picada-v2.webp`)

**Hero (bannière du haut)**
- **Mobile (≤ 760 px)** : plus de vidéo, plus d'image, plus de boutons → la page commence directement par la barre d'info puis le menu. Le H1 reste lisible par Google/lecteurs d'écran (`.hero-content` visuellement masqué)
- **Ordinateur** : la vidéo Pexels est ajoutée par `initHeroVideo()` (main.js) seulement si écran ≥ 761 px, pas de « reduced motion », pas de mode économie de données → **jamais téléchargée sur mobile**. Source dans `data-src` de la `<video>`
- Retirés : `<source videos/hero.mp4>` (404) et le poster `Logo Bochica 2026-3.png` (783 Ko). Fond noir pendant le chargement
- H1 : « BOCHICA » + `<span class="visually-hidden">— restaurant colombien à Québec</span>` (traduit)

**Accessibilité / contrastes (axe-core : 0 violation WCAG AA)**
- `--accent-warm` : `#8a6a1a` → **`#785a14`** (≥ 4,6:1 sur les 3 crèmes)
- **Prix en noir** (`--ink`) : cartes, modale, extras
- Bloc « CONTRASTES » en fin de `style.css` : tous les textes jaunes sur crème → `--accent-warm` (eyebrows, titres de sous-sections, labels contact, horaires, survols). Le jaune vif reste sur fond foncé (hero, `.cta-final`) et pour les fonds de boutons
- Badges « Option végé » `#3d6622`, « Option sans gluten » `--accent-warm` ; « Fermé » des horaires lisible ; bouton Facebook `#1464cc`
- Page confidentialité : bouton « Retour » en texte noir
- Zones de toucher ≥ 44 px (FR/EN/ES, icônes réseaux) via `::after`, sans changer le visuel
- Texte alternatif des photos = nom du plat, traduit (`data-alt-*`) ; bouton flottant Réserver déplacé dans `<main>`
- Logo officiel aussi dans le **pied de page** (`.footer-logo-img`)
- 🐛 **Bug corrigé** : le point du badge Ouvert/Fermé était toujours rouge (JS ajoute `.open`, CSS attendait `.is-open`)

**SEO**
- JSON-LD : logo → `logo-bochica.png`, image `suprema.jpg` (404) → `picada-suprema.webp`, `og-bochica.jpg` ajoutée
- **Sitemap reconstruit** : `/` + `/privacy.html` seulement (plus d'URL `#…`), 60 images réelles, `lastmod` 2026-09-27
- `<html lang="fr-CA">` ; retrait des meta obsolètes (keywords, revisit-after, rating, distribution, language)
- Polices : Inter 400-700 seulement (300 et 800 retirés)
- CSS mort `.nav-logo-txt` et `.footer-logo-txt` retiré
- Cache-busting : `style.css?v=20260927g`, `main.js?v=20260927d`

**Reste à faire (toi)** : créer le compte Formspree et me donner l'ID ; photos manquantes (guacamole, desserts, latté) ; vidéo d'accueil perso (optionnel, desktop seulement)

### 27 septembre 2026 (e) — Débordement horizontal corrigé sur petits écrans (320 px)
- Cause : la section « Notre histoire » (`.story`) avait `minmax(360px, 1fr)` → 360 px de large même sur un écran de 320 px, la page glissait de côté
- Correctif : les 11 grilles `repeat(auto-fit, minmax(Npx, 1fr))` de `style.css` passent à `minmax(min(Npx, 100%), 1fr)` — une colonne ne dépasse plus jamais l'écran. Aucun changement de mise en page à 375/768/1280 px (vérifié)
- Règle à suivre : toujours écrire `minmax(min(Xpx, 100%), 1fr)` pour les nouvelles grilles
- Cache-busting : `style.css?v=20260927d`

### 27 septembre 2026 (d) — Logo officiel dans la nav (haut gauche)
- Le logo texte `BOCHI<span>CA</span>` de la nav est remplacé par le **logo officiel** `images/logo-bochica.webp` (+ `.png`) dans `index.html` **et** `privacy.html` (classe `.nav-logo-img`)
- Hauteur : 36 px desktop · 30 px ≤ 480 px · 24 px ≤ 360 px (gaps resserrés pour garder logo + FR/EN/ES + hamburger sur une ligne)
- Hauteur de la nav inchangée (65-66 px scrollée) → le `top` des onglets sticky du menu reste bon
- `alt` traduit via `data-alt-fr/en/es` (privacy.html : son `setLang` gère maintenant aussi `data-alt-*`)
- Les anciennes règles `.nav-logo-txt` restent dans le CSS sans effet — à nettoyer plus tard
- Cache-busting : `style.css?v=20260927c`

### 27 septembre 2026 (c) — Écran de choix de langue (mobile, première visite)
- Nouvel écran plein écran `#lang-gate` (début du `<body>`) : **logo officiel** (`images/logo-bochica.webp` + `.png` de secours — BOCHICA à empattements + « Restaurant Colombien » + ligne tricolore, fond blanc retiré, 1200×280), « Choisissez votre langue » (+ EN/ES), 3 gros boutons Français / English / Español
- **Affiché seulement si** : écran ≤ 760 px **ET** aucune langue mémorisée (`localStorage bochica-lang`) **ET** pas un robot (Googlebot, Lighthouse, etc.) — décidé par un petit script inline dans `<head>` qui ajoute `html.lang-gate-on` (pas de flash du site)
- Langue du téléphone suggérée (bouton jaune + focus) ; Échap = langue suggérée
- Pendant l'affichage : reste de la page `inert` + scroll bloqué ; fermeture en fondu (désactivé si reduced-motion)
- Après le choix : `setLang()` mémorise la langue → l'écran ne revient plus. On change ensuite avec FR/EN/ES dans la nav
- `initLangGate()` dans `main.js` · CSS en fin de `style.css` (section « ÉCRAN DE CHOIX DE LANGUE »)
- Pour revoir l'écran en test : navigation privée sur le téléphone
- Cache-busting : `style.css?v=20260927` (index + privacy), `main.js?v=20260927c`

### 27 septembre 2026 (b) — Audit + traductions complètes FR/EN/ES
- **Noms de menu traduits** (avaient du français en dur) : Heineken Sans alcool, Espresso Quindio (Froid), Amarula des Andes, Brugal Rhum Añejo, styles de bière ALPHA (Blanche Belge, Rousse Anglaise, Goyave & Tangerine)
- **Pied de page** : « Restaurant colombien » traduit (index + privacy)
- **Attributs accessibles traduits** : nouveau système `data-aria-{fr,en,es}`, `data-alt-{…}`, `data-title-{…}` géré par `setLang()` (aria-label, alt des 3 images promo, title de la carte Google, bouton hamburger, libellé « Voir les détails » des cartes de plats)
- **Prix localisés** : chaque prix a maintenant `data-amount="12.5"` ; `formatPrice()` affiche `12,50 $` (FR/ES) ou `$12.50` (EN). ⚠️ Pour modifier un prix : changer **`data-amount`** ET le texte FR
- **Horaires localisés** : tableau avec `data-fr/en/es` (EN « 5 pm – 9 pm », ES « 17:00 – 21:00 ») ; badge statut ES en format 24 h, EN avec espace (« 8:30 pm »)
- **privacy.html trilingue** : 3 blocs complets `data-lang-block="fr|en|es"` (un seul visible), sélecteur FR/EN/ES dans la nav, même clé `bochica-lang` que l'accueil, `<title>` traduit. Mention « la version française prévaut » en EN/ES. ⚠️ Toute modification de la politique doit être faite dans les 3 blocs
- Non traduisible : le texte intégré dans les images promo (`promo-*.png`) — le texte sous chaque image est traduit
- Testé dans Chromium mobile (390 px) en FR/EN/ES, aucune erreur JS

### 27 septembre 2026 — Nouveaux horaires samedi et dimanche
- **Samedi** : 13h00–23h00 → **12h00–22h30**
- **Dimanche** : 13h00–21h00 → **12h00–20h30**
- Mer/jeu (17h–21h) et ven (12h–22h) inchangés
- Mis à jour : tableau horaires (`index.html`), Schema.org `openingHoursSpecification`, FAQ JSON-LD, `SCHEDULE` dans `main.js` (badge Ouvert/Fermé, heures décimales 22.5/20.5)
- Cache-busting : `js/main.js?v=20260927`
- ⚠️ Penser à mettre à jour les horaires sur la fiche Google, Facebook, Instagram et LibroReserve

### 13 septembre 2026 — Bandeau ticker retiré, vrais avis Google, langue toujours visible, cache CSS/JS corrigé, onglets menu en défilement horizontal (mobile), gap sticky corrigé
**Changements demandés par le client après revue du site en ligne, + un bug de cache découvert en cours de route.**

- **Bandeau jaune défilant** (`.ticker`, entre le hero et la barre horaires) retiré du HTML et tout son CSS nettoyé (règles, keyframes, entrées reduced-motion/focus-visible)
- **Avis clients** : les 4 avis placeholder (Marie L., Jean-François T., Sofia R., Alexandre M.) remplacés par 4 vrais avis Google (Julien B., Maxence P., Ann, Christie S. — trouvés via la fiche Google du resto, 4,7★/217 avis). Note affichée corrigée de 4.8 → **4.7**. Traductions EN/ES refaites pour chaque nouvel avis.
- **Sélecteur de langue FR/EN/ES** : sorti du menu hamburger mobile, déplacé dans un groupe `.nav-left` toujours visible à côté du logo (desktop **et** mobile). Ajustement CSS `@media (max-width: 480px)` pour resserrer le pill sur très petits écrans.
- **Onglets du menu (`.menu-tabs`) rendus sticky** (`position: sticky; top: 96px`) suite à une revue de l'UX mobile : sur les catégories longues (Repas — 11 items, Bières — 8 items), la barre d'onglets sortait de l'écran en scrollant et il fallait remonter tout en haut pour changer de catégorie. Elle reste maintenant collée sous le nav. Fond `var(--bg)` + `border-bottom` ajoutés pour qu'elle ait un vrai fond opaque pendant qu'on scrolle en dessous.
- Sauvegardes locales des fichiers d'origine créées avant modification (`index.html.bak_*`, `style.css.bak_*`, hors du repo)
- ⚠️ À faire : mettre à jour `sitemap.xml` `lastmod` si souhaité
- **Bug de cache découvert et corrigé** : le client trouvait que le sélecteur de langue FR/EN/ES restait affiché sous le logo BOCHICA au lieu d'à côté, malgré le correctif `.nav-left` déployé plus tôt aujourd'hui. Diagnostic : `vercel.json` servait `css/` et `js/` avec `Cache-Control: max-age=31536000, immutable` (1 an, configuré depuis l'audit du 26 avril) — les navigateurs des visiteurs récurrents gardaient donc l'ancien `style.css` en cache et ne voyaient jamais les correctifs déployés. Confirmé en injectant le CSS fraîchement récupéré (`fetch(..., {cache:'no-store'})`) dans la page en direct : le layout `.nav-left` se corrige immédiatement une fois le bon CSS chargé. **Corrigé** : `/css/* /js/*` passent à `max-age=300, must-revalidate` (les images gardent le cache 1 an, elles changent rarement et sont renommées quand c'est le cas). Ce bug affectait TOUTES les mises à jour CSS/JS passées, pas seulement celle d'aujourd'hui — les visiteurs devaient vider leur cache ou visiter en navigation privée pour voir les changements récents.
- **Bandeau catégories du menu (`.menu-tabs`) : passage en défilement horizontal sur mobile** (`@media max-width: 760px`). Avant : les 8 pastilles de catégories s'empilaient sur 3 rangées et prenaient trop de place en haut de la section Menu. Après : nouveau wrapper `.menu-tabs-scroll` (ajouté dans `index.html`, autour des 8 `<button class="menu-tab">`) qui devient `overflow-x: auto` sur mobile — une seule ligne, `scroll-snap` pour un défilement propre, scrollbar native cachée. Un dégradé (`.menu-tabs::after`) sur le bord droit indique visuellement au client qu'il peut glisser pour voir plus de catégories. Desktop/tablette inchangés (pastilles centrées, retour à la ligne).
- **Bug visuel corrigé : bandeau transparent entre le nav et les onglets sticky.** Le `top: 96px` du sticky `.menu-tabs` (ajouté plus tôt aujourd'hui) était basé sur une mesure erronée de la hauteur du nav. En réalité le nav ne fait que **65px** une fois scrollé (`nav.scrolled`), pas 96px — ça laissait un vide de 31px sans fond entre le bas du nav et le haut des onglets, à travers lequel les photos du menu défilant en dessous étaient visibles (repéré par le client sur une capture d'écran mobile). Corrigé en changeant `top: 96px` → `top: 65px` dans `.menu-tabs`. Vérifié en direct : le nav et les onglets sont maintenant parfaitement collés, sans espace. Gain de ~31px de hauteur en prime.

### 26 août 2026 — Refonte des 3 promos hebdomadaires (mercredi/jeudi/vendredi)
**Changement de contenu des promos de la section "Promos & activités", à la demande du client.**

- **Mercredi** : inchangé — empanadas (bœuf, poulet ou lechona) à 2,25 $, toute la journée
- **Jeudi** : ~~Bol Medellín −20 %~~ → **Bières 2 pour 1 sur toutes les bières, toute la journée**
- **Vendredi** : ~~2×1 sur les bières (17h-20h)~~ → **Bière Club Bochica à 5 $ à l'achat de tout repas ou bol**
- Descriptions FR/EN/ES des 3 cartes réécrites en conséquence (`index.html` ~ligne 1107-1140), incluant l'ajout de la lechona dans la description du mercredi (déjà présente comme 3e protéine au menu depuis le 22 juillet)
- **Images** : le client a fourni ses propres visuels promo (design pro, format ~1254×1254) — `images/promo-mercredi.png`, `images/promo-jeudi.png`, `images/promo-vendredi.png` — qui remplacent les anciens `bochica_{mercredi,jeudi,vendredi}_creme_1080x1080.png` générés précédemment par Claude (rejetés par le client)
- ⚠️ Fichiers orphelins à supprimer manuellement : `images/bochica_mercredi_creme_1080x1080.png`, `images/bochica_jeudi_creme_1080x1080.png`, `images/bochica_vendredi_creme_1080x1080.png` (plus référencés)

### 22 juillet 2026 — Validation menu vs PDF officiel + corrections prix/plats
**Comparaison du menu du site vs `Menu-Nourriture.pdf` (menu imprimé officiel). Résultat : prix des sections Entrées/Arepas/Bols majoritairement alignés, 2 écarts trouvés et corrigés.**

- **Ajout** : Empanada renommée "Empanada — Poulet, bœuf ou lechona (porc)" (ajout de la lechona comme 3e protéine, prix inchangé 3,25 $) — carte menu + JSON-LD
- **Renommage + prix** : "Sancochito" → "Soupe du jour", prix 7 $ → **5,50 $** (aligné sur le PDF). La mention "Vendredi à dimanche" a été retirée (absente du PDF officiel, à valider si toujours applicable)
- **Suppression** : plat "Le Chicharron" (27 $) retiré du site — absent du PDF, carte menu + entrée JSON-LD supprimées
- **Correction de prix (écarts détectés vs PDF)** :
  - Pollo Asado : 21 $ → **22 $**
  - Suprema : 69 $ → **72 $**
- Tous les autres prix (Entrées, Arepas farcies, Bols, Repas) validés conformes au PDF, aucun autre écart trouvé
- ⚠️ À faire : mettre à jour `sitemap.xml` `lastmod` si souhaité, et vérifier si le nom de fichier `images/sancochito.png` doit être renommé (non fait, purement cosmétique/technique)

### 26 avril 2026 (très tard) — 7 photos finales : 2 plats + 5 boissons froides
- **2 plats sur fond crème natif** (auto-recadrage du cadre crème intégré) :
  - `picada-suprema.webp` (125 KB) — remplace `suprema.jpg` qui n'existait pas
  - `frites-de-yuca.webp` (70 KB) — remplace `yuca-frita.jpg` qui n'existait pas
- **5 boissons sur fond blanc à détourer** (sources catalogue petites, 225x225 → upscale 1080x1080) :
  - `coca-cola.webp` (20 KB) — Coke/Diète/Sprite/Fanta
  - `jarritos.webp` (28 KB) — bouteilles mexicaines colorées (paysage)
  - `colombiana.webp` (30 KB) — Colombiana ou Manzana
  - `pony-malta.webp` (17 KB) — bouteille étroite haute
  - `red-bull.webp` (17 KB) — canette
- HTML : 2 `data-photo` mis à jour (Yuca, Suprema) + 5 `data-photo` ajoutés (boissons)
- Schema.org JSON-LD : section "Breuvages" complètement refaite (était 2 items génériques → maintenant 9 MenuItems individuels avec image+prix : Café noir, Cappuccino, Chocolat chaud, Coke, Jarritos, Colombiana, Pony Malta, Red Bull, + Jus naturels colombiens en générique)
- Schema.org : "Suprema" renommé "Picada Suprema" + ajout `suitableForDiet: GlutenFreeDiet`
- sitemap.xml : 7 nouvelles entrées `<image:image>`
- ⚠️ Sources upload-blanc petites (225x225) → upscale à 1080x1080 = qualité un peu floue mais acceptable pour vignettes 140x140 dans les cartes menu

### 26 avril 2026 (tard, suite) — 11 vins, mousseux et spiritueux détourés et wirés
- **6 vins/mousseux** : Hungaria (Hongrie), Porderi dal Nespoli (Italie blanc), Adega Panalva Dao (Portugal blanc), Roseline (France rosé), Altamente Jumilla (Espagne rouge), Cono Sur Pinot Noir (Chili rouge)
- **5 spiritueux** : Aguardiente Antioqueño (Colombie), Brugal Rhum Añejo, Jose Cuervo Tequila Especial, Jimador Tequila Reposado, Jameson Black Barrel Whiskey
- Mix de sources : 7 déjà détourées (alpha transparent) + 3 sur fond blanc (Roseline, Jimador, Jameson) traitées avec détourage par seuillage couleur
- Aguardiente : ajout tardif après que l'utilisateur ait initialement uploadé un fichier HTML par erreur (`aguardiente Antioqueño.html` + dossier `_files/` à supprimer)
- Workflow standard : recadrage strict (alpha>200) → fond crème → ombre portée → WebP qualité 82
- Tailles finales : 11-34 KB par bouteille (gain ~85-90% vs sources)
- HTML : `data-photo` ajouté aux 11 cartes (Vins & Mousseux + Spiritueux — Bouteille)
- Schema.org JSON-LD : items génériques "Vins et mousseux"/"Spiritueux en bouteille" remplacés par 11 MenuItems individuels avec image+description+prix
- sitemap.xml : 11 nouvelles entrées `<image:image>`
- ⚠️ Fichier orphelin à supprimer manuellement : `aguardiente Antioqueño.html` + dossier `aguardiente Antioqueño_files/` (page HTML téléchargée par erreur, ~100 fichiers parasites)

### 26 avril 2026 (tard) — 8 bières détourées et wirées (Heineken 0.0 + 6 ALPHA + Labrosse INOX)
- Heineken 0.0 : photo source avec fond blanc → **détourage par seuillage couleur** (rembg/IA bloqué par le proxy du sandbox), placée sur fond crème avec ombre portée subtile, WebP 75 KB
- 6 bières ALPHA (Blonde, Blanche, Rousse, Minuano, Briza, Kona) : photos sources déjà détourées (alpha transparent) **mais avec ombre photographique intégrée à droite** qui décentrait le résultat
  - Solution : seuil alpha élevé (>250) pour cropper UNIQUEMENT la canette en ignorant l'ombre semi-transparente intégrée + nettoyage des pixels alpha<100 pour éliminer toute trace
  - Largeur du sujet contrainte à max 55% du canvas (canettes verticales)
  - Ombre portée propre ajoutée au sol (Gaussian blur radius 15)
- Labrosse INOX (déjà au menu) : photo verticale (400×1046) traitée pareil
- HTML : `data-photo` ajouté aux 7 cartes de la section Bières (en plus de Heineken 0.0 fait précédemment)
- Schema.org JSON-LD : item générique "Bières ALPHA et Heineken" remplacé par 8 MenuItems individuels avec image + prix
- sitemap.xml : 8 nouvelles entrées `<image:image>`
- ⚠️ **Note technique** : `rembg` (modèle IA U²-Net) installé mais **inutilisable** dans ce sandbox car le proxy bloque le téléchargement du modèle (170 MB depuis GitHub releases → 403 Forbidden). Workaround : détourage par seuillage couleur (fond blanc) + utilisation de l'alpha pré-existant (photos déjà détourées).
- Pour les futures photos avec **fond complexe** (table, étagère, bar) : passer par https://www.remove.bg/ ou https://www.photoroom.com/ avant de me les envoyer

### 26 avril 2026 (soir, après audit) — 8 nouvelles photos en WebP optimisé
**Premier batch utilisant le workflow standardisé documenté ci-dessus :**
- 8 photos uploadées : `ailes-poulet.png`, `cafe-noir.png`, `cappuccino.png`, `chocolat-chaud.png`, `empanadas.png`, `nachos.png`, `pain-fromage.png`, `pandebono.png`
- Auto-recadrées (cadre crème intégré supprimé), redimensionnées à 1080×1080
- **Converties en WebP qualité 82** : gain moyen **94%** (480 KB-1.2 MB → 21-124 KB)
- 8 cartes du menu mises à jour avec `data-photo="images/<nom>.webp"` (Empanada, Ailes, Nachos, Café noir, Cappuccino, Chocolat chaud, Pandebono, Pain fromage)
- Schema.org JSON-LD : 5 MenuItems enrichis avec `image` (Empanada, Ailes de poulet, Nachos, Pandebono, Pain fromage)
- `sitemap.xml` : 5 nouvelles entrées `<image:image>` ajoutées
- ⚠️ **PNG originaux laissés en place** dans `images/` (le sandbox empêche la suppression). Devront être supprimés manuellement après validation visuelle. Backups dans `_backup_avant_crop/`.
- ⚠️ Photos manquantes : `cafe-latte`, `buñuelo`, autres desserts (Gelatina, Flan Maracuyá, Brazo de Reina, Tres Leches, Cheesecake, Pain goyave et fromage)

### 26 avril 2026 (soir) — Audit complet + corrections P0/P1 (design + a11y + SEO + sécurité)
**Audit lancé via 3 agents spécialisés. Résultats : Design 7.5/10, A11y 6.5/10, SEO 6.5/10, Sécurité 7/10. Toutes les P0 corrigées :**

- **Sécurité** :
  - Création de `vercel.json` avec headers HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy + cache-control sur assets statiques
  - Sandbox sur iframe Google Maps : `sandbox="allow-scripts allow-same-origin allow-popups allow-forms"`
  - `privacy.html` : ajout section complète "Services tiers intégrés" (Vercel, Formspree, LibroReserve, Order Online, Google Maps, Google Fonts, Behold.so, Pexels) — conformité Loi 25
  - `privacy.html` : color-scheme + theme-color alignés, liens en `--accent-warm` pour contraste

- **SEO** :
  - `sitemap.xml` réécrit : 16 références `.jpg` → `.png` (corrections après migration des photos), `lastmod` à 2026-04-26, ajout `#suivez-nous`/`#avis`/`privacy.html`, retrait des entrées pour `yuca-frita.jpg`/`suprema.jpg` (fichiers inexistants)
  - `index.html` : retrait des hreflang `en-CA` et `es` (pointaient vers la même URL = signal trompeur à Google)
  - DNS-prefetch ajouté pour `w.behold.so` et `videos.pexels.com` + preconnect Behold
  - Retrait du preload du logo 800 KB (gaspillage LCP, le logo n'est pas le LCP)

- **Accessibilité** :
  - Modale plat : `role="dialog"`, `aria-modal="true"`, `aria-labelledby="dish-modal-name"`, `role="document"` sur le content
  - Skip link `<a class="skip-link" href="#main">` au début du `<body>` (visible au focus, masqué autrement)
  - `:focus-visible` global avec outline jaune brûlé (sombre sur boutons jaunes pleins)
  - `prefers-reduced-motion` : vidéo hero cachée + ticker pausé
  - Variable `--text3` ajustée `rgba(.5)` → `rgba(.62)` pour atteindre WCAG AA 4.5:1 sur fond crème

- **Design** :
  - `<meta name="color-scheme" content="dark">` → `light` (était incohérent avec le CSS, cassait inputs autofill Chrome + scrollbar mobile)
  - `<meta name="theme-color" content="#0e0e0e">` → `#f5f1e8` (matche la palette crème)
  - Ajout de `mobile-web-app-capable` à côté du `apple-mobile-web-app-capable` (déprécié mais conservé pour compat)
  - `apple-mobile-web-app-status-bar-style` : `black-translucent` → `default`
  - `.cta-final` : `background: #1a1410` ajouté en fallback (évite texte blanc sur crème si `.ph-ambient` ne couvre pas)
  - `.menu-card-photo.placeholder` : background `#f5f1e8` → `var(--bg-3)` (visible sur fond crème quand image fail)
  - Liens jaune `var(--accent)` → `var(--accent-warm)` aux endroits texte sur fond crème : `.hours-contact-line a`, `.form-privacy a` (avec hover qui passe à `--accent` vif)
  - **Nettoyage CSS mort** : suppression de `.signatures-grid`, `.signature-card*`, `.carousel-arrow*`, `.sig-grid`, `.sig-card`, `.sig-photo`, `.sig-flag`, `.sig-body`, `.sig-region`, `.sig-name`, `.sig-desc`, `.sig-price`, `.sig-cta` (~120 lignes orphelines)

### 26 avril 2026 (après-midi) — Section Suivez-nous + widget Behold Instagram
- Section `.signatures` (Saveurs de la Colombie, 4 cartes plats) **supprimée** du HTML
- Nouvelle section `.follow-us` (`#suivez-nous`) : header attractif + 2 gros boutons Instagram (gradient signature) et Facebook (bleu officiel) + grille pour le carrousel Instagram
- Intégration **Behold.so** (compte gratuit `bochicacafebistro@gmail.com`, feed-id `LKSqSklqhPMQhbC4F1dQ`) : custom element `<behold-widget>` chargé async, mise à jour automatique du feed à chaque publication

### 26 avril 2026 (après-midi) — Refonte cartes menu : badges régime en pills + titres élargis + descriptions cachées
- Badges sans gluten / végé : passés du texte simple à des **pills inline avec icône SVG (Lucide) + texte trilingue**, placés sous le nom du plat dans le body de la carte
- Couleurs des badges : doré jaune sur fond crème jaune pâle pour GF (`#fde9b3` + `#6b4d0a`), vert sur fond crème vert pâle pour végé (`#d4ebbd` + `#355a18`), bordure pointillée pour les variantes "option"
- Dans la modale plat : badges en pills plus grands (font 12px, padding plus aéré) avec icône + texte
- Titres cartes : `font-size 17px → 20px` (mobile 15→18), padding-right 80→60, border-radius gauche sur la photo, `word-break: break-word`
- Grid `minmax(260, 1fr)` → `minmax(290, 1fr)` (cartes plus larges, moins de wraps)
- `.menu-card .menu-card-desc { display: none }` — descriptions visibles uniquement à l'ouverture de la modale au clic
- Padding-bottom du body augmenté à 36px (28 mobile) pour réserver l'espace du prix en bas-droite

### 26 avril 2026 (après-midi) — Cartes avis et promos : fond foncé corrigé en crème
- `.review-card` et `.event-card` : `background: #2a1f15` (brun foncé résidu du dark theme original) → `var(--cream)` (crème clair)
- Bordures : `rgba(245,241,232,.12)` → `var(--border-dark)` (bordure foncée subtile)
- Box-shadows : ombres noires lourdes → ombres dorées douces `rgba(139,110,60,.12)`
- `.event-card__kicker` ("Tous les mercredis") + `.review-author` ("MARIE L.") : `var(--accent)` → `var(--accent-warm)` pour contraste WCAG AA sur fond crème

### 26 avril 2026 (après-midi) — 15 photos de plats uploadées + auto-recadrage
- Photos PNG ajoutées pour : 3 bols (Cali, Bogotá, Medellín) + 12 plats (Arepa, Burger, Canastica, Churrasco, Guacamole-chips, Hot-Dog, Patacones de la Casa, Patacon Montanero, Picada, Picadita, Pollo Asado, Salchipapas)
- Toutes les images avaient un cadre crème intégré (~110-190 px de padding) — auto-recadrées avec PIL pour faire toucher le plat aux bords du carré 1080×1080
- Backup des originaux dans `images/_backup_avant_crop/`
- HTML mis à jour : 15 références `data-photo` `.jpg` → `.png` + bloc Schema.org JSON-LD (~12 références) + Open Graph + Twitter card (`bandeja-medellin.jpg` → `.png` + `og:image:type` `image/jpeg` → `image/png`)
- Reste à uploader : `yuca-frita`, `suprema` (le placeholder logo Bochica s'affiche en attendant)

### 26 avril 2026 — Mise à jour CONTEXTE.md (audit fichiers réels)
- **Documenté l'inversion de palette** : la "brasserie dark" du 19 avril a été inversée en "brasserie crème papier" — `--bg:#f5f1e8`, `--text:#0e0d0c`, accent `--accent:#F7B32C`
- **Documenté les nouvelles sections** :
  - Ticker jaune défilant entre Hero et Band (5 phrases trilingues, dupliquées pour boucle infinie)
  - Vidéo dans le hero (`<video autoplay muted loop>` avec fallback Pexels en attendant `videos/hero.mp4`)
  - Story/About réordonné AVANT Signatures et Promos
  - CTA Final remplace l'ancien bloc Réservation (mêmes ancres `#reservation`)
- **Variables CSS mises à jour** : nouvelles échelles `--fs-*`, `--sp-*`, `--radius-*`, ombres simplifiées, transitions `ease`, ajout de `--border-dark/light`
- **Nouveaux fichiers documentés** :
  - `design_handoff_bochica_brasserie/` (bundle référence design — maquette HTML + README spec)
  - `preview-backgrounds.html` (dev, à supprimer)
  - 3 images promos `bochica_*_creme_1080x1080.png`
- **Bug à corriger noté** : `<meta name="color-scheme" content="dark">` dans `<head>` est en désaccord avec `:root { color-scheme: light }` du CSS — devrait être `light`

### 19 avril 2026 — Refonte brasserie dark + promos + workflow simplifié
- **Migration `refactor/design-system` → `main`** : abandon du modèle branche-de-test, tout va direct en prod
- **Nouveau design "brasserie"** : initialement fond noir chaud `#0e0d0c` global, accents jaune `#f7c81e`, Bebas Neue en display *(palette inversée par la suite — voir entrée du 26 avril)*
- **Fix `.reveal.visible`** : le CSS cherchait `.in-view` mais la JS ajoute `.visible` → cartes menu restaient invisibles. Règle CSS alignée
- **Layout cartes menu avec photo** : carte carrée 140×140 (110×110 mobile), logo Bochica 2026-8 sur fond clair comme placeholder par défaut (JS)
- **Section "Promos & activités"** : remplace "À l'affiche cette semaine". 3 cartes avec images carrées 1080×1080
- **Gallery commentée** : section désactivée en attente de photos
- **Hero H1** : "QUÉBEC — SAINT-ROCH" → **BOCHICA**
- **`.gitignore`** : ajout de `.claude/` (dossier interne)

### 17 avril 2026 — Refactoring design system (branche `refactor/design-system`)
- Ajout du système complet de tokens dans `:root`
- Système de boutons unifié (.btn + variantes + tailles)
- Migration des tailles de police, border-radius et gaps vers les tokens
- Migration des couleurs hardcodées
- Suppression des styles inline du HTML

### 17 avril 2026 — Corrections audit top 10
1. ✅ Retiré preload de `hero.jpg` (fichier inexistant)
2. ✅ Variable `--text3` ajustée pour contraste WCAG AA
3. ✅ `setLang()` met à jour `document.documentElement.lang` dynamiquement
4. ✅ Cartes de plats accessibles au clavier (`tabindex`, `role`, `aria-label`, handler keydown)
5. ✅ Hamburger : `aria-label`, `aria-expanded`, `aria-controls` (synchronisés par JS)
6. ✅ `<main id="main">` ajouté comme landmark wrapper
7. ✅ Media query `prefers-reduced-motion` ajoutée
8. ✅ `rel="noopener noreferrer"` sur tous les liens `target="_blank"`
9. ✅ Modale plat : focus trap + restauration du focus
10. ✅ `privacy.html` créée (conforme Loi 25) + lien dans footer + formulaire

## ✅ Reste à faire (mis à jour 26 avril 2026 soir)

**Configuration prod (P0)**
- [ ] Configurer Formspree (remplacer `VOTRE_ID_FORMSPREE` à la ligne 1310 d'`index.html`)
- [ ] Vérifier après déploiement que les headers de sécurité de `vercel.json` s'appliquent (https://securityheaders.com/?q=bochicacafebistro.ca)

**Assets à produire**
- [ ] Uploader `videos/hero.mp4` (vidéo locale d'ambiance — actuellement fallback Pexels qui fait fuiter l'IP visiteurs)
- [ ] Uploader photos manquantes : `yuca-frita`, `suprema` (le placeholder logo s'affiche en attendant)
- [ ] Uploader `about.jpg` (section Notre histoire — placeholder `.ph-ambient` actif)
- [ ] **Compresser les 15 photos PNG existantes** (`.png` 500KB-1.9MB → `.webp` qualité 82, cible <200KB) pour LCP mobile correct
- [ ] Optimiser `Logo Bochica 2026-3.png` (~800 KB → SVG ou WebP < 100 KB)

**Nettoyage**
- [ ] Supprimer fichiers orphelins : `paracones de la casa.png`, `.DS_Store`, `images/test`, `preview-ambiances.html`, `preview-backgrounds.html`, logos 2026-6/7/7(1) non utilisés
- [ ] Décider : on garde `design_handoff_bochica_brasserie/` dans le repo public ou on le déplace hors du repo ?
- [ ] Garde-t-on les références Schema.org à `yuca-frita.jpg` et `suprema.jpg` (lignes 213, 255) en attendant les photos, ou on les retire pour éviter les 404 si Google les crawl ?

**Améliorations futures**
- [ ] Décider : on garde la palette **crème papier** actuelle ou on retourne au **noir** prévu par `design_handoff_bochica_brasserie/` ?
- [ ] Ajouter `role="tablist"/tab/tabpanel"` sur onglets menu + navigation flèches clavier
- [ ] Remplacer les 4 avis placeholder par de vrais avis Google avec consentement
- [ ] Ajouter glose FR pour termes espagnols (Morcilla, Sancochito, Patacones, Brazo de Reina, etc.)
- [ ] Réactiver la gallery quand de vraies photos du restaurant seront disponibles
- [ ] Créer URLs distinctes pour /en/ et /es/ pour vraiment exploiter le multilingue côté SEO (actuellement même URL = pas de hreflang en-CA/es)
- [ ] Créer `images/og-bochica-1200x630.jpg` dédiée Open Graph (le format actuel 1080×1080 est sous-optimal pour Facebook/LinkedIn)
- [ ] Enrichir le H1 avec mots-clés locaux (visually-hidden span) ou modifier visuel pour intégrer "Restaurant colombien à Québec"
- [ ] Ajouter case à cocher de consentement explicite sur le formulaire (Loi 25 préfère consentement explicite vs implicite)
- [ ] Identifier nominativement la personne responsable de la protection des renseignements personnels dans `privacy.html` (Loi 25 demande une personne identifiable)
