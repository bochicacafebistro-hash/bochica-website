# 📋 CONTEXTE — Site Web Bochica

## 🏠 Description
Site vitrine trilingue (FR/EN/ES) pour le **restaurant colombien Bochica** à Québec.
Déployé sur **Vercel** via **GitHub** (100% web, aucune installation locale).
Site statique — vanilla HTML/CSS/JS, un seul fichier `index.html`.

## 🔗 Liens
- GitHub : https://github.com/bochicacafebistro-hash/bochica-website
- Vercel : https://bochica-website.vercel.app (ou nom similaire)
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
- **Style** : Moderne et minimaliste — fond blanc/noir, accents colorés
- **Palette** (couleurs du logo colombien) :
  - Jaune : `#f5a623` — couleur accent principale
  - Bleu : `#4a90e2` — accent secondaire
  - Rouge : `#e74c3c` — accent tertiaire
  - Noir : `#0a0a0a` — fond dark
  - Blanc : `#ffffff` — fond light
- **Tricolore** (jaune/bleu/rouge) utilisé comme barre décorative partout
- **Typographie** : Helvetica Neue, sans-serif

## 🖼️ Logos
Deux versions dans le repo GitHub :
- `Logo_Bochica_2026-8.png` — logo rond doré (utilisé dans le hero, filtré blanc)
- `Logo_Bochica_2026-6__1_.png` — logo texte avec barre tricolore (nav + footer)

## 📸 Photos (à uploader par le client)
- `hero.jpg` — photo principale fond du hero
- `about.jpg` — photo restaurant ou cuisine
- `gallery1.jpg` à `gallery5.jpg` — galerie photos

## 🗂️ Structure du site (sections dans index.html)
1. **Nav** — logo + liens + sélecteur de langue + boutons Commander/Réserver
2. **Hero** — plein écran avec photo, phrase d'accroche, 2 boutons CTA
3. **Band** — barre noire avec infos rapides (horaires, adresse, téléphone)
4. **About** — Notre histoire, photo + stats tricolores
5. **Menu Preview** — 3 cartes (Empanadas, Bandeja Paisa, Limonada de Coco)
6. **Gallery** — grille 4 colonnes, photos du restaurant
7. **Horaires & Contact** — tableau horaires + infos contact
8. **Réservation** — CTA final avec boutons réserver + appeler
9. **Footer** — logo + liens + copyright + barre tricolore

## 🌐 Multilingue
Système de traduction via attributs HTML `data-fr`, `data-en`, `data-es`.
Fonction JS `setLang(lang)` qui met à jour tous les éléments.
Boutons FR / EN / ES dans la nav.

## 🚧 Contraintes
- Aucune installation locale — tout via GitHub.com + Vercel
- Vanilla HTML/CSS/JS — pas de framework
- Un seul fichier `index.html`
- Vercel redéploie automatiquement à chaque commit GitHub
- Photos uploadées directement dans le repo GitHub

## 📝 Fonctionnalités à ajouter (liste évolutive)
- [ ] Photos réelles du restaurant
- [ ] Menu complet (page séparée ou section expandable)
- [ ] Section témoignages / avis clients
- [ ] Intégration Google Maps
- [ ] Section événements spéciaux
- [ ] SEO (meta tags, Open Graph)
