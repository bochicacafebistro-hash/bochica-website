# 📋 CONTEXTE — Site Web Bochica

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
- **Courriel** : info@bochicacafebistro.ca
- **Réseaux sociaux** : @bochicaQC
- **Phrase d'accroche** : "Voyagez en Colombie… sans quitter le Québec!"
- **Services** : Souper seulement
- **Horaires** : Lundi fermé · Mardi–Dimanche 17h00–21h00

## 🎨 Design
- **Style** : Moderne et minimaliste — hero fond noir, sections blanches/grises
- **Palette** (couleurs du logo colombien) :
  - Jaune : `#f5a623` — couleur accent principale
  - Bleu : `#4a90e2` — accent secondaire
  - Rouge : `#e74c3c` — accent tertiaire
  - Noir : `#111111` — hero, nav, band, réservation
  - Blanc : `#ffffff` — sections claires
  - Gris : `#f7f7f7` — fond menu
- **Tricolore** jaune/bleu/rouge utilisé comme barre décorative partout
- **Typographie** : Helvetica Neue, sans-serif

## 🖼️ Logos & Images
Tous les fichiers sont dans le dossier `images/` :
- `images/Logo Bochica 2026-3.png` — logo hero (PNG transparent)
- `images/Logo Bochica 2026-7 (1).png` — logo nav + footer
- `images/hero.jpg` — photo fond hero (à uploader)
- `images/about.jpg` — photo section Notre histoire (à uploader)
- `images/gallery1.jpg` à `images/gallery5.jpg` — galerie (à uploader)

## 🗂️ Structure des fichiers
bochica-website/
├── index.html          ← HTML complet
├── CONTEXTE.md         ← ce fichier
├── css/
│   └── style.css       ← tout le CSS
├── js/
│   └── main.js         ← tout le JavaScript
└── images/
├── Logo Bochica 2026-3.png
├── Logo Bochica 2026-7 (1).png
└── (photos à uploader)

## 📄 Sections du site (dans index.html)
1. **Nav** — texte BOCHICA + liens + FR/EN/ES + boutons Commander/Réserver
2. **Hero** — fond noir `#111111`, logo centré, phrase d'accroche, 2 boutons CTA
3. **Band** — barre noire avec infos rapides (horaires, adresse, téléphone)
4. **About** — Notre histoire, photo + décoration tricolore + stats
5. **Menu** — onglets + sous-sections + items complets
6. **Gallery** — grille 4 colonnes sur fond noir
7. **Horaires & Contact** — tableau horaires + infos contact
8. **Réservation** — CTA final fond noir
9. **Footer** — texte BOCHICA + liens + copyright + barre tricolore

## 🍽️ Menu — Structure des onglets
- **Entrées** — Empanadas, Arepa, Sancochito, Frites, Yuca, Guacamole, Canastica, Patacones, Ailes, Picadita + Extras
- **Arepas farcies** — Végétarienne (14$), Classique (15$), Mixte (17$)
- **Bols** — Cali (20$), Bogotá (21$), Medellín (21$), Végétarien (19$)
- **Repas** — Repas enfant, Hot-Dog, Patacon Montanero, Salchipapas, Nachos, Burger, Pollo Asado, Chicharron, Churrasco, Picada, Suprema
- **Breuvages** — Boissons chaudes (café, cappuccino, chocolat) · Boissons froides (Coke, Jarritos, Colombiana, Red Bull) · Jus naturels (Mora, Guayaba, Mango, Lulo, Piña, Tamarindo, Maracuyá, Guanábana)
- **Cocktails** — Mocktails (8$) · Classics (10$) · Cocktails signature (12-12.5$) · Cafés alcoolisés
- **Bières** — Bières ALPHA + Heineken · Vins & Mousseux (35$) · Spiritueux bouteille (79-99$)
- **Desserts** — Gelatina, Flan Maracuyá, Brazo de Reina, Tres Leches, Cheesecake · Pains (Pandebono, Buñuelo, Pain fromage/goyave)

## 🌐 Multilingue
- Attributs HTML `data-fr`, `data-en`, `data-es` sur chaque élément
- Fonction JS `setLang(lang)` dans `main.js`
- Langue sauvegardée dans `localStorage`
- Boutons FR / EN / ES dans la nav

## ✨ Fonctionnalités JS (main.js)
- `setLang(lang)` — changement de langue
- `restoreLang()` — restaure la langue depuis localStorage
- `initNav()` — nav qui change au scroll (déjà sombre, juste shadow)
- `toggleMenu()` — menu hamburger mobile avec animation X
- `closeMenu()` — ferme le menu mobile
- `setMenuTab(tab, el)` — navigation entre les onglets du menu
- `initScrollReveal()` — animation apparition au scroll (classe `.reveal`)
- `initYear()` — année copyright automatique

## 🎨 Classes CSS importantes
- `.menu-tabs` / `.menu-tab` / `.menu-tab.active` — onglets du menu
- `.menu-section` — section de chaque onglet
- `.menu-subsection-title` — titre de sous-catégorie (pleine largeur, avec couleur .y/.b/.r)
- `.menu-card` — fiche d'un item
- `.reveal` / `.reveal.visible` — animation scroll
- `.hero-btns a` — min-width 220px, gap 20px

## 🚀 Workflow
1. Modifier sur **GitHub.com**
2. **Vercel** redéploie automatiquement
3. Tester sur Vercel
4. Quand prêt → télécharger fichiers → uploader sur **GoDaddy File Manager**

## ⚠️ Règles importantes
- Pour changements dans **NAV ou HERO** → donner la section CSS complète
- Pour autres changements → donner juste les lignes à modifier
- Pour changements majeurs → donner le fichier complet
- Images toujours dans `images/` avec chemin `src="images/nom-fichier"`
- Un seul bouton Commander en ligne à la fin de la section menu

## 📝 Fonctionnalités à ajouter (liste évolutive)
- [ ] Photos réelles (hero, about, galerie)
- [ ] Section témoignages / avis Google
- [ ] Google Maps intégré
- [ ] SEO optimisé (meta tags, Open Graph, sitemap)
- [ ] Formulaire de contact fonctionnel
