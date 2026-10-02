# 🔎 AUDIT SEO — Bochica (bochicacafebistro.ca)

**Date :** 1er octobre 2026
**Objectif :** que Bochica sorte en premier quand on cherche un **resto colombien à Québec**, un **resto latino**, ou **quelque chose de différent** pour souper.
**Méthode :**
- lecture complète du code en ligne (identique au dossier local, vérifié) ;
- vérification des en-têtes Vercel et des domaines ;
- recherches réelles sur les mots-clés visés ;
- relevé de toutes les fiches de Bochica trouvées sur le Web (Google, TripAdvisor, RestoQuébec, Restoenligne, MonSaintSauveur, etc.) ;
- analyse des concurrents.

> ⚠️ **Limite :** aucun outil SEO (Ahrefs, Semrush) ni Google Search Console n'est branché. Les volumes de recherche sont donc des **estimations relatives**. Les positions sont **observées dans un moteur de recherche, pas directement dans Google**. Il faudra les confirmer dans Search Console (voir 4.1).

---

## ✅ Suivi des corrections — 1er octobre 2026 (même jour)

Décisions du propriétaire : nom officiel **Bochica Restaurant Colombien** · code postal **G1K 1K8** · La Tiendita **n'existe plus** · les heures du site sont les bonnes · `bochica-v2` est un autre projet (seul `bochica-web` sert le site).

