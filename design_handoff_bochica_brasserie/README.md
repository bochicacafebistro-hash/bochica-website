# Handoff — Bochica · Redesign "Brasserie"

## Contexte
Redesign complet du site de **Bochica**, restaurant colombien à Québec (Saint-Roch), dans une direction **brasserie / sports-bar à la La Cage** : ambiance chaude et tardive, musique live, matchs de soccer, happy hour, typographie condensée impactante (Bebas Neue), photos d'ambiance sombres avec halo doré. Accent couleur **jaune**.

Le site existant est poli et "bistro-chic" ; cette direction assume une énergie plus décontractée et festive tout en gardant la qualité gastronomique.

## À propos des fichiers de design
Les fichiers de ce bundle sont des **maquettes HTML de référence** — des prototypes qui montrent l'intention visuelle et les comportements attendus. **Ils ne sont pas à copier tels quels** en production.

La tâche est de **recréer ces maquettes dans l'environnement technique du site existant** (WordPress, React, Next.js, Astro, statique HTML/CSS, etc.) en suivant les patterns et la stack déjà en place. Si aucun stack n'est encore choisi, prendre la meilleure décision pour le projet (Next.js + Tailwind est un bon défaut pour un site restaurant).

## Fidélité
**Haute fidélité (hifi).** Les couleurs, tailles, espacements, typographies et interactions sont définitifs. Le développeur doit reproduire le design au pixel près, en utilisant les composants / la bibliothèque CSS du projet cible.

---

## Pages incluses

Le prototype est un SPA à 3 vues, navigables via la nav et persistées dans `localStorage` (clé `bochica-br-view`). Dans l'implémentation réelle ce seront **3 routes distinctes** : `/`, `/menu`, `/evenements`.

### 1. Home (`/`)
**But** : vitrine principale — identité, ambiance, plats signatures, histoire, agenda, horaires, CTA réservation.

**Sections, de haut en bas :**
1. **Hero plein-écran** (`min-height: min(820px, 100vh)`) — fond sombre avec halo doré, nav superposée (mode "dark"), titre gigantesque en deux lignes :
   - Eyebrow : `BOCHICA · QUÉBEC`
   - H1 : `QUÉBEC — SAINT-ROCH` (tiret en opacité 0.5)
   - Sous-titre en jaune : `Brasserie colombienne` (uppercase, Bebas)
   - 3 boutons : `VOIR LE MENU` (outline), `COMMANDER` (jaune), `RÉSERVER` (jaune)
2. **Ticker jaune** — bande horizontale jaune `#f7c81e` avec texte noir en Bebas, défilant visuellement :
   `OUVERT JUSQU'À 23H ★ SALSA LE SAMEDI ★ MATCH EN DIRECT ★ HAPPY HOUR 17H-19H ★ …`
3. **Plats signatures** — eyebrow `LA MAISON`, H2 `Saveurs de Colombie.` (mot "Colombie" en jaune), puis grille auto-fit `minmax(260px, 1fr)` de 4 cartes 4:5 avec image + overlay sombre bas + titre en Bebas.
4. **Histoire** — grille 2 colonnes (`repeat(auto-fit, minmax(360px, 1fr))`) : image d'ambiance à gauche, bloc crème `#f5f1e8` à droite avec H2 où le mot **brasserie** est surligné en jaune (`background: var(--b-red); padding: 0 8px`).
5. **Événements** — eyebrow `CALENDRIER`, H2 `À l'affiche cette semaine` (mot "affiche" en jaune), 4 cartes d'événements (image + badge jour jaune + titre).
6. **Horaires + contact** — fond `#1a1510`, deux colonnes (`NOUS TROUVER` / `HORAIRES`), horaires en liste séparée par bordures.
7. **CTA final** — plein-écran `min-height: 420px`, fond photo d'ambiance, H2 géant centré : `Venez manger, rester, danser.` (mot "manger" en jaune), bouton jaune `RÉSERVER MAINTENANT`.

### 2. Menu (`/menu`)
**But** : consultation du menu par catégorie.

