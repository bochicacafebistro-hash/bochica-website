# 📋 CONTEXTE — Site Web Bochica

> ⚠️ **Dernière mise à jour majeure : 26 avril 2026** — palette **inversée vers crème papier** (le fond n'est plus noir), ajout du **ticker jaune**, **vidéo hero**, réordonnancement des sections, nouveau bundle de design `design_handoff_bochica_brasserie/`.
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
- **Nom** : Bochica — Restaurant Colombien
- **Adresse** : 430 Rue Saint-Vallier Ouest, Québec, QC, Canada (quartier Saint-Roch / Saint-Sauveur)
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
  - Samedi : 13h00 – 23h00
  - Dimanche : 13h00 – 21h00
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

**Images de promos (section "Promos & activités")** — format carré 1080×1080, version "crème" :
- `images/bochica_mercredi_creme_1080x1080.png` — Mercredi des empanadas (2,25 $)
- `images/bochica_jeudi_creme_1080x1080.png` — Jeudi du Bol Medellín (−20 %)
- `images/bochica_vendredi_creme_1080x1080.png` — Vendredi bières 2×1 (17h-20h)

**Vidéo hero (NOUVEAU)** — le hero est maintenant une `<video autoplay muted loop playsinline>` :
- Source primaire : `videos/hero.mp4` (à uploader)
- Source de secours : URL Pexels `https://videos.pexels.com/video-files/3940084/3940084-hd_1920_1080_30fps.mp4`
- Poster fallback : `images/Logo Bochica 2026-3.png`

**À uploader (encore manquants) :**
- `videos/hero.mp4` — vidéo locale d'ambiance Colombie/restaurant *(le fallback Pexels est actif en attendant)*
- `images/about.jpg` — section Notre histoire (placeholder `.ph-ambient` actif)
- `images/bandeja-medellin.jpg` — image Open Graph (partages sociaux)
- Photos de plats référencées par `data-photo` dans les cartes menu (optionnel — sans photo, le logo Bochica s'affiche automatiquement comme placeholder) : `yuca-frita.jpg`, `guacamole-chips.jpg`, `canastica.jpg`, `patacones-de-la-casa.jpg`, `picadita.jpg`, `hot-dog-colombien.jpg`, `patacon-montanero.jpg`, `salchipapas.jpg`, `bochica-burger.jpg`, `pollo-asado.jpg`, `churrasco.jpg`, `picada.jpg`, `suprema.jpg`, `arepa-classique.jpg`, `bol-cali.jpg`, `bol-bogota.jpg`

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
8. **Promos & activités** (`#evenements`, ligne 1054) — H2 *"Promos & activités"* (mot "Promos" en jaune accent) — 3 cartes avec image carrée 1080×1080 :
   - MER · Mercredi des empanadas · 2,25 $ toute la journée
   - JEU · Jeudi du Bol Medellín · −20 % toute la journée
   - VEN · Vendredi 2 × 1 sur les bières · 17 h-20 h
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

## 🌐 Multilingue
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
- `index.html:1303` — formulaire Formspree
- **⚠️ Placeholder `VOTRE_ID_FORMSPREE` toujours en place** — à configurer :
  1. Créer compte sur https://formspree.io/register avec bochicacafebistro@gmail.com
  2. Créer un form, récupérer l'ID (ex : `mvgokrab`)
  3. Remplacer `VOTRE_ID_FORMSPREE` dans `action="https://formspree.io/f/VOTRE_ID_FORMSPREE"`
- Tant que non configuré : bascule automatique vers `mailto:` (fallback)
- Honeypot anti-spam + labels + autocomplete + aria-live sur statut

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
- **Ne pas faire confiance aux deux dossiers `.claude/worktrees/`** (kind-kapitsa, elegant-hopper) : ce sont des copies de travail Claude, ignorées par git, pas la source de vérité

## 📝 CHANGELOG

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

## ✅ Reste à faire (mis à jour 26 avril 2026)

**Bugs / cohérence**
- [ ] Aligner `<meta name="color-scheme" content="dark">` (HTML ligne 6) avec `:root { color-scheme: light }` du CSS — choisir une direction
- [ ] Décider : on garde la palette **crème papier** actuelle ou on retourne au **noir** prévu par `design_handoff_bochica_brasserie/` ?

**Assets à produire**
- [ ] Uploader `videos/hero.mp4` (vidéo locale d'ambiance — actuellement fallback Pexels)
- [ ] Uploader `about.jpg`, `bandeja-medellin.jpg` (Open Graph), photos de plats (optionnel)
- [ ] Optimiser `Logo Bochica 2026-3.png` (~800 KB → SVG ou WebP < 100 KB)

**Configuration**
- [ ] Configurer Formspree (remplacer `VOTRE_ID_FORMSPREE` à la ligne 1303 d'`index.html`)

**Nettoyage**
- [ ] Supprimer fichiers orphelins : `paracones de la casa.png`, `.DS_Store`, `images/test`, `preview-ambiances.html`, `preview-backgrounds.html`, logos 2026-6/7/7(1) non utilisés
- [ ] Décider : on garde `design_handoff_bochica_brasserie/` dans le repo public ou on le déplace hors du repo (il n'est pas servi en prod mais reste accessible) ?

**Améliorations**
- [ ] Ajouter `role="tablist"/tab/tabpanel"` sur onglets menu + navigation flèches clavier
- [ ] Remplacer les 4 avis placeholder par de vrais avis Google avec consentement
- [ ] Ajouter glose FR pour termes espagnols (Morcilla, Sancochito, Patacones, Brazo de Reina, etc.)
- [ ] Vérifier que le ticker jaune respecte `prefers-reduced-motion` (animation à pauser si l'utilisateur le demande)
- [ ] Réactiver la gallery quand de vraies photos du restaurant seront disponibles
