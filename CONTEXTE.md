# 📋 CONTEXTE — Site Web Bochica

> ⚠️ **Dernière mise à jour majeure : 19 avril 2026** — refonte design "brasserie dark" + section promos + workflow simplifié.
> Voir `AUDIT_DESIGN.md` pour l'ancien rapport d'audit et `CHANGELOG` en fin de document pour les changements récents.

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
- **Adresse** : 430 Rue Saint-Vallier Ouest, Québec, QC, Canada
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

## 🎨 Design — Direction "Brasserie" (depuis 19 avril 2026)
- **Style** : Brasserie sombre et chaleureuse — fond noir chaud sur toute la page, accents jaune impact, typographie condensée Bebas Neue
- **`color-scheme: dark`** déclaré dans `<meta>` et `:root` pour empêcher le dark mode forcé des navigateurs d'inverser le design
- **Palette CSS** (variables dans `:root` de `style.css`) :
  - **Fonds sombres** : `--bg:#0e0d0c` (noir chaud principal) · `--bg-2:#1a1510` (surfaces cartes) · `--bg-3:#221812` (surfaces tertiaires) · `--black:#0e0d0c`
  - **Fonds clairs** : `--cream:#f5f1e8` (sections sur fond crème, ex. section histoire) · `--cream-2:#efe7d5`
  - **Texte sur foncé** : `--ink:#f5f1e8` · `--text:#f5f1e8` · `--text2:rgba(245,241,232,.75)` · `--text3:rgba(245,241,232,.55)`
  - **Texte sur crème** : `--text-on-cream:#0e0d0c` · `--text-on-cream-2:rgba(14,13,12,.7)`
  - **Accent principal** : `--accent:#f7c81e` (jaune impact) · `--accent-hover:#ebbd0e` · `--accent-soft:#fef2d4` · `--accent-text:#0e0d0c` · `--accent-warm:#8a6a1a`
  - **Tricolore Colombie** (conservé pour petits accents) : `--yellow:#f7c81e` · `--blue:#4a90e2` · `--red:#e74c3c`
  - **États** : `--status-open:#7dbf66` · `--status-closed:#d9534f`
- **Typographie** :
  - `--font-display` / `--font-heading` : **Bebas Neue** (condensée, majuscules, pour H1/H2/titres cartes menu)
  - `--font-body` : **Inter** (sans-serif moderne, pour corps de texte)
  - `--font-mono` : **JetBrains Mono** (pour kickers/labels techniques)
- **Échelle typographique** : `--fs-xs` (11) → `--fs-hero` (clamp 48→96px)
- **Espacement** : `--pad` (40px desktop / 20px mobile), `--gap` (28px), tokens `--sp-1` à `--sp-10`

## 🖼️ Logos & Images
Tous les fichiers sont dans le dossier `images/`.

**Logos & placeholders utilisés :**
- `images/Logo Bochica 2026-8.png` (40 KB, RGBA transparent) — **placeholder par défaut des cartes menu** et image de la modale plat, sur fond crème
- `images/Logo Bochica 2026-3.png` — autres usages (footer, schema.org)

**Images de promos (section "Promos & activités")** — format carré 1080×1080 :
- `images/bochica_mercredi_creme_1080x1080.png` — Mercredi des empanadas (2,25 $)
- `images/bochica_jeudi_creme_1080x1080.png` — Jeudi du Bol Medellín (−20 %)
- `images/bochica_vendredi_creme_1080x1080.png` — Vendredi bières 2×1 (17h-20h)