- Nav en mode "light" sur fond crème `#f5f1e8`
- Barre de sous-nav avec badge **☰ MENU** (jaune) + lien `BOISSONS · COCKTAILS`
- **Layout 2 colonnes** : sidebar sticky à gauche (catégories), contenu à droite
- Sidebar : liste verticale des catégories, active indiquée par point jaune + padding-left animé
- Contenu : H2 de la catégorie active + liste de plats
- Chaque plat = ligne `grid-template-columns: minmax(140px, 200px) 1fr auto` — image + nom/description/tags + prix
- Tags visuels : cercles bordés `N`, `V`, `GF` (nouveau / végé / sans gluten)
- Badge `NOUVEAU` jaune en absolute sur la première image de chaque catégorie
- Responsive : passe en 1 colonne sous 760px (`--pad: 20px`)

**Catégories** : Entrées, Arepas farcies, Repas, Cocktails.

### 3. Événements (`/evenements`)
**But** : afficher les soirées / événements de la semaine.

- Hero compact : eyebrow `À L'AFFICHE`, H1 `Les soirées de la semaine.` (mot "soirées" en jaune)
- Grille auto-fit `minmax(320px, 1fr)` de cartes sombres
- Chaque carte : image 16:10 + badge jour jaune (top-left) + badge kicker noir translucide (top-right) + titre Bebas + description + ligne footer (meta + bouton `RÉSERVER →` jaune)

---

## Design tokens

### Couleurs
```
--b-bg      : #0e0d0c   /* fond principal, quasi-noir chaud */
--b-ink     : #f5f1e8   /* texte sur fond sombre, crème */
--b-red     : #f7c81e   /* accent jaune (nommé "red" pour compat, à renommer en --b-accent) */
--b-red-ink : #0e0d0c   /* texte sur accent jaune */

Surface sombre secondaire : #1a1510 (cartes, sections horaires)
Overlay photo           : rgba(14,13,12, .25 → .85) gradient vers le bas
Bordure sur sombre      : rgba(245,241,232, .08) pour cartes, .25/.3 pour boutons
Bordure sur clair       : rgba(14,13,12, .08) pour sépa, .15 pour boutons
```

### Typographies
- **Display** : `Bebas Neue` (Google Fonts) — tous les H1/H2/H3, boutons, eyebrows, menu nav. Uppercase, letter-spacing entre `.01em` et `.28em` selon la taille.
- **Corps** : `Inter` (weights 300–700) — paragraphes, descriptions, labels, prix.
- **Mono** : `JetBrains Mono` (weights 400/500/600) — microcopy type `[ photo · ambiance ]`, métadonnées éventuelles.

### Échelles typographiques clés
| Usage | Taille | Line-height | Letter-spacing |
|---|---|---|---|
| H1 Hero | `clamp(52px, 10vw, 180px)` | 0.95 | 0.005em |
| H1 Events | `clamp(56px, 9vw, 180px)` | 1 | default |
| H2 Signature / CTA | `clamp(40px, 6vw, 96px)` → `clamp(48px, 7vw, 128px)` | 0.95 | default |
| H2 Histoire | `clamp(36px, 5vw, 72px)` | 0.95 | default |
| H3 Carte | `24–28px` | 1–0.95 | 0.01em |
| Eyebrow | 13px | default | 0.28em |
| Body | 14–16px | 1.55 | default |
| Menu badge | 11–12px | default | 0.16em |

### Espacements
- Padding latéral global : `--pad: 40px` (desktop) / `20px` (<760px)
- Padding vertical section : `80–90px`
- Gap grilles : 14–18px pour cartes, 40–60px pour colonnes majeures
- Border radius : `3–4px` pour badges/cartes photo, `6–8px` pour cartes événements, `100px` pour boutons (pill)

### Boutons
- **Primaire (jaune)** : `background: #f7c81e; color: #0e0d0c; padding: 13px 22px; border-radius: 100px; font: Bebas 12.5px/1; letter-spacing: .18em; font-weight: 600; text-transform: uppercase;`
- **Outline sombre** : même dimensions, `background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,.85);`
- **Outline clair** : même dimensions, `border: 1.5px solid rgba(14,13,12,.15); color: #0e0d0c;`
- **Icône ronde** (nav carrousel) : `48×48px`, radius 100, bordure `rgba(245,241,232,.3)`

---

## Interactions & comportement

