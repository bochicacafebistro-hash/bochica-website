# 🔍 AUDIT DESIGN — Site Bochica Café Bistro

**Date :** 17 avril 2026
**Portée :** Accessibilité WCAG 2.1 AA · Design system · Textes UX · Critique design générale
**Fichiers audités :** `index.html` (1443 lignes), `css/style.css` (446 lignes), `js/main.js` (518 lignes)

---

## 📌 Constats généraux

Trois écarts structurels majeurs entre le **CONTEXTE.md** et l'état réel du code :

1. **La palette documentée n'est plus la palette utilisée.** Le CONTEXTE annonce noir/jaune/bleu/rouge tricolore, alors que `style.css:2-17` définit en vérité un système beige/crème (`--white:#faf6f0`, `--cream:#f3ede3`) avec un accent **bordeaux** `#6b1a1f` comme couleur principale des boutons, titres et CTA. Le tricolore colombien existe encore, mais relégué aux ornements.
2. **La typographie documentée (Helvetica Neue) n'est pas celle chargée.** Le HTML charge Fraunces (serif, titres) + Inter (sans-serif, corps) via Google Fonts (`index.html:49`). Helvetica Neue n'apparaît qu'en fallback.
3. **Les "5 sections" du CONTEXTE sont devenues 12+** : Signatures, Événements, Avis, Localisation, Formulaire de contact, Modale de plat, FAB mobile ont été ajoutés sans mise à jour du CONTEXTE.

---

## 1. ♿ ACCESSIBILITÉ (WCAG 2.1 AA)

### 1.1 Contrastes de couleurs (calculés)

| Combinaison | Fichier:ligne | Ratio | WCAG | Sévérité |
|---|---|---|---|---|
| `.reviews-rating .rating-sub` `#6f635f` sur `#f3ede3` | `style.css:334` | ~4.2:1 | **ÉCHEC AA** | 🔴 |
| `.form-privacy` `#6f635f` 11.5px sur `#f3ede3` | `style.css:360` | ~4.2:1 | **ÉCHEC AA** | 🔴 |
| `.stat-lbl` `#6f635f` sur `#faf6f0` | `style.css:119` | ~4.55:1 | AA tangent | 🟡 |
| `.hours-closed` `#6f635f` italique 13px | `style.css:195` | ~4.55:1 | AA tangent | 🟡 |
| `.menu-card-extras` `#6f635f` 12px | `style.css:170` | ~4.55:1 | AA limite | 🟡 |
| `.btn-nav-order` noir sur jaune | `style.css:40` | ~8.2:1 | AAA OK | 🟢 |

**Recommandation 🔴 :** Assombrir `--text3` de `#6f635f` à `#5e524f` (ratio ~5.2:1) pour passer AA sur fond crème.

### 1.2 Attributs alt sur les images

🟡 **`index.html:1411`** : `<img id="dish-modal-img" src="" alt=""/>` — l'alt reste vide lorsqu'une photo est injectée dynamiquement. Dans `main.js:300`, un `alt` devrait être propagé depuis la vignette de la carte (`main.js:148-149`).

### 1.3 Labels / ARIA sur boutons