**À uploader (encore manquants) :**
- `images/hero.jpg` — photo fond hero *(preload retiré du HTML tant que le fichier n'existe pas)*
- `images/about.jpg` — section Notre histoire
- `images/bandeja-medellin.jpg` — image Open Graph (partages sociaux Facebook/LinkedIn)
- Photos de plats référencées par `data-photo` dans les cartes menu (optionnel — sans photo, le logo Bochica s'affiche automatiquement comme placeholder) : `yuca-frita.jpg`, `guacamole-chips.jpg`, `canastica.jpg`, `patacones-de-la-casa.jpg`, `picadita.jpg`, `hot-dog-colombien.jpg`, `patacon-montanero.jpg`, `salchipapas.jpg`, `bochica-burger.jpg`, `pollo-asado.jpg`, `churrasco.jpg`, `picada.jpg`, `suprema.jpg`, `arepa-classique.jpg`, `bol-cali.jpg`, `bol-bogota.jpg`

**Fichiers orphelins à supprimer manuellement :**
- `paracones de la casa.png` (1.5 MB, faute de frappe "paracones"→"patacones", à la racine)
- `.DS_Store` (racine + `images/`) — fichiers macOS
- `images/test` (fichier résiduel 8 octets)
- `preview-ambiances.html` (fichier de dev 21 KB)
- `images/Logo Bochica 2026-6 (1).png`, `Logo Bochica 2026-7.png`, `Logo Bochica 2026-7 (1).png` — non utilisés actuellement

## 🗂️ Structure des fichiers
```
bochica-website/
├── index.html          ← HTML complet (trilingue FR/EN/ES, 1450+ lignes)
├── privacy.html        ← Politique de confidentialité (Loi 25 Québec)
├── CONTEXTE.md         ← ce fichier
├── AUDIT_DESIGN.md     ← rapport d'audit complet (17 avril 2026)
├── sitemap.xml         ← sitemap SEO
├── robots.txt          ← directives robots
├── site.webmanifest    ← manifest PWA
├── favicon.ico         ← favicon
├── css/
│   └── style.css       ← tout le CSS (~460 lignes)
├── js/
│   └── main.js         ← tout le JavaScript (~560 lignes)
└── images/
    ├── Logo Bochica 2026-3.png  (à optimiser)
    ├── favicon-16/32/48.png
    ├── apple-touch-icon.png
    ├── icon-192.png, icon-512.png
    └── (photos à uploader)
```

## 📄 Sections du site (dans index.html, dans l'ordre)
Toutes sont englobées dans `<main id="main">`.

1. **Nav** (`<nav>`) — logo texte **BOCHICA** (CA en jaune accent) + liens + FR/EN/ES + boutons Commander/Réserver + hamburger mobile
2. **Hero** (`.hero`) — fond noir, H1 **BOCHICA**, tagline "Restaurant colombien", 2 CTA (menu + commander)
3. **Band** (`.band`) — barre noire avec statut ouvert/fermé (dynamique) + horaires + adresse + téléphone
4. **Menu** (`#menu`) — 8 onglets (Entrées, Arepas, Bols, Repas, Breuvages, Cocktails, Bières, Desserts) + cartes avec photo placeholder (logo Bochica sur fond crème, carrées 140×140 / 110×110 mobile), cliquables → modale
5. **Signatures** (`#signatures`) — Coups de cœur (3 cartes avec drapeau de région)
6. **Promos & activités** (`#evenements`) — section renommée le 19 avril (était "À l'affiche cette semaine") — 3 cartes de promos hebdomadaires avec image carrée 1080×1080 :
   - MER · Mercredi des empanadas · 2,25 $ toute la journée
   - JEU · Jeudi du Bol Medellín · −20 % toute la journée
   - VEN · Vendredi 2 × 1 sur les bières · 17 h-20 h
   Prévue aussi pour héberger les événements ponctuels (fêtes, matchs, ateliers) plus tard.
7. **Avis/Reviews** (`#avis`) — 4 cartes avis clients + note Google
8. **About** (`#about`) — Notre histoire, photo + décoration tricolore + stats
9. **Horaires & Contact** (`#horaires`) — tableau horaires + infos contact + formulaire de contact
10. **Localisation** (`#localisation`) — carte Google Maps + CTAs itinéraire
11. **Réservation** (`#reservation`) — CTA final fond noir (réserver + appeler)
12. **Footer** (`<footer>`) — logo + liens + confidentialité + réseaux sociaux + copyright + barre tricolore
13. **FAB Réserver** (`.fab-reserve`) — bouton flottant mobile uniquement
14. **Dish Modal** (`#dish-modal`) — modale détails d'un plat (carrée 1:1 avec logo Bochica crème en placeholder)
15. ~~**Gallery** (`#gallery`)~~ — **commentée temporairement** dans le HTML (en attente de vraies photos). Pour la réactiver : décommenter le bloc `<!-- GALLERY -->` dans `index.html`.

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
- Fonction JS `setLang(lang)` dans `main.js` — **met maintenant à jour `document.documentElement.lang`** (accessibilité lecteurs d'écran)
- Langue sauvegardée dans `localStorage` (clé `bochica-lang`)
- Boutons FR / EN / ES dans la nav (avec `aria-pressed` pour accessibilité)

## ✨ Fonctionnalités JS (main.js)
- `setLang(lang)` — changement de langue + mise à jour de `<html lang>` + `aria-pressed` sur boutons
- `restoreLang()` — restaure la langue depuis localStorage
- `initNav()` — nav qui change au scroll + affichage du FAB mobile
- `toggleMenu()` / `closeMenu()` — menu hamburger mobile avec **`aria-expanded`**, `aria-label` bilingue, animation X
- `initMobileMenu()` — ferme menu au clic lien + clic extérieur
- `setMenuTab(tab, el)` — navigation entre les onglets du menu
- `initScrollReveal()` — animation apparition au scroll (respect `prefers-reduced-motion`)
- `initDishCards()` — initialise cartes cliquables (photos, badges GF/Végé, **clavier Enter/Espace**)
- `openDish(card)` / `closeDish()` — modale plat avec **focus trap** + **restauration focus** sur carte d'origine
- `computeStatus()` / `renderStatus()` — badge Ouvert/Fermé dynamique trilingue (fuseau Québec)
- `initContactForm()` — formulaire Formspree avec fallback mailto, messages trilingues
- `initYear()` — année copyright automatique

## 🎨 Classes CSS importantes
- `.menu-tabs` / `.menu-tab` / `.menu-tab.active` — onglets du menu
- `.menu-section` — section de chaque onglet
- `.menu-subsection-title.y/.b/.r` — titres de sous-catégorie (⚠️ toutes en bordeaux actuellement, classes à nettoyer)
- `.menu-card` / `.menu-card.has-photo` / `.menu-card.clickable` — fiche d'un item
- `.badge-gf`, `.badge-gf-opt`, `.badge-veg`, `.badge-veg-opt` — badges régime
- `.reveal` / `.reveal.visible` — animation scroll (désactivée si prefers-reduced-motion)
- `.dish-modal` / `.dish-modal-content` — modale plat
- `.fab-reserve` — bouton flottant mobile

## ♿ Accessibilité (après corrections du 17 avril 2026)
- `<main id="main">` wrap tout le contenu principal
- `document.documentElement.lang` mis à jour dynamiquement par setLang()
- Hamburger : `aria-label`, `aria-expanded`, `aria-controls="nav-links"`
- Boutons langue : `aria-label` (Français/English/Español), `aria-pressed`, `role="group"` parent
- Cartes menu cliquables : `tabindex="0"`, `role="button"`, `aria-label`, handler clavier Enter/Espace
- Modale plat : focus trap Tab/Shift+Tab, restauration du focus à la fermeture
- `:focus-visible` global avec outline 3px bordeaux
- Media query `prefers-reduced-motion` : désactive toutes animations
- Tous les liens externes `target="_blank"` ont `rel="noopener noreferrer"`
- Contraste `--text3` conforme WCAG AA (4.5:1 sur fonds crème)

## 🔐 Conformité Loi 25 (Québec)
- `privacy.html` — politique de confidentialité complète
- Liée depuis le footer + formulaire de contact
- Consentement implicite à l'envoi du formulaire

## 📨 Formulaire de contact
- `index.html:~1282` — formulaire Formspree
- **⚠️ Placeholder `VOTRE_ID_FORMSPREE` toujours en place** — à configurer :
  1. Créer compte sur https://formspree.io/register avec bochicacafebistro@gmail.com
  2. Créer un form, récupérer l'ID (ex : `mvgokrab`)
  3. Remplacer `VOTRE_ID_FORMSPREE` dans `action="https://formspree.io/f/VOTRE_ID_FORMSPREE"`
- Tant que non configuré : bascule automatique vers `mailto:` (fallback)
- Honeypot anti-spam + labels + autocomplete + aria-live sur statut

## 🚀 Workflow (depuis 19 avril 2026 — simplifié)
**Tout va directement sur `main`. Pas de branche de test/preview.**

1. Modifier les fichiers localement (via Claude Code ou directement)
2. Ouvrir **GitHub Desktop**, vérifier la branche **`main`**
3. Cocher les fichiers à inclure (ignorer `.claude/` qui est dans `.gitignore`)
4. Écrire un message de commit → cliquer **Commit to main**
5. Cliquer **Push origin** (bouton en haut à droite)
6. **Vercel** redéploie automatiquement en prod (~1 min)
7. Vérifier https://bochicacafebistro.ca/

**⚠️ Note** : les credentials GitHub ne sont pas accessibles depuis le terminal de Claude Code — seul GitHub Desktop peut faire le push. Claude prépare les fichiers, l'utilisateur fait commit + push.

**Ancienne branche `refactor/design-system`** : fusionnée dans `main` le 19 avril, plus utilisée. Peut être supprimée localement et sur GitHub si désirée.

## ⚠️ Règles importantes
- Pour changements dans **NAV ou HERO** → donner la section CSS complète
- Pour autres changements → donner juste les lignes à modifier
- Pour changements majeurs → donner le fichier complet
- Images toujours dans `images/` avec chemin `src="images/nom-fichier"`
- Toujours utiliser les variables CSS `var(--accent)` etc. plutôt que d'hardcoder les couleurs

## 🎨 Design System (post-refactoring 17 avril 2026)

Système complet de tokens dans `:root` de `style.css`. **Toujours préférer les tokens aux valeurs hardcodées.**

### Couleurs
- **Fonds** : `--black`, `--black-2`, `--white`, `--cream`, `--beige`
- **Texte** : `--text`, `--text2`, `--text3`
- **Accent bordeaux** : `--accent`, `--accent-hover`, `--accent-soft`, `--accent-text`
- **Tricolore Colombie** : `--yellow` / `--yellow-hover` / `--yellow-soft` / `--yellow-text` (assombri pour contraste AA), `--blue` / `--blue-hover` / `--blue-text`, `--red` / `--red-hover`
- **États** : `--success`, `--success-bg/text/border`, `--error`, `--error-bg/text/border`
- **Classes utilitaires** : `.c-yellow/.c-blue/.c-red/.c-accent` (text), `.bg-yellow/...` (background), `.avatar--y/b/r/green`

### Typographie
- Familles : `--font-heading` (Fraunces), `--font-body` (Inter), `--font` (alias body)
- Échelle : `--fs-xs` (11) → `--fs-sm` (13) → `--fs-base` (15) → `--fs-md` (17) → `--fs-lg` (20) → `--fs-xl` (26) → `--fs-2xl` (32) → `--fs-3xl` (48)
- Spéciaux : `--fs-hero`, `--fs-section` (clamp responsive)

### Espacement (échelle 4/8)
- `--sp-1` (4) → `--sp-2` (8) → `--sp-3` (12) → `--sp-4` (16) → `--sp-5` (24) → `--sp-6` (32) → `--sp-7` (48) → `--sp-8` (64) → `--sp-9` (96) → `--sp-10` (120)

### Border-radius
- `--radius-xs` (2) → `--radius-sm` (4) → `--radius-md` (8) → `--radius-lg` (12) → `--radius-xl` (16) → `--radius-pill` (40) → `--radius-full` (50%)

### Ombres
- `--shadow-sm/md/lg/xl` (gris) + `--shadow-accent`, `--shadow-accent-lg` (bordeaux pour CTA)

### Transitions
- `--transition-fast` (.2s), `--transition-base` (.25s), `--transition-slow` (.35s cubic-bezier)

### Système de boutons unifié
Nouvelle convention : `.btn .btn--{variant} .btn--{size}`
- **Variantes** : `.btn--primary` (bordeaux), `.btn--yellow` (jaune Colombie), `.btn--ghost-light` (contour clair sur fond foncé), `.btn--ghost-dark` (contour foncé sur fond clair), `.btn--phone` (CTA appel)
- **Tailles** : `.btn--sm`, `.btn--md` (défaut), `.btn--lg`
- **Anciennes classes conservées** comme alias pour compat : `.btn-primary`, `.btn-outline`, `.btn-blue` (= bordeaux malgré son nom historique), `.btn-nav-order`, `.btn-nav-reserve`, `.btn-outline-dark`, `.event-social-btn`, `.fab-reserve`

### Tricolore restauré sur les sous-titres menu
Les classes `.y/.b/.r` sur `.menu-subsection-title` et `.menu-card-cat` utilisent maintenant les vraies couleurs Colombie (jaune assombri / bleu assombri / rouge bordeaux). Un dot coloré apparaît à gauche du titre (`::before`).

## 📝 CHANGELOG

### 19 avril 2026 — Refonte brasserie dark + promos + workflow simplifié
- **Migration `refactor/design-system` → `main`** : abandon du modèle branche-de-test, tout va direct en prod
- **Nouveau design "brasserie"** : fond noir chaud `#0e0d0c` global, accents jaune `#f7c81e`, Bebas Neue en display
- **Fix `color-scheme: dark`** : ajouté dans `<meta>` et `:root` pour empêcher les navigateurs (Chrome Auto Dark, etc.) de forcer un dark mode en inversant les couleurs
- **Fix `.reveal.visible`** : le CSS cherchait `.in-view` mais la JS ajoute `.visible` → cartes menu restaient invisibles. Règle CSS alignée sur les deux classes
- **Layout cartes menu avec photo** : carte carrée 140×140 (110×110 mobile), logo Bochica crème sur fond clair comme placeholder par défaut (JS)
- **Placeholder modale plat** : aligné avec les cartes (même logo, même fond crème, ratio 1:1 au lieu du pattern rayé foncé)
- **Section "Promos & activités"** : remplace "À l'affiche cette semaine". 3 cartes avec images carrées 1080×1080 (empanadas mercredi, bol Medellín jeudi, bières 2×1 vendredi)
- **Gallery commentée** : section "Bienvenue chez Bochica" désactivée en attente de photos
- **Hero H1** : "QUÉBEC — SAINT-ROCH" → **BOCHICA**
- **`.gitignore`** : ajout de `.claude/` (dossier interne Claude Code)

### 17 avril 2026 — Refactoring design system (branche `refactor/design-system`)
- Ajout du système complet de tokens dans `:root`
- Système de boutons unifié (.btn + variantes + tailles)
- Migration de 37 tailles de police, 24 border-radius et 18 gaps vers les tokens
- Migration des couleurs hardcodées (#faf6f0, #ffffff, #c98600, #2c6fb8, etc.)
- Classes `.y/.b/.r` rendues vraiment tricolores avec dots colorés
- Suppression des styles inline du HTML (avatars, stats)
- Classes utilitaires `.c-*`, `.bg-*`, `.avatar--*`

### 17 avril 2026 — Corrections audit top 10
1. ✅ Retiré preload de `hero.jpg` (fichier inexistant)
2. ✅ Variable `--text3` ajustée `#6f635f → #5e524f` (contraste WCAG AA)
3. ✅ `setLang()` met à jour `document.documentElement.lang` dynamiquement
4. ✅ Cartes de plats accessibles au clavier (`tabindex`, `role`, `aria-label`, handler keydown)
5. ✅ Hamburger : `aria-label`, `aria-expanded`, `aria-controls` (synchronisés par JS)
6. ✅ `<main id="main">` ajouté comme landmark wrapper
7. ✅ Media query `prefers-reduced-motion` ajoutée
8. ✅ `rel="noopener noreferrer"` sur tous les liens `target="_blank"`
9. ✅ Modale plat : focus trap + restauration du focus
10. ✅ `privacy.html` créée (conforme Loi 25) + lien dans footer + formulaire

### Reste à faire
- [ ] Uploader `hero.jpg`, `about.jpg`, `bandeja-medellin.jpg`, photos de plats (optionnel — sans elles, le logo Bochica fait office de placeholder)
- [ ] Optimiser `Logo Bochica 2026-3.png` (802 KB → SVG ou WebP < 100 KB)
- [ ] Configurer Formspree (remplacer `VOTRE_ID_FORMSPREE`)
- [ ] Supprimer fichiers orphelins : `paracones de la casa.png`, `.DS_Store`, `images/test`, `preview-ambiances.html`, logos 2026-6/7/7(1) non utilisés
- [ ] Ajouter `role="tablist"/tab/tabpanel"` sur onglets menu + navigation flèches clavier
- [ ] Remplacer les 4 avis placeholder par de vrais avis Google avec consentement
- [ ] Ajouter glose FR pour termes espagnols (Morcilla, Sancochito, Patacones, Brazo de Reina, etc.)
- [ ] Envisager un hero-video (remplacer `hero.jpg` par une vidéo boucle MP4/WebM) — demandé par Alvaro
- [ ] Réactiver la gallery quand de vraies photos du restaurant seront disponibles
