# 📱 Audit graphique & mobile — bochicacafebistro.ca
**Date :** 12 octobre 2026
**Version testée :** le dossier local du 12 oct. (inclut le nouveau menu, les promos en cartes, la mosaïque de l'accueil, « Notre histoire » et la section finale)
**Méthode :** Chromium en mode téléphone (320, 375, 390, 414 px), tablette (768 px) et ordinateur (1280 px) ; parcours du menu comme un client (onglets, défilement, fiche de plat) ; audit d'accessibilité automatique axe-core (WCAG 2.2 AA) ; mesure des zones à toucher, des tailles de texte, du poids des pages et des erreurs.
**Limites :** émulation Chromium (pas un vrai iPhone/Safari) ; Google Fonts remplacées par des copies locales identiques ; carte Google non chargée (consentement refusé) ; statistiques Vercel absentes en local (seule erreur 404 relevée, normale).

---

## Verdict global

| Zone | État | En bref |
|---|---|---|
| Solidité technique | 🟢 Très bien | Aucun débordement de 320 à 1280 px, aucune erreur JavaScript, 0 violation WCAG détectée par axe-core, EN/ES sans texte français oublié |
| **Consulter le menu sur mobile** | 🟠 À améliorer | Fonctionne, mais 3 irritants : on n'arrive pas au début de la catégorie choisie, les ingrédients sont cachés, le bouton « Réserver » cache des prix |
| Premier écran mobile | 🟠 À améliorer | Pas de bouton Commander/Réserver, pas de statut Ouvert/Fermé, le premier plat n'apparaît qu'aux deux tiers de l'écran |
| Longueur de la page mobile | 🟠 Longue | 11 600 px ≈ 14 écrans de défilement |
| Cohérence graphique | 🟡 Bonne, petits détails | Ancien nom sur le bouton Facebook, note « 4.7 » à l'anglaise, étoiles noires, textes de 9-10 px |
| Poids / vitesse | 🟡 Correct | ~980 Ko au premier affichage mobile, dont 715 Ko d'images ; les vignettes du menu sont 4× plus grandes que nécessaire |

---

## 🔴 1. Priorité : consulter le menu sur mobile

### 1.1 Changer d'onglet ne ramène pas au début de la catégorie
**Constat (mesuré) :** après avoir défilé dans « Entrées » puis touché « Repas », la page reste à la même hauteur : le client se retrouve **258 px sous le début des Repas** (il manque Repas enfant, Hot-dog…). Depuis une longue catégorie vers une courte (ex. Arepas farcies), il atterrit même **après** le menu, dans « Notre histoire ».
**Correction :** dans `setMenuTab()` (`main.js`), si la barre d'onglets est collée en haut, remonter automatiquement au début de la catégorie choisie (juste sous les onglets). ~10 lignes. **Effort : faible · Impact : élevé.**

### 1.2 Les ingrédients sont cachés sur les cartes
**Constat :** sur les cartes, seuls le nom, le badge et le prix s'affichent (`.menu-card-desc { display: none }`). Pour savoir ce que contient un plat (Picadita, Bandeja paisa, Chuleta valluna… des noms inconnus pour beaucoup de Québécois), il faut ouvrir chacun des **31 plats** un par un.
**Correction :** afficher la description sur 2 lignes maximum (texte coupé par « … ») sous le nom ; la fiche complète reste au toucher. **Effort : faible · Impact : élevé.**

### 1.3 Le bouton flottant « Réserver » cache des prix
**Constat (mesuré) :** sur mobile, le bouton jaune (en bas à droite, 102 × 48 px) se pose exactement là où se trouvent les prix des cartes — il recouvrait « Bandeja paisa · 28 $ » pendant le test. Il recouvre aussi le texte de « Notre histoire ».
**Correction (au choix) :** a) barre fixe en bas de l'écran avec **Commander · Réserver · Appeler** (pleine largeur, on ajoute la même hauteur d'espace en bas de la page) ; b) garder le bouton mais le décaler à gauche/centre et ajouter de l'espace sous les cartes. **Recommandé : a)**, c'est aussi la solution au point 2.1.