| Élément | Ligne | Problème | Sévérité |
|---|---|---|---|
| `.nav-mobile-btn` hamburger | `index.html:404-406` | Aucun `aria-label`, aucun `aria-expanded`, aucun `aria-controls` | 🔴 |
| `.lang-btn FR/EN/ES` | `index.html:395-397` | Textes "FR/EN/ES" sans `aria-label`, pas de `aria-pressed` | 🟡 |
| Onglets menu `.menu-tab` | `index.html:451-458` | Pas de `role="tab"`, `aria-selected`, ni tablist parent | 🔴 |
| `#dish-modal` | `index.html:1407` | Pas de `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | 🔴 |

### 1.4 Attribut `lang` + cohérence multilingue

🔴 **Critique** — `main.js:4-15` : `setLang()` ne met PAS à jour `document.documentElement.lang`. Les lecteurs d'écran liront l'espagnol avec un accent français.

**Correction :**
```js
document.documentElement.lang = (lang === 'es') ? 'es' : lang === 'en' ? 'en-CA' : 'fr-CA';
```

### 1.5 Cibles tactiles (≥ 44×44 px)

| Élément | Dimensions | Sévérité |
|---|---|---|
| `.lang-btn` | ~27 × 36 px | 🔴 |
| `.nav-mobile-btn` (hamburger) | ~22 × 24 px | 🔴 |
| `.btn-nav-order/reserve` | ~34 px haut | 🟡 |
| `.menu-tab` | ~33 px haut | 🟡 |
| `.fab-reserve` | ~44 px | 🟢 |

### 1.6 Navigation clavier

🔴 **Critique** — `main.js:201-203` : les cartes de plats sont des `<div>` cliquables sans `tabindex`, `role="button"`, ni handler `keydown`. Un utilisateur clavier ne peut PAS ouvrir les modales.

**Correction :**
```js
card.setAttribute('tabindex', '0');
card.setAttribute('role', 'button');
card.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDish(card); }
});
```

La modale n'implémente pas non plus de **focus trap** ni ne restaure le focus sur la carte d'origine à la fermeture.

### 1.7 Landmarks ARIA

🔴 **Critique — `<main>` manquant** : tout le contenu est à la racine de `<body>`. Envelopper de la ligne 410 à 1368 dans `<main id="main">`.

### 1.8 `prefers-reduced-motion`

🔴 **Critique** — `style.css:372-373` : aucune prise en charge. À ajouter en fin de `style.css` :
```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{
    animation-duration:.01ms!important;
    transition-duration:.01ms!important;
    scroll-behavior:auto!important
  }
  .reveal{opacity:1;transform:none}
}
```

### 1.9 Liens externes `target="_blank"` + `rel="noopener"`

🟡 **7 liens externes sans `rel="noopener noreferrer"`** (sécurité + perf) :
- `index.html:400, 401, 421, 423, 1243, 1365, 1381`

---

## 2. 🎨 COHÉRENCE DU DESIGN SYSTEM

### 2.1 Tokens de couleur

🟢 **Bon** : `style.css:2-17` définit un bloc `:root` de variables bien organisé.

🟡 **Incohérences** — couleurs hardcodées malgré l'existence des variables :
- `#faf6f0` répété 9× au lieu de `var(--white)` (lignes 28, 56, 179, 212, 223, 307, 315, 319, 325)
- `#ffffff` répété 4× au lieu de `var(--white)` (lignes 45, 263, 326, 385)
- Couleurs statut `#7bc47f`, `#e77165` sans tokens (ligne 78-79)
- Badges : 6 couleurs hardcodées (lignes 161-164)
- Styles inline : `index.html:952-954, 1129-1168`

🔴 **Classes mensongères** : `.y/.b/.r` sur `.menu-card-cat` et `.menu-subsection-title` pointent **toutes vers `var(--accent)`** (bordeaux) au lieu du tricolore jaune/bleu/rouge. Refactor non nettoyé.

### 2.2 Spacing — valeurs arbitraires

🟡 **Majeur** — plus de 30 valeurs différentes de spacing dans `style.css` (4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 20, 22, 23, 24, 26, 28, 32, 34, 36, 40, 44, 48, 52, 60, 68, 70, 76, 80, 96, 110, 120 px).

**Recommandation :** introduire une échelle `--sp-1:4px; --sp-2:8px; --sp-3:16px; --sp-4:24px; --sp-5:32px; --sp-6:48px; --sp-8:64px; --sp-10:96px;`.

### 2.3 Typography

🔴 **Majeur** — ~25 tailles de police distinctes (9, 10, 10.5, 11, 11.5, 12, 13, 13.5, 14, 14.5, 15, 15.5, 17, 18, 20, 22, 24, 26, 28, 30, 48 px + clamps). Aucune échelle.

**Recommandation :** définir `--fs-xs:11px; --fs-sm:13px; --fs-base:15px; --fs-lg:17px; --fs-xl:22px; --fs-2xl:30px; --fs-3xl:48px`.

### 2.4 Composants dupliqués

🔴 **5 styles de boutons** qui font quasi la même chose :

| Classe | Ligne | Rôle |
|---|---|---|
| `.btn-primary` | `style.css:62` | Bordeaux principal |
| `.btn-outline` | `style.css:64` | Transparent |
| `.btn-blue` | `style.css:66` | **Identique à `.btn-primary`** — nom mensonger |
| `.btn-nav-order` | `style.css:40` | Jaune nav |
| `.btn-nav-reserve` | `style.css:42` | Outline nav |
| `.btn-outline-dark` | `style.css:241` | Outline foncé |
| `.event-social-btn` | `style.css:325` | Outline arrondi |

