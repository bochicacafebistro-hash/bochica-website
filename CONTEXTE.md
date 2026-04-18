# 📋 CONTEXTE — Site Web Bochica

> ⚠️ **Dernière mise à jour majeure : 17 avril 2026** — après l'audit design complet.
> Voir `AUDIT_DESIGN.md` pour le rapport complet et `CHANGELOG` en fin de document.

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

## 🎨 Design (palette réelle utilisée dans le code)
- **Style** : Moderne, chaleureux — hero noir, sections crème/blanc cassé, accents bordeaux
- **Palette CSS** (variables dans `:root` de `style.css`) :
  - **Fonds** : `--black:#0e0e0e` · `--black-2:#1a1615` · `--white:#faf6f0` (blanc cassé crème) · `--cream:#f3ede3` · `--beige:#e8dcc8`
  - **Texte** : `--text:#1a1010` · `--text2:#5a4a45` · `--text3:#5e524f` *(assombri depuis #6f635f pour contraste WCAG AA)*
  - **Accent principal** : `--accent:#6b1a1f` (bordeaux) · `--accent-hover:#4a1015` · `--accent-soft:#8b2428`
  - **Accents Colombie** (décoratif tricolore, fonds foncés) : `--yellow:#f5a623` · `--blue:#4a90e2` · `--red:#e74c3c`
- **Tricolore** jaune/bleu/rouge utilisé en **ornements** seulement (dots, barres fines, bordures stat)
- **Typographie** :
  - `--font-heading` : **Fraunces** (serif élégant, pour H1/H2/H3/prix/noms de plats)
  - `--font-body` : **Inter** (sans-serif moderne, pour corps de texte, UI)
  - Fallback : Helvetica Neue, Arial, sans-serif

## 🖼️ Logos & Images
Tous les fichiers sont dans le dossier `images/`.

**Logos utilisés :**
- `images/Logo Bochica 2026-3.png` — logo hero + placeholder menu (⚠️ 802 KB, **à optimiser en SVG ou WebP < 100 KB**)
- `images/Logo Bochica 2026-7 (1).png` — référencé dans Schema.org uniquement

**À uploader (encore manquants) :**
- `images/hero.jpg` — photo fond hero *(preload retiré du HTML tant que le fichier n'existe pas)*
- `images/about.jpg` — section Notre histoire
- `images/gallery1.jpg` à `images/gallery5.jpg` — galerie
- `images/bandeja-medellin.jpg` — image Open Graph (partages sociaux Facebook/LinkedIn)
- Photos de plats référencées par `data-photo` dans les cartes menu : `yuca-frita.jpg`, `guacamole-chips.jpg`, `canastica.jpg`, `patacones-de-la-casa.jpg`, `picadita.jpg`, `hot-dog-colombien.jpg`, `patacon-montanero.jpg`, `salchipapas.jpg`, `bochica-burger.jpg`, `pollo-asado.jpg`, `churrasco.jpg`, `picada.jpg`, `suprema.jpg`, `arepa-classique.jpg`, `bol-cali.jpg`, `bol-bogota.jpg`

**Fichiers orphelins à supprimer manuellement (voir audit) :**
- `paracones de la casa.png` (1.5 MB, faute de frappe "paracones"→"patacones", à la racine)
- `.DS_Store` (racine + `images/`) — fichiers macOS
- `images/test` (fichier résiduel 8 octets)
- `preview-ambiances.html` (fichier de dev 21 KB)
- `images/Logo Bochica 2026-6 (1).png`, `Logo Bochica 2026-7.png`, `Logo Bochica 2026-8.png` — non utilisés

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
Toutes sont englobées dans `<main id="main">` *(ajouté lors de l'audit)*.

1. **Nav** (`<nav>`) — logo BOCHICA + liens + FR/EN/ES + boutons Commander/Réserver + hamburger mobile
2. **Hero** (`.hero`) — fond noir `#0e0e0e`, logo centré, phrase d'accroche, 2 boutons CTA
3. **Band** (`.band`) — barre noire avec statut ouvert/fermé (dynamique) + horaires + adresse + téléphone
4. **Menu** (`#menu`) — 8 onglets (Entrées, Arepas, Bols, Repas, Breuvages, Cocktails, Bières, Desserts) + cartes cliquables avec modale
5. **Signatures** (`#signatures`) — Coups de cœur (3 cartes avec drapeau de région)
6. **Événements** (`#evenements`) — sur fond noir, 3 cartes événement avec date
7. **Avis/Reviews** (`#avis`) — 4 cartes avis clients + note Google
8. **About** (`#about`) — Notre histoire, photo + décoration tricolore + stats
9. **Horaires & Contact** (`#horaires`) — tableau horaires + infos contact + formulaire de contact
10. **Localisation** (`#localisation`) — carte Google Maps + CTAs itinéraire
11. **Réservation** (`#reservation`) — CTA final fond noir (réserver + appeler)
12. **Footer** (`<footer>`) — logo + liens + confidentialité + réseaux sociaux + copyright + barre tricolore
13. **FAB Réserver** (`.fab-reserve`) — bouton flottant mobile uniquement
14. **Dish Modal** (`#dish-modal`) — modale détails d'un plat (cliquée depuis carte menu)

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

## 🚀 Workflow
1. Modifier sur **GitHub.com**
2. **Vercel** redéploie automatiquement
3. Tester sur Vercel (https://bochica-website.vercel.app)
4. Quand prêt → télécharger fichiers → uploader sur **GoDaddy File Manager**

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

### Reste à faire (post-audit)
- [ ] Uploader `hero.jpg`, `about.jpg`, `gallery1-5.jpg`, `bandeja-medellin.jpg`, toutes photos plats
- [ ] Optimiser `Logo Bochica 2026-3.png` (802 KB → SVG ou WebP < 100 KB)
- [ ] Configurer Formspree (remplacer `VOTRE_ID_FORMSPREE`)
- [ ] Supprimer fichiers orphelins : `paracones de la casa.png`, `.DS_Store`, `images/test`, `preview-ambiances.html`, logos 2026-6/7/8 non utilisés
- [ ] Refactoriser `.btn-blue` (nom mensonger) et classes `.y/.b/.r` mensongères
- [ ] Standardiser l'échelle de spacing (--sp-1 à --sp-8) et typographique (--fs-xs à --fs-3xl)
- [ ] Ajouter `role="tablist"/tab/tabpanel"` sur onglets menu + navigation flèches clavier
- [ ] Remplacer les 4 avis placeholder par de vrais avis Google avec consentement
- [ ] Ajouter glose FR pour termes espagnols (Morcilla, Sancochito, Patacones, Brazo de Reina, etc.)