### 1.4 Fiche de plat : le bouton « Commander en ligne » est hors de l'écran
**Constat (mesuré) :** la fiche fait 1 018 px de contenu pour 760 px visibles ; le bouton « Commander en ligne » est sous la liste des extras, il faut défiler pour le voir. Le bouton de fermeture fait 36 × 36 px (recommandé : 44 × 44).
**Correction :** bouton « Commander » collé en bas de la fiche ; agrandir le « × ». **Effort : faible.**

### 1.5 Petit écran (320 px) : le prix chevauche le nom
**Constat (mesuré) :** à 320 px de large (iPhone SE 1re génération, petits Android), le prix « 15,50 $ » touche le nom « Patacón montañero ».
**Correction :** réserver la place du prix ou réduire légèrement le nom à cette largeur. **Effort : très faible.**

---

## 🟠 2. Premier écran et parcours sur mobile

### 2.1 Premier écran sans action ni statut
**Constat :** sur mobile, l'accueil commence par « Notre menu » (choix fait en sept.) ; c'est bien pour le menu, mais : aucun bouton **Commander / Réserver** visible (seulement dans le menu ☰ et via le bouton flottant après 400 px de défilement), **pas de statut Ouvert / Fermé**, pas de téléphone. Le premier plat n'apparaît qu'à ~530 px sur 844.
De plus, le titre « Entrées » répète l'onglet « Entrées » juste au-dessus, avec ~120 px d'espace vide entre les deux.
**Correction :** la barre fixe du point 1.3 (Commander · Réserver · Appeler) + une petite ligne « ● Ouvert jusqu'à 21 h » sous « Notre menu » ; réduire la marge et masquer le titre de catégorie sur mobile (l'onglet actif suffit). On gagne ~200 px : le 1er plat monte dans la moitié de l'écran.

### 2.2 Page très longue (≈ 14 écrans)
Hauteurs mesurées à 390 px : Menu 2 118 · Notre histoire 1 004 · Suivez-nous 553 · **Promos 1 661** · **Avis 1 690** · FAQ 943 · **Horaires & contact 2 033** · Carte 755 · Section finale 420.
**Corrections proposées :**
- **Promos** : sur mobile, cartes plus compactes (jour + titre + talon côte à côte) ou défilement horizontal → ~700 px.
- **Avis** : défilement horizontal (on glisse d'un avis à l'autre) → ~550 px.
- **Formulaire** : replié derrière un bouton « Écrire un message » → ~1 100 px de moins.
- Gain total estimé : **~4 000 px** (≈ 5 écrans).

### 2.3 Ordre des sections
« Suivez-nous » arrive **avant** les Promos. Un client sur mobile cherche d'abord : menu → promos → horaires/adresse. Proposition : Menu → **Promos** → Notre histoire → Avis → Horaires & contact → Carte → FAQ → Suivez-nous → section finale.

### 2.4 Première visite : deux écrans à fermer
L'écran « Choisissez votre langue » puis la bannière des témoins (304 px, 36 % de l'écran) s'enchaînent. C'est conforme (Loi 25) et acceptable ; amélioration possible : réduire la bannière sur mobile (texte plus court, 2 boutons sur une ligne).

---

## 🟡 3. Cohérence graphique et détails