- **Nav** : clic sur logo → home. Clic sur `MENU` / `ÉVÉNEMENTS` → routes correspondantes. Autres items (`RÉSERVATIONS`, `CARTES-CADEAUX`, `HORAIRES`) actuellement non-liés — à câbler vers ancres ou pages selon besoin.
- **Sur chargement de page** : `window.scrollTo({ top: 0 })` à chaque changement de vue.
- **Persistance** : vue active en `localStorage['bochica-br-view']` — à **ne pas porter** en prod (le routing gère ça).
- **Sidebar menu** : clic sur catégorie met à jour l'état local et fait glisser un point jaune indicateur à gauche + padding-left animé (`transition: padding-left .2s`).
- **Hover states** (à définir dans le build) : boutons jaunes → légère assombrissement (filter brightness 0.95) ; outline → fond accent avec 10% opacité ; cartes événements → léger lift (`translateY(-2px)` + ombre).
- **Responsive** : tous les `grid-template-columns` utilisent `repeat(auto-fit, minmax(…))` — le layout se dégrade naturellement. Points de bascule principaux autour de 760px.

---

## Contenu (copy exact utilisé)

### Infos pratiques
- **Adresse** : 430 Rue Saint-Vallier Ouest, Saint-Roch, Québec
- **Tél** : 367-330-8220
- **Email** : bochicacafebistro@gmail.com
- **Horaires** : Lun-Mar fermé · Mer-Jeu 17h-21h · Ven 12h-22h · Sam 13h-23h · Dim 13h-21h

### Menu (extrait)
Voir le fichier HTML — `BOCHICA.menu` contient 4 catégories et ~15 plats avec prix. À valider avec l'équipe Bochica avant publication.

### Événements (exemples)
- **SAM** — Soirée Salsa : "Salsa & Cumbia en direct"
- **VEN** — Match de soccer : "Colombie vs…"
- **20 JUI** — Fête nationale : "Independencia de Colombia"
- **JEU** — Atelier : "Empanadas maison"

### Tagline hero
`QUÉBEC — SAINT-ROCH` / `Brasserie colombienne`

### Ticker
`OUVERT JUSQU'À 23H ★ SALSA LE SAMEDI ★ MATCH EN DIRECT ★ HAPPY HOUR 17H-19H ★`

---

## Assets à produire (à la charge du dev / client)

Le prototype utilise **des placeholders générés en CSS** à la place de vraies photos :
- `<FoodPH>` : carré/rectangle avec motif rayé diagonal beige et label `[ photo · <nom du plat> ]`
- `<Ambient>` : photo d'ambiance simulée (fond sombre rayé + halo radial doré) pour les hero et cartes événements

**À remplacer en prod par de vraies photos :**
- 4 photos de plats signatures (Bandeja Paisa, Arepa Reina, Empanadas, Picada) — format 4:5
- 1 photo d'intérieur / bar pour le hero home (sombre, chaude, éclairage ambré)
- 1 photo d'intérieur pour la section histoire
- 1 photo de terrasse / soirée pour le CTA bas
- 4+ photos d'événements (salsa, match, fête, atelier) — format 16:10 ou 4:3
- Photos des plats au menu (format 4:3)

Le traitement visuel attendu : photos **sombres**, éclairage **chaud/doré**, grain fin OK, profondeur de champ marquée. Éviter les photos blanches sur fond blanc.

---

## Notes d'implémentation

- Le prototype est **un seul fichier HTML** avec React 18 + Babel standalone pour démo. En prod : router standard, composants séparés.
- `Bebas Neue` → à précharger (`<link rel="preload">`) car utilisée massivement au dessus du fold.
- Les halos dorés dans `<Ambient>` sont générés en pur CSS (`radial-gradient`) — une fois remplacés par de vraies photos, prévoir le même traitement (grading chaud, overlay sombre en bas pour lisibilité du texte).
- Le ticker jaune est statique dans le proto — en prod, l'animer en CSS `@keyframes` translation horizontale infinie.
- Le mot `brasserie` dans la section histoire utilise un **background highlight** jaune inline — attention à l'accessibilité contraste (jaune + texte noir = OK, ratio >7:1).
- La navigation entre routes doit préserver l'état de scroll de manière prévisible : scroll top à chaque changement de vue.

---

## Fichiers joints

- `Bochica Brasserie.html` — prototype haute-fidélité, 3 vues dans un seul fichier (Home / Menu / Événements).