**Recommandation :** réduire à 3 variantes (`.btn--primary`, `.btn--ghost-light`, `.btn--ghost-dark`) + 2 tailles (`.btn--sm`, `.btn--lg`).

### 2.5 Border-radius

🟡 Valeurs : `2px, 3px, 4px, 8px, 10px, 12px, 14px, 16px, 20px, 40px, 50%`. Pas d'échelle. Recommandation : `--radius-sm:4px; --radius-md:8px; --radius-lg:16px; --radius-pill:40px; --radius-full:50%`.

---

## 3. ✍️ TEXTES UX (microcopy)

### 3.1 Incohérences de CTA

| Libellé | Ligne | Contexte |
|---|---|---|
| "Commander" | `index.html:400, 1381` | Nav, Footer |
| "Commander en ligne" | `index.html:422, 1243, 1436` | Hero, Contact, Modale |
| "Réserver" | `index.html:401, 1404` | Nav, FAB |
| "Réserver une table" | `index.html:424` | Hero |
| "Réserver en ligne" | `index.html:1365` | Section res |

**Recommandation :** figer 2 variantes — "Commander" (nav/footer) et "Commander en ligne" (CTA principaux).

### 3.2 Qualité de la traduction ES

🟡 **"Boles"** à plusieurs endroits (`index.html:453, 544, 712`) est anglicisé. Les Colombiens diraient plutôt **"Bowls"** (emprunt accepté) ou **"Tazones"**.

### 3.3 Format d'heure EN

🟡 **`main.js:353-356`** : `formatHour()` produit `"9pm"`. Convention nord-américaine standard : `"9 PM"` ou `"9:00 PM"` (espace + majuscules).

### 3.4 Jargon espagnol non traduit

🟡 Plus de 20 termes sans glose FR :
- `index.html:488` "Morcilla" : boudin noir colombien
- `index.html:501-502` "Patacones" : rondelles de plantain vert frites écrasées (pas juste "plantain frit")
- `index.html:475` "Sancochito" : aucune description (soupe colombienne)
- `index.html:895, 904` "Gelatina de Colores", "Brazo de Reina" : non expliqués

### 3.5 Liens externes — signalement

🟡 Aucun indicateur visuel que les liens Commander/Réserver ouvrent un nouvel onglet. Ajouter une icône `↗` ou `aria-label="… (ouvre dans un nouvel onglet)"`.

### 3.6 Incohérence de prix

🟡 **`index.html:998`** : "Prix variable" pour la Picada alors que `index.html:619` affiche "36 $".

### 3.7 Faux avis ?

🟡 **`index.html:1127, 1140, 1153, 1166`** : les 4 avis 5 étoiles (Marie, Jean-François, Sofia, Alexandre) semblent factices. Si placeholders, à remplacer par de vrais avis Google avec consentement; sinon obtenir consentement écrit.

---

## 4. 🎭 CRITIQUE DESIGN GÉNÉRALE

### 4.1 Actifs images manquants

🔴 **Critique — images inexistantes** :
- `hero.jpg` : préchargé (`index.html:38`) mais absent → 404 + bande passante gaspillée
- `bandeja-medellin.jpg` : référencé dans Schema.org (lignes 57, 92, 98), OG (62), Twitter Card (78) → **partages sociaux cassés**
- `gallery1.jpg` à `gallery5.jpg` : galerie affiche des placeholders 📷
- 20+ photos de plats : toutes absentes (`yuca-frita.jpg`, `canastica.jpg`, `picadita.jpg`, etc.)

### 4.2 Performance

🔴 **Problèmes critiques** :

| Fichier | Taille | Problème |
|---|---|---|
| `paracones de la casa.png` (racine) | **1.5 MB** | Orphelin, typo ("paracones"). **À supprimer.** |
| `images/Logo Bochica 2026-3.png` | **802 KB** | Logo en PNG 800 KB, préchargé ET utilisé comme placeholder de chaque carte menu |
| `images/Logo Bochica 2026-6 (1).png` | 217 KB | Non utilisé |
| `images/Logo Bochica 2026-7.png` | 205 KB | Non utilisé |
| `images/Logo Bochica 2026-7 (1).png` | 145 KB | Référencé Schema.org mais pas UI |
| `images/Logo Bochica 2026-8.png` | 40 KB | Non utilisé |
| `preview-ambiances.html` | 21 KB | Fichier dev à retirer |
| `.DS_Store` | 6 KB | macOS, à retirer |
| `images/test` | 8 octets | Résiduel |