| # | Constat | Correction |
|---|---|---|
| 3.1 | Bouton Facebook : **« Bochica Café Bistro »** (ancien nom) | « Bochica Restaurant Colombien » (le nom de la page Facebook elle-même est à changer chez Facebook) |
| 3.2 | Section Avis : note **« 4.7 »** (format anglais en FR/ES), petite, et **5 étoiles noires** alors que les cartes ont des étoiles jaunes | « 4,7 » traduit, grand chiffre Bebas + étoiles jaunes (même style que « 4,7 ★ » de Notre histoire) |
| 3.3 | Textes trop petits : chiffres de « Notre histoire » **9 px** sur mobile, libellés des badges 10 px, FR/EN/ES 10 px, « Tous les mercredis » 11 px | Minimum 11-12 px pour les petites étiquettes |
| 3.4 | Plats sans photo (Guacamole, Mojarra frita) : logo dans un cercle doré sur fond blanc — ça fait « pas fini » | Photos à venir ; en attendant, fond crème uni avec un petit pictogramme |
| 3.5 | Horaires : le jour courant n'est pas mis en évidence | Surligner la ligne d'aujourd'hui (comme « Aujourd'hui » des promos) |
| 3.6 | Beaucoup de petites étiquettes en majuscules très espacées (JetBrains Mono 10-11 px) | Garder ce style pour les sur-titres, mais pas pour les infos utiles (prix unitaire, conditions) |
| 3.7 | Zones à toucher : menu ☰ 40 × 40, onglets du menu 42 px de haut, liens du pied de page 19 px de haut | ☰ et onglets à 44 px ; plus d'espace entre les liens du pied de page |

---

## 🟡 4. Poids et vitesse

- Premier affichage mobile : **HTML 138 Ko · CSS 83 Ko · JS 44 Ko · images 715 Ko (14 images)**. Plus grand élément affiché (LCP) : la photo des empanadas — rapide en test local.
- Les photos du menu sont en **800 × 800 px** mais affichées en **110 × 110 px** sur mobile (220 px sur écran Retina). Une version « vignette » de 300 px réduirait les images du menu d'environ **70 %** (ex. `ailes-poulet.webp` 121 Ko → ~25 Ko). La fiche de plat garde la grande photo.
- Sur ordinateur : +375 Ko pour la mosaïque de l'accueil (photos détourées) — acceptable.

---

## ✅ Ce qui est déjà bien

- **Aucun débordement horizontal** de 320 à 1280 px (la page ne « glisse » jamais de côté).
- **0 violation** WCAG 2.2 AA détectée par axe-core à toutes les tailles (contrastes, libellés, structure).
- Aucune erreur JavaScript ; pages EN et ES entièrement traduites.
- La barre d'onglets du menu **reste collée** sous l'en-tête pendant le défilement (65 px, sans trou) ; on voit qu'on peut la faire glisser (onglet coupé à droite).
- Fiche de plat : bloque le défilement de la page, se ferme avec Échap, gère le clavier.
- Les nouvelles sections (promos en cartes, Notre histoire foncée, section finale) sont cohérentes entre elles.

---

## Plan d'action proposé

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Onglets : remonter au début de la catégorie (1.1) | 15 min | ⭐⭐⭐ |
| 2 | Description courte sur les cartes du menu (1.2) | 20 min | ⭐⭐⭐ |
| 3 | Barre fixe mobile Commander · Réserver · Appeler, à la place du bouton flottant (1.3 + 2.1) | 45 min | ⭐⭐⭐ |
| 4 | Fiche de plat : bouton Commander collé en bas + « × » plus grand (1.4) | 15 min | ⭐⭐ |
| 5 | Haut de page mobile plus compact + statut Ouvert/Fermé (2.1) | 30 min | ⭐⭐ |
| 6 | Petits correctifs : 320 px, nom Facebook, « 4,7 » + étoiles, textes ≥ 11 px, jour courant, zones à toucher (1.5, 3.x) | 45 min | ⭐⭐ |
| 7 | Raccourcir la page : promos compactes, avis en carrousel, formulaire replié, nouvel ordre des sections (2.2, 2.3) | 1 h 30 | ⭐⭐ |
| 8 | Vignettes 300 px pour le menu (4) | 20 min | ⭐ |