| # | Tâche | État |
|---|---|---|
| 1 | Nom officiel, code postal, GPS (alignés sur la fiche Google), « Saint-Roch » → « Saint-Sauveur » | ✅ Fait (site) |
| 2 | Titre, meta description, « latino », sous-titre visible sur mobile, Bol Medellín = bandeja paisa, « Notre histoire » | ✅ Fait |
| 3 | FAQ visible (10 questions, FR/EN/ES) + JSON-LD régénéré | ✅ Fait |
| 4 | Pages **/en/** et **/es/** + hreflang + sitemap | ✅ Fait (`tools/build_lang.py`) |
| 5 | JSON-LD : `sameAs`, `hasMap`, `acceptsReservations`, `knowsLanguage` ; lien direct vers la fiche Google | ✅ Fait |
| 6 | Redirection `bochica-web.vercel.app` → domaine principal | ✅ Fait (`vercel.json`) |
| 7 | Sous-domaine **`www`** dans Vercel | ⏳ **Toi** : Vercel → bochica-web → Settings → Domains → Add `www.bochicacafebistro.ca` → redirection vers `bochicacafebistro.ca` (le DNS pointe déjà vers Vercel) |
| 8 | Fiche Google : heures et nom | ✅ Déjà corrects (vérifié) |
| 9 | Fiche Google : code postal G1N 1C1 → G1K 1K8 | ✅ Fait (en attente d'approbation Google) — ⚠️ catégorie principale = « Restaurant » seulement : à changer pour « Restaurant colombien » (+ latino-américain, sud-américain) avec ton accord |
| 10 | RestoQuébec : nom, code postal, heures | ✅ Demande envoyée (formulaire de contact) |
| 11 | MonSaintSauveur : nom, heures | ✅ Demande envoyée (formulaire de contact) |
| 12 | Guía Latina de Québec : inscription | ✅ Courriel envoyé à guia.latina@hotmail.com |
| 13 | TripAdvisor : nom + heures + téléphone | ✅ Suggestion envoyée (modération TripAdvisor). La fiche est « gérée » par un autre compte : à réclamer via le Management Centre pour la contrôler |
| 14 | Restoenligne : code postal + heures | ⏳ Code de vérification demandé à bochicacafebistro@gmail.com, pas encore reçu |
| 15 | Mise en ligne | ⏳ **Toi** : GitHub Desktop → cocher aussi `en/`, `es/`, `tools/` → Commit → Push |

---

## 📊 Résumé

**La base technique du site est solide.** La page est rapide, sécurisée, en HTTPS, avec un sitemap propre, des données structurées riches (restaurant, menu, FAQ) et un bon titre H1. Le site sort déjà sur « restaurant colombien Québec », mais **derrière des annuaires** (Restoenligne, RestoQuébec).

**Ce qui bloque, ce n'est pas le code, c'est tout le reste :**

1. **Les informations de Bochica se contredisent sur le Web.** On trouve 4 noms différents, 3 codes postaux différents et 4 versions des horaires. Pour Google, c'est le signal n° 1 de la recherche locale (la carte avec les 3 restos).
2. **Le site n'a qu'une page, et seulement en français pour Google.** Les touristes qui cherchent « colombian restaurant Quebec City » ne trouvent aucune version anglaise. Il n'y a pas de pages pour « latino », « sans gluten », « groupes », « soirées »…
3. **Bochica est absent des listes que les gens lisent.** Pas d'avis TripAdvisor (0 avis, horaires de 2024). Absent de la Guía Latina de Québec, des listes « latino » de TripAdvisor et Wanderlog, et de la liste « restaurants pour voyager dans l'assiette » de Québec Cité.

**Bonne nouvelle :** je n'ai trouvé **aucun site Web** pour le principal concurrent colombien, **Chez Carlos Café** (Limoilou). Avec un vrai site plus complet et des fiches propres, Bochica peut devenir la référence en ligne.

| Domaine | Note | En bref |
|---|---|---|
| ⚙️ Technique | 🟢 Bon | Rapide, sécurisé, sitemap et données structurées OK. À régler : sous-domaine `www`, Search Console |
| 📝 Contenu de la page | 🟠 Moyen | Une seule page de ≈ 1 350 mots, surtout le menu. « Latino » n'y apparaît jamais. Rien en anglais pour Google |
| 📍 Présence locale (fiche Google, annuaires) | 🔴 À corriger | Noms, adresse, code postal et horaires incohérents d'un site à l'autre |
| ⭐ Avis | 🟡 Bon sur Google, 🔴 nul ailleurs | 4,7★ et ≈ 200 avis sur Google, mais 0 sur TripAdvisor |
| 🔗 Liens vers le site (notoriété) | 🟠 Moyen | Bons articles (Le Soleil, MonSaintSauveur) mais pas de listes « latino » ni « original » |

---

## 1. 📍 Présence locale — LA priorité

Pour « restaurant colombien Québec », Google affiche d'abord une **carte avec 3 restos**. Le classement dans cette carte dépend surtout de quatre choses :
- la **fiche Google** (Google Business Profile) ;
- la **cohérence du nom, de l'adresse et du téléphone (NAP)** partout sur le Web ;
- les **avis** ;
- la **distance**.

Le site Web vient seulement après.

### 1.1 🔴 Les informations de Bochica ne concordent pas d'un site à l'autre

| Où | Nom affiché | Code postal | Horaires samedi / dimanche |
|---|---|---|---|
| **Site Web** (données Google) | Bochica | **G1K 1K7** | 12h–22h30 / 12h–20h30 ✅ |
| **Fiche Google** (vue via Wanderlog, qui la recopie) | Bochica Restaurant Colombien | **G1N 1C1** | 13h–23h / 13h–21h ❌ |
| Restoenligne | Bochica Restaurant Colombien | G1N 1C1 | 13h–23h / 13h–21h ❌ |
| RestoQuébec | Bochica Café Bistro | G1N 1C1 | 13h–23h / 13h–21h ❌ |
| TripAdvisor | Bochica café bistro | **G1K 1K8** | 11h30–23h / 11h30–22h ❌ (mer-jeu 16h–22h ❌) |
| MonSaintSauveur | Bochica Café Bistro | — | 11h30–23h / 11h30–22h ❌ |
| Facebook / Uber Eats / DoorDash | Bochica Café Bistro / « bochica café bistro inc » | — | — |
| Site Web, section « Nous trouver » | — | — | dit « **Quartier Saint-Roch** » alors que partout ailleurs (et Le Soleil) c'est **Saint-Sauveur** |

**Impact :** quand Google voit des infos différentes, il fait moins confiance à la fiche et la classe plus bas dans la carte. Les clients qui voient les vieilles heures peuvent aussi arriver devant une porte fermée.

**Correction :**
1. **Choisir UN nom officiel**, celui de l'enseigne. Le logo dit « BOCHICA — Restaurant Colombien ». Je recommande « **Bochica Restaurant Colombien** » si c'est le nom sur l'enseigne. Sinon, « Bochica Café Bistro ». Ensuite, l'utiliser **partout de la même façon**.
2. **Confirmer le vrai code postal** sur [Postes Canada](https://www.canadapost-postescanada.ca/cpc/fr/tools/find-a-postal-code.page). Google a G1N 1C1, le site a G1K 1K7, TripAdvisor a G1K 1K8. Je mets ensuite le site à jour.
3. **Mettre à jour les horaires** sur la fiche Google, TripAdvisor, RestoQuébec, Restoenligne, MonSaintSauveur et LibroReserve.
4. Corriger « Quartier Saint-Roch » → « **Saint-Sauveur** » sur le site (FR/EN/ES).

### 1.2 🔴 La fiche Google (Google Business Profile)
C'est l'outil le plus puissant pour « resto colombien près de moi ». À vérifier et à compléter dans business.google.com :

- [ ] **Catégorie principale :** « Restaurant colombien »
- [ ] **Catégories secondaires :** « Restaurant latino-américain », « Restaurant sud-américain », « Bar à cocktails ». Ajouter « Épicerie » ou « Magasin d'alimentation » si La Tiendita existe encore. *Chaque catégorie fait apparaître le resto sur d'autres recherches. C'est le moyen le plus direct de sortir sur « latino ».*
- [ ] **Horaires à jour**, plus les heures spéciales des jours fériés
- [ ] **Site Web :** `https://bochicacafebistro.ca/` ; **Réservation :** lien LibroReserve ; **Commande :** lien Order Online
- [ ] **Menu complet** dans la fiche (plats + prix + photos). Google l'affiche directement
- [ ] **Attributs :** options végé, **options sans gluten**, cocktails, bière, musique, accueil des groupes, convient aux enfants, accessible en fauteuil roulant (si c'est vrai), paiement Interac…
- [ ] **Description** (750 caractères) avec, naturellement : colombien, latino, Saint-Sauveur, arepas, empanadas, bandeja paisa, sans gluten, cocktails, salsa
- [ ] **Photos :** 3 à 5 nouvelles par semaine (plats, salle, équipe, soirées). Les fiches avec beaucoup de photos récentes reçoivent plus de clics
- [ ] **Publications (« Posts ») chaque semaine :** Mercredi empanadas, Jeudi 2×1, soirées salsa / karaoké, nouveaux plats
- [ ] **Questions-réponses :** y publier vous-mêmes les 5-6 questions fréquentes (sans gluten ? groupes ? stationnement ? réservation ?)
- [ ] **Répondre à 100 % des avis**, en nommant les plats (« Merci d'avoir essayé notre bandeja paisa! »)

### 1.3 🟠 Les avis
- **Google :** 4,7★ avec ≈ 200-217 avis. C'est bon, mais Chez Carlos Café en a ≈ 324 (4,8★ sur RestoQuébec).
- **TripAdvisor :** **0 avis**, 1 seule photo. Les touristes de Québec utilisent beaucoup TripAdvisor, et c'est pour ça que Bochica n'apparaît pas dans « Best Latin / South American restaurants in Quebec City ».
- **Correction :**
  - **QR code** sur les tables, la facture ou le chevalet, qui mène directement au lien « Laisser un avis Google ».
  - Un 2e QR code TripAdvisor pour les clients touristes.
  - Objectif : **+20 avis Google par mois** et **15 avis TripAdvisor** d'ici décembre.
  - Sur le site, le bouton « Lire tous les avis sur Google » mène à une recherche par adresse. Il devrait mener **directement à la fiche Google** (lien « Partager » de la fiche).

### 1.4 🟠 Être là où les gens cherchent « latino » ou « différent »

| Annuaire / liste | Bochica y est? | Action |
|---|---|---|
| [Guía Latina de Québec](https://www.guialatinadequebec.com/restaurantes) (restos latinos) | ❌ Chez Carlos, Lima, La Salsa y sont | Écrire à guia.latina@hotmail.com |
| [TripAdvisor — Latin](https://www.tripadvisor.com/Restaurants-g155033-c10639-Quebec_City_Quebec.html) / South American | ❌ (0 avis) | Ajouter la catégorie « Latin », obtenir des avis |
| [Wanderlog — Latin & South American Quebec City](https://wanderlog.com/list/geoCategory/800239/best-latin-and-south-american-foods-and-restaurants-in-quebec-city) | ❌ | Se règle avec les avis TripAdvisor et Google |
| [Québec Cité — « 31 restaurants pour voyager dans l'assiette »](https://www.quebec-cite.com/fr/restaurants-quebec/restaurants-exotiques) (office du tourisme) | ❌ aucun resto sud-américain dans la liste | Contacter Destination Québec Cité pour une mise à jour / devenir membre |
| [Quoi faire à Québec — restaurants inusités](https://quoifaire.com/quebec/blogue/restaurants-inusites) | ❌ | Proposer Bochica |
| HappyCow (végé), Petit Futé, Quoi faire en famille | ❌ (Resto-Bar Lima y est) | Créer les fiches |
| Find Me Gluten Free, Atly | ✅ | Garder à jour, demander des avis sans gluten |
| RestoQuébec | ✅ n° 1 colombien (4,7★) | Corriger les horaires et le code postal |
| Yelp | ? (pas vérifiable) | Vérifier / créer la fiche |
| Bing Places, Apple Business Connect | ? | Créer. Bing alimente ChatGPT et Copilot, Apple alimente Plans sur iPhone |

---

## 2. 🎯 Mots-clés visés

*Difficulté et potentiel estimés selon les résultats observés. Pas de volumes exacts sans outil SEO.*

| Mot-clé | Difficulté | Potentiel | Position observée | Intention | Page qui devrait sortir |
|---|---|---|---|---|---|
| restaurant colombien Québec | Facile | 🟢 Élevé | ✅ dans les 10 premiers, derrière 2 annuaires | Transaction | Accueil (FR) |
| colombian restaurant Quebec City | Facile | 🟢 Élevé | ❌ (aucune page anglaise) | Transaction | **/en/** (à créer) |
| restaurant latino Québec | Moyenne | 🟢 Élevé | ❌ | Transaction | Accueil + page « Cuisine latino » |
| latin restaurant Quebec City | Moyenne | 🟢 Élevé | ❌ | Transaction | /en/ |
| restaurant sud-américain Québec | Facile | 🟡 Moyen | ❌ | Transaction | Accueil |
| restaurant sans gluten Québec | Moyenne | 🟢 Élevé | ❌ (mais présent sur Find Me Gluten Free) | Transaction | **/sans-gluten** (à créer) |
| gluten free restaurant Quebec City | Moyenne | 🟢 Élevé | ❌ | Transaction | /en/gluten-free |
| arepas Québec | Facile | 🟢 Élevé | ❌ (les résultats sont tous à Montréal!) | Transaction | Page « Arepas » ou section du menu |
| empanadas Québec | Facile | 🟢 Élevé | ❌ (résultats à Montréal) | Transaction | Page / section + Mercredi empanadas |
| bandeja paisa Québec | Facile | 🟡 Moyen | ? | Transaction | Section menu « Bol Medellín » |
| restaurant Saint-Sauveur Québec | Facile | 🟡 Moyen | ? | Transaction | Accueil |
| restaurant rue Saint-Vallier Ouest | Facile | 🟡 Moyen | ? | Navigation | Accueil |
| restaurant original / inusité Québec | Difficile | 🟡 Moyen | ❌ | Découverte | Listes externes + page « L'expérience Bochica » |
| restaurant exotique Québec / voyager dans l'assiette | Moyenne | 🟡 Moyen | ❌ | Découverte | Listes Québec Cité, Quoi faire |
| restaurant pour groupe Québec / fête | Moyenne | 🟡 Moyen | ❌ | Transaction | **/groupes-evenements** (à créer) |
| soirée salsa Québec | Moyenne | 🟡 Moyen | ❌ | Découverte | **/soirees** (à créer) |
| épicerie colombienne Québec / produits colombiens | Facile | 🟡 Moyen (si La Tiendita existe encore) | ❌ (seul résultat : un dépanneur à Vanier) | Transaction | **/epicerie** |
| pandebono / buñuelos Québec | Facile | 🔵 Faible | ? | Transaction | Section desserts |
| aguardiente Québec | Facile | 🔵 Faible | ? | Transaction | Section bar |
| restaurante colombiano Quebec | Facile | 🟡 Moyen (≈ 3 000 Colombiens à Québec, selon Carrefour de Québec) | ❌ | Transaction | **/es/** (à créer) |
| qu'est-ce qu'une arepa / c'est quoi la bandeja paisa | Facile | 🔵 Faible mais aide pour l'IA | ❌ | Information | Page « Cuisine colombienne 101 » |
| meilleur resto colombien Québec (ChatGPT, Google IA) | — | 🟢 Élevé, en croissance | ? | Transaction | Cohérence des fiches + avis + FAQ visible |

---

## 3. 📝 Le contenu de la page

### 3.1 Problèmes trouvés

| Endroit | Problème | Gravité | Correction |
|---|---|---|---|
| `<title>` | 75 caractères : Google coupe vers 60. « latino » absent | 🟠 Haute | « **Bochica \| Restaurant colombien et latino à Québec · Saint-Sauveur** » (65 car.) |
| Meta description | 184 caractères (coupée vers 155) | 🟡 Moyenne | « Restaurant colombien à Québec : arepas, empanadas, bandeja paisa, cocktails latinos. Saint-Sauveur, 430 Saint-Vallier O. Réservez ou commandez en ligne. » (152 car.) |
| Mot « latino » | **0 fois** dans le texte visible | 🟠 Haute | L'ajouter naturellement dans l'intro, « Notre histoire » et la FAQ |
| « Sans gluten » | 0 fois dans le HTML de base (les badges sont ajoutés par JavaScript) | 🟡 Moyenne | Phrase visible : « La majorité de nos plats sont naturellement sans gluten (arepas de maïs, bols…) » + page dédiée |
| « Bandeja paisa » | Dans le titre Google, mais nulle part dans le menu visible (la carte dit seulement « Medellín ») | 🟡 Moyenne | Renommer la carte « **Bol Medellín** — notre bandeja paisa » |
| **Mobile** (Google lit le site en version mobile) | Le H1 est masqué et l'intro avec l'adresse est en `display:none`. Sur mobile, le premier texte visible est « Notre menu » | 🟠 Haute | Ajouter une ligne visible au-dessus du menu : « Restaurant colombien à Québec · Saint-Sauveur », sans changer l'arrivée directe sur le menu |
| FAQ | 8 questions-réponses dans les données Google mais **invisibles sur la page**. Ça va contre les règles de Google : les données structurées doivent refléter du contenu visible | 🟠 Haute | Ajouter une section **FAQ visible** (accordéon) en bas de page, traduite. C'est aussi très utile pour les réponses IA |
| « Notre histoire » | 72 mots seulement. Google et les clients veulent savoir **qui** est derrière | 🟡 Moyenne | 250-400 mots : Alvaro, Shamya et Vincent, la Colombie, 19 ans à Québec, le dieu muisca Bochica, La Tiendita, la musique, les soirées. Avec une **vraie photo** de l'équipe ou de la salle |
| Code postal | Absent de l'adresse visible | 🔵 Basse | L'ajouter une fois confirmé |
| Écran de langue | Son titre « Choisissez votre langue » est un `<h2>` qui arrive **avant** le H1 | 🔵 Basse | Le changer en `<p>` |
| Lien « avis Google » | Pointe vers une recherche d'adresse, pas vers la fiche | 🔵 Basse | Lien direct vers la fiche |

### 3.2 🔴 Une seule langue pour Google
Le site change de langue avec JavaScript, sur la même adresse. **Google indexe seulement la version française.** Résultat : invisible sur « colombian restaurant Quebec City », « latin food Quebec City » ou « restaurante colombiano Quebec », alors que Québec reçoit des millions de touristes anglophones.

**Correction :** générer automatiquement **`/en/`** et **`/es/`**, deux vraies pages HTML avec le texte traduit. Toutes les traductions existent déjà dans les attributs `data-en` et `data-es` : un petit script peut produire les deux pages à chaque mise à jour. On ajoute ensuite les balises `hreflang` (fr-CA, en-CA, es) et on garde les boutons FR/EN/ES, qui mèneront vers la bonne page.
- **Gain :** probablement le plus gros gain de trafic du site.
- **Effort :** une demi-journée pour moi.

---

## 4. ⚙️ Technique

| Vérification | État | Détail |
|---|---|---|
| HTTPS + HSTS + en-têtes de sécurité | ✅ Réussi | Vérifié en ligne |
| Site en ligne = dossier local | ✅ Réussi | Identique (`style.css?v=20260927j`) |
| Fichiers internes cachés | ✅ Réussi | `/CONTEXTE.md` → 404 (le `.vercelignore` fonctionne) |
| `robots.txt` | ✅ Réussi | Autorise tout, pointe vers le sitemap |
| Sitemap | ✅ Réussi | `/` + `/privacy.html`, 60 images, date du 27 sept. |
| Balise canonical | ✅ Réussi | `https://bochicacafebistro.ca/` |
| Données structurées Restaurant + Menu | ✅ Réussi | Riches (horaires, géo, réservation, commande, menu avec prix) |
| Vitesse | ✅ Réussi | Photos WebP, chargement différé, page ≈ 0,25 s sur ordinateur (audit de sept.) |
| Mobile | ✅ Réussi | Aucun débordement, zones de toucher OK |
| **Sous-domaine `www`** | ⚠️ À vérifier | `www.bochicacafebistro.ca` **n'est pas configuré dans Vercel**. S'il ne mène nulle part, toute personne qui tape « www » tombe sur une erreur. Il faut l'ajouter dans Vercel → Domains, avec redirection vers `bochicacafebistro.ca` |
| **Google Search Console / Bing Webmaster Tools** | ⚠️ À vérifier | Aucune balise de vérification dans le code. Sans Search Console, impossible de savoir sur quels mots on sort et à quelle position. Bing compte aussi pour ChatGPT et Copilot |
| Copie `bochica-web.vercel.app` | ⚠️ Mineur | Même contenu sur une 2e adresse. La canonical protège, mais une redirection serait plus propre |
| Projet Vercel `bochica-v2` | ❓ Question | Il existe un projet `bochica-v2` (modifié le 30 sept.). Est-ce une nouvelle version du site? Si oui, il faudra reprendre cet audit dessus avant la mise en ligne |
| `acceptsReservations: "True"` | ⚠️ Mineur | Devrait être `true` (sans guillemets) |
| Nom dans les données Google | ⚠️ | `"name": "Bochica"` → mettre le nom officiel choisi (voir 1.1), identique à la fiche Google |
| Liens `sameAs` | ⚠️ | Ajouter TripAdvisor, RestoQuébec, la fiche Google Maps (et Yelp si elle existe) |
| Soirées (salsa, karaoké, matchs) | ⚠️ | Si elles ont des dates fixes : données « Event », que Google peut afficher dans ses résultats « événements à Québec » |
| Avis sur le site | ✅ OK | Ne **pas** ajouter de note en étoiles dans les données Google : Google ignore les avis « auto-déclarés » des commerces |

---

## 5. 🥊 Concurrence

| | **Bochica** | **Chez Carlos Café** (colombien, Limoilou) | **Resto-Bar Lima** (péruvien, Saint-Vallier O.) | **La Salsa** (latino, Limoilou) |
|---|---|---|---|---|
| Site Web | ✅ Excellent techniquement, 1 page, FR seulement | ❌ Aucun trouvé (Instagram seulement) | ✅ restobarlima.com | ? (DoorDash, Yelp) |
| Avis Google / RestoQuébec | 4,7★ · ≈ 200 | **4,8★ · ≈ 324** | ? | ? |
| TripAdvisor | 0 avis | 14 avis | ✅ présent | **68 avis** |
| Guía Latina de Québec | ❌ | ✅ | ✅ | ✅ |
| Listes « Latin » Wanderlog / TripAdvisor | ❌ | ✅ | ❌ | ✅ |
| Petit Futé / HappyCow | ❌ | ? | ✅ | ? |
| Articles de presse | ✅ Le Soleil, MonSaintSauveur, Carrefour (2024) | ? | ✅ MonSaintSauveur | ? |
| Anglais / espagnol indexés | ❌ | ❌ | ? | ❌ |
| **Gagnant** | **Site + presse** | **Avis** | **Annuaires** | **TripAdvisor** |

**À retenir :**
- Personne n'a un vrai site trilingue avec du contenu sur la cuisine colombienne. **C'est la place à prendre.**
- Les concurrents gagnent par les **avis** et les **annuaires**. Ça se rattrape en 2-3 mois avec un QR code et quelques courriels.
- Pour « arepas Québec » et « empanadas Québec », **tous les résultats sont à Montréal**. Une page bien faite sur Bochica a de bonnes chances de sortir en 1re position.
- Attention : il existe un « Bochica » à San Francisco. Toujours écrire « Bochica **Québec** » sur les réseaux.

---

## 6. 🧭 Contenu à créer (pour « latino » et « différent »)

| Page / contenu | Pourquoi | Format | Priorité | Effort |
|---|---|---|---|---|
| **/en/** et **/es/** | Touristes + communauté latino; aucun concurrent ne le fait | Pages générées automatiquement | 🔴 Haute | ½ journée |
| **FAQ visible** | Règles Google + réponses IA + questions réelles (stationnement, groupes, sans gluten, enfants) | Section accordéon | 🔴 Haute | 1-2 h |
| **/sans-gluten** | Les arepas de maïs sont naturellement sans gluten : avantage rare. Bochica est déjà sur Find Me Gluten Free | Page + liste des plats sans gluten | 🟠 Haute | 2 h |
| **/groupes-evenements** | « resto pour fête », « party de bureau », Picada Suprema pour partager, privatisation | Page + formulaire | 🟠 Haute | 2-3 h |
| **/soirees** (salsa, karaoké, matchs) | Répond à « quelque chose de différent » et « quoi faire à Québec ce soir » | Page + calendrier + données Event | 🟡 Moyenne | 2 h |
| **Cuisine colombienne 101** : arepa, bandeja paisa, empanada, patacón, aguardiente, pandebono | Mots-clés « c'est quoi… » + crédibilité + liens à partager. Peut répondre au point « glose FR des termes espagnols » de CONTEXTE.md | Guide (pilier) | 🟡 Moyenne | ½ journée |
| **/epicerie** (La Tiendita), si elle existe encore | Seul résultat pour « épicerie colombienne Québec » : un dépanneur à Vanier | Page produits | 🟡 Moyenne | 1-2 h |
| « Notre histoire » enrichie | Expérience, crédibilité, côté humain (Google valorise le vécu) | Section | 🟡 Moyenne | 1 h (texte de toi) |
| Articles saisonniers (« Noël colombien : buñuelos et natilla », « Fête de l'indépendance 20 juillet », « Coupe du monde 2026 »…) | Fraîcheur + partages sur les réseaux | Blogue, 1 par mois | 🔵 Basse | 1 h chacun |

---

## 🗺️ Plan d'action

### ⚡ Gains rapides (cette semaine)
| # | Action | Impact | Effort | Qui |
|---|---|---|---|---|
| 1 | Choisir le **nom officiel** + confirmer le **code postal** | 🔴 Élevé | 10 min | **Toi** |
| 2 | **Fiche Google** : catégories (colombien + latino + sud-américain), horaires, attributs, menu, description, 10 photos | 🔴 Élevé | 1 h | **Toi** (je fournis les textes) |
| 3 | Corriger horaires et adresse sur **TripAdvisor, RestoQuébec, Restoenligne, MonSaintSauveur** | 🔴 Élevé | 45 min | **Toi** (je fournis la liste exacte) |
| 4 | **Titre, meta description**, mot « latino », « Saint-Roch » → « Saint-Sauveur », nom, code postal, `sameAs`, `acceptsReservations`, ligne visible sur mobile, `<h2>` de l'écran de langue | 🟠 Élevé | 1 h | **Claude** |
| 5 | **FAQ visible** sur la page (FR/EN/ES) | 🟠 Élevé | 1-2 h | **Claude** |
| 6 | **Google Search Console + Bing Webmaster Tools** : créer, vérifier, soumettre le sitemap | 🟠 Élevé | 20 min | **Toi** (je te guide) |
| 7 | Ajouter **`www`** dans Vercel avec redirection | 🟡 Moyen | 5 min | **Toi** (je te guide) |
| 8 | **QR codes avis** Google + TripAdvisor (chevalets de table) | 🟠 Élevé | 30 min | **Claude** (design) + toi (impression) |

### 🏗️ Investissements (ce trimestre)
| # | Action | Impact | Effort | Dépend de |
|---|---|---|---|---|
| 9 | Pages **/en/** et **/es/** générées automatiquement + hreflang | 🔴 Élevé | ½ journée | — |
| 10 | Pages **/sans-gluten**, **/groupes-evenements**, **/soirees** | 🟠 Élevé | 1 journée | Photos, infos de soirées |
| 11 | Inscriptions : **Guía Latina, Québec Cité, Quoi faire à Québec, HappyCow, Petit Futé, Yelp, Bing Places, Apple Business Connect** | 🟠 Élevé | 2-3 h | #1 |
| 12 | Guide **Cuisine colombienne 101** | 🟡 Moyen | ½ journée | — |
| 13 | **Relations presse / blogueurs** : Le Soleil, MonSaintSauveur, Québec Cité, blogues food (Sparks and Bloom, Quoi faire), comptes Instagram food de Québec. Angle : « le seul resto colombien trilingue avec épicerie et soirées salsa » | 🟠 Élevé | continu | #10 |
| 14 | **1 publication Google par semaine** + 3-5 photos | 🟠 Élevé | 15 min/sem. | — |
| 15 | Objectifs à 3 mois : **300 avis Google, 15 avis TripAdvisor**, présent dans 3 listes « latino » | — | — | #8 |

---

## ✅ Ce qu'on mesure (dans 3 mois)
- Position sur : « restaurant colombien Québec », « restaurant latino Québec », « colombian restaurant Quebec City », « arepas Québec », « restaurant sans gluten Québec » (Search Console)
- Statistiques de la fiche Google : vues, appels, itinéraires, clics vers le site
- Nombre d'avis Google et TripAdvisor
- Réservations LibroReserve et commandes en ligne venant du site

---

### Sources consultées
[Le Soleil, nov. 2024](https://www.lesoleil.com/vivre/dans-l-assiette/restaurants/2024/11/13/un-nouveau-resto-devoile-sa-poutine-de-colombie-en-basse-ville-UGHHXVS32ZDGXJRYPXXFTEMJLY/) ·
[Carrefour de Québec](https://www.carrefourdequebec.com/2024/11/nouveaux-resto-bar-colombien-a-quebec/) ·
[MonSaintSauveur — fiche](https://monsaintsauveur.com/entreprises/bochica-cafe-bistro/) ·
[RestoQuébec — Bochica](https://www.restoquebec.ca/resto/bochica-cafe-bistro-quebec/19859/en/) ·
[RestoQuébec — restos colombiens](https://www.restoquebec.ca/restaurants/colombian-quebec/en/?c=38) ·
[Restoenligne — Bochica](https://restoenligne.com/restaurants/home/bochica-restaurant-colombien) ·
[TripAdvisor — Bochica](https://www.tripadvisor.ca/Restaurant_Review-g155033-d33771823-Reviews-Bochica_cafe_bistro-Quebec_City_Quebec.html) ·
[TripAdvisor — Latin Quebec City](https://www.tripadvisor.com/Restaurants-g155033-c10639-Quebec_City_Quebec.html) ·
[Wanderlog — Bochica](https://wanderlog.com/place/details/14426867/bochica-caf%C3%A9-bistro) ·
[Wanderlog — Latin Quebec City](https://wanderlog.com/list/geoCategory/800239/best-latin-and-south-american-foods-and-restaurants-in-quebec-city) ·
[Guía Latina de Québec](https://www.guialatinadequebec.com/restaurantes) ·
[Québec Cité — restaurants exotiques](https://www.quebec-cite.com/fr/restaurants-quebec/restaurants-exotiques) ·
[Quoi faire à Québec — inusités](https://quoifaire.com/quebec/blogue/restaurants-inusites) ·
[Resto-Bar Lima](https://www.restobarlima.com/)