**Recommandations :**
1. Convertir le logo en **SVG** ou WebP ≤ 100 KB (re-exporter à 440px max pour retina 220×2).
2. Supprimer le preload `hero.jpg` si l'image n'existe pas, ou uploader l'image.
3. Supprimer tous les fichiers orphelins.
4. Compresser les futures photos via [squoosh.app](https://squoosh.app) en WebP + fallback JPG.

### 4.3 SEO

🟢 **Excellent** — Schema.org Restaurant + Menu + FAQPage, hreflang, OG complet, Twitter Card.

🟡 **Points :**
- `hreflang` pointe tous vers la même URL (acceptable si client-side, suboptimal pour Google)
- `<meta name="revisit-after">` (ligne 20) : meta obsolète
- `action="https://formspree.io/f/VOTRE_ID_FORMSPREE"` (ligne 1282) : placeholder toujours en place

### 4.4 Conformité Loi 25 (Québec)

🔴 **Critique** — Obligation légale au Québec :
- Aucune politique de confidentialité liée (mentionnée ligne 1323 "Vos informations ne seront jamais partagées" mais sans lien)
- Aucune page `privacy.html` ni `mentions-legales.html`
- Le formulaire de contact collecte nom + courriel + téléphone sans consentement explicite

### 4.5 Modale de plat

- 🔴 Pas de focus trap
- 🔴 Pas de restauration du focus à la fermeture
- 🟡 Pas de `role="dialog"` ni `aria-modal="true"`
- 🟢 Fermeture par Escape OK (`main.js:516-518`)
- 🟢 Fermeture par clic overlay OK

---

## 🚨 PRIORITÉS D'ACTION — TOP 10

| # | Sévérité | Constatation | Fichier:lignes | Effort |
|---|---|---|---|---|
| 1 | 🔴 | **Images manquantes partout** (hero, bandeja-medellin, galerie, 20+ plats) → partages sociaux cassés, 404 en production | `index.html:38, 57-105, 411, 944, 1101-1105` | Élevé |
| 2 | 🔴 | **Logo 802 KB** à convertir SVG ou WebP < 100 KB | `images/Logo Bochica 2026-3.png` + `index.html:39, 414` | Moyen |
| 3 | 🔴 | **`setLang()` ne met pas à jour `document.documentElement.lang`** | `main.js:4-15` | Faible (1 ligne) |
| 4 | 🔴 | **Cartes de plats non accessibles au clavier** | `main.js:117-206` | Faible |
| 5 | 🔴 | **Hamburger sans ARIA** | `index.html:404-406` + `main.js:42-48` | Faible |
| 6 | 🔴 | **`<main>` manquant** | `index.html:408-1368` | Faible |
| 7 | 🔴 | **Pas de `prefers-reduced-motion`** | `style.css:82, 260, 372-373` | Faible |
| 8 | 🔴 | **7 liens `target="_blank"` sans `rel="noopener"`** | `index.html:400, 401, 421, 423, 1243, 1365, 1381` | Faible |
| 9 | 🔴 | **Contrastes `--text3` échouent sur fond crème** | `style.css:6, 334, 360` | Faible |
| 10 | 🔴 | **Politique de confidentialité absente** (Loi 25), placeholder Formspree à configurer | `index.html:1282, 1323` | Moyen |

**Mention honorable :**
- 🟡 Refactoriser `.btn-blue` (nom mensonger), classes `.y/.b/.r` (toutes = bordeaux)
- 🟡 Agrandir `.lang-btn` et hamburger (cibles tactiles)
- 🟡 Ajouter `role="tablist"/"tab"/"tabpanel"` + nav flèches sur onglets menu
- 🟡 Supprimer fichiers orphelins (1.5 MB + 600 KB de logos inutilisés)

---

## 💬 Verdict général

Le site a une **identité visuelle soignée**, un **SEO solide** (Schema.org, OG, FAQ, hreflang), une **structure trilingue fonctionnelle** et un **formulaire propre**.

**Faiblesses principales :**
- 🔴 **Accessibilité** : landmark `<main>`, ARIA sur nav mobile/onglets/cartes cliquables, `documentElement.lang`, reduced-motion
- 🔴 **Actifs images absents** qui cassent la vitrine en production
- 🟡 **Dette design system** : couleurs hardcodées, 5 variantes de boutons, 25 tailles de police, classes `.y/.b/.r` mensongères

**Un sprint de 2-3 jours couvrirait le top 10 critique.**
