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
  - Noir : `#0a0a0a` — fond dark (hero, band, réservation, footer)
  - Blanc : `#ffffff` — fond sections claires
- **Tricolore** jaune/bleu/rouge utilisé comme barre décorative partout
- **Typographie** : Helvetica Neue, sans-serif

## 🖼️ Logos & Images
Tous les fichiers sont dans le dossier `images/` :
- `images/Logo Bochica 2026-7.png` — logo utilisé partout (nav, hero, footer)
- `images/Logo Bochica 2026-8.png` — logo rond doré (non utilisé pour l'instant)
- `images/Logo Bochica 2026-6 (1).png` — logo texte (non utilisé pour l'instant)
- `images/hero.jpg` — photo fond hero (à uploader)
- `images/about.jpg` — photo section Notre histoire (à uploader)
- `images/gallery1.jpg` à `images/gallery5.jpg` — galerie (à uploader)

## 🗂️ Structure des fichiers
bochica-website/
├── index.html          ← HTML uniquement, sans CSS ni JS inline
├── CONTEXTE.md         ← ce fichier
├── css/
│   └── style.css       ← tout le CSS
├── js/
│   └── main.js         ← tout le JavaScript
└── images/
├── Logo Bochica 2026-7.png
├── Logo Bochica 2026-8.png
├── Logo Bochica 2026-6 (1).png
├── hero.jpg
├── about.jpg
└── gallery1-5.jpg

## 📄 Sections du site (dans index.html)
1. **Nav** — logo + liens + sélecteur FR/EN/ES + boutons Commander/Réserver
2. **Hero** — fond noir, logo blanc filtré, phrase d'accroche, 2 boutons CTA
3. **Band** — barre noire avec infos rapides (horaires, adresse, téléphone)
4. **About** — Notre histoire, photo + décoration tricolore + stats
5. **Menu Preview** — 3 cartes (Empanadas, Bandeja Paisa, Limonada de Coco)
6. **Gallery** — grille 4 colonnes sur fond noir
7. **Horaires & Contact** — tableau horaires + infos contact avec icônes colorées
8. **Réservation** — CTA final fond noir, boutons réserver + appeler
9. **Footer** — logo + liens + copyright + barre tricolore

## 🌐 Multilingue
- Système via attributs HTML `data-fr`, `data-en`, `data-es`
- Fonction JS `setLang(lang)` dans `js/main.js`
- Langue sauvegardée dans `localStorage`
- Boutons FR / EN / ES dans la nav

## ✨ Fonctionnalités JS (main.js)
- `setLang(lang)` — changement de langue
- `restoreLang()` — restaure la langue depuis localStorage
- `initNav()` — nav qui devient sombre au scroll
- `toggleMenu()` — menu hamburger mobile
- `initScrollReveal()` — animation apparition au scroll (classe `.reveal`)
- `initYear()` — année copyright automatique

## 🚀 Workflow
1. Modifier fichiers sur **GitHub.com** directement
2. **Vercel** redéploie automatiquement
3. Tester sur Vercel
4. Quand prêt → télécharger tous les fichiers → uploader sur **GoDaddy File Manager**

## 🚧 Contraintes
- Aucune installation locale — tout via GitHub.com + Vercel
- Vanilla HTML/CSS/JS — pas de framework
- Fichiers séparés : `css/style.css` + `js/main.js` + `index.html`
- Images toujours dans `images/` avec chemins `src="images/nom-fichier.ext"`
- Vercel redéploie automatiquement à chaque commit GitHub

## 📝 Fonctionnalités à ajouter (liste évolutive)
- [ ] Photos réelles du restaurant (hero, about, galerie)
- [ ] Menu complet (page séparée ou PDF)
- [ ] Section témoignages / avis Google
- [ ] Intégration Google Maps
- [ ] Section événements spéciaux
- [ ] SEO optimisé (meta tags, Open Graph, sitemap)
- [ ] Formulaire de contact fonctionnel
