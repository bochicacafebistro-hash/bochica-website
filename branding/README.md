# 🎨 Pack logo Bochica

Pack complet du logo wordmark **BOCHICA** dans 4 variantes de couleurs et 3 formats d'usage. Tous les fichiers sont prêts à l'emploi pour le web, l'impression et les réseaux sociaux.

## 📦 Contenu

```
branding/
├── svg/                            ← Vectoriel (zéro perte, taille infinie)
│   ├── bochica-logo-dark.svg               BOCHI crème + CA jaune (fond foncé)
│   ├── bochica-logo-light.svg              BOCHI noir + CA jaune (fond clair)
│   ├── bochica-logo-mono-black.svg         BOCHICA tout noir
│   └── bochica-logo-mono-white.svg         BOCHICA tout blanc
│
├── png/                            ← Raster transparent (4 tailles × 4 variantes)
│   ├── bochica-logo-dark-{256,512,1024,2048}w.png
│   ├── bochica-logo-light-{256,512,1024,2048}w.png
│   ├── bochica-logo-mono-black-{256,512,1024,2048}w.png
│   └── bochica-logo-mono-white-{256,512,1024,2048}w.png
│
└── social/                         ← Carrés 1080×1080 pour Instagram / Facebook / Google
    ├── bochica-square-dark.png             Logo couleur sur fond noir
    ├── bochica-square-light.png            Logo couleur sur fond crème
    ├── bochica-square-mono-white-on-black.png   Logo blanc épuré sur noir
    └── bochica-square-mono-black-on-cream.png   Logo noir épuré sur crème
```

## 🎯 Quand utiliser quoi

| Usage | Fichier conseillé |
|---|---|
| Site web (header, favicon, partage) | `svg/bochica-logo-light.svg` ou `dark` selon le fond |
| Photo de profil Instagram / Facebook / Google My Business | `social/bochica-square-dark.png` (recommandé) |
| Présentation / pitch deck | `svg/bochica-logo-light.svg` (fond blanc) |
| Cartes d'affaires / impression couleur | `svg/bochica-logo-light.svg` (vectoriel = qualité parfaite) |
| Impression noir et blanc / fax / tampon | `svg/bochica-logo-mono-black.svg` |
| Filigrane sur photo foncée | `svg/bochica-logo-mono-white.svg` |
| Watermark sur post réseau social | `png/bochica-logo-mono-white-512w.png` |

## 🎨 Couleurs du logo

| Couleur | Hex | Usage |
|---|---|---|
| Crème papier | `#f5f1e8` | « BOCHI » sur fond foncé |
| Noir chaud | `#0e0d0c` | « BOCHI » sur fond clair |
| Jaune Bochica | `#F7B32C` | « CA » accent (toujours) |
| Blanc | `#ffffff` | Variante mono-blanc |

## 🔤 Typographie

Le logo s'inspire de **Bebas Neue** (Google Fonts, Open Font License) — la fonte officielle utilisée sur le site Bochica. Pour cette version, les glyphes ont été tracés à partir de **Liberation Sans Narrow Bold** afin de générer des SVG 100 % portables (aucune dépendance de fonte au moment de l'affichage).

Pour une version pixel-perfect Bebas Neue, possible si tu fournis le fichier `BebasNeue-Regular.ttf` (téléchargeable ici : https://fonts.google.com/specimen/Bebas+Neue) — je pourrais alors regénérer le pack.

## 📐 Format des SVG

- **viewBox** standardisée : `605.6 × 105` unités
- **Pas de fond** par défaut → transparent
- **Texte converti en paths** → s'affiche identiquement partout (Photoshop, Illustrator, Figma, navigateurs, impression)
- **Titre accessible** (`<title>Bochica</title>`) pour les lecteurs d'écran

## ⚖️ Espaces de protection

Pour conserver la lisibilité du logo, prévoir une marge minimale autour égale à **la hauteur du « B »** (≈ 100 unités, soit l'équivalent de la hauteur des lettres). Ne pas placer d'autre élément graphique dans cette zone.

## 📏 Taille minimale recommandée

- **Web** : 120 px de large minimum
- **Impression** : 25 mm de large minimum

En dessous, préférer une version simplifiée (par exemple un monogramme « B »).
