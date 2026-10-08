# 🔐 Audit de sécurité — bochicacafebistro.ca
**Date :** 8 octobre 2026
**Portée :** site public (code + hébergement Vercel + domaine/DNS). Survol rapide des autres projets Vercel.
**Méthode :** lecture du code (HTML/JS), historique Git, en-têtes HTTP en production, tests d'accès à des fichiers sensibles, configuration Vercel (protection, pare-feu), DNS public.

---

## Verdict global

| Zone | État | Résumé |
|---|---|---|
| Code du site | 🟢 Solide | Site 100 % statique : pas de base de données, pas de connexion, pas de serveur à pirater |
| En-têtes de sécurité | 🟢 Très bien | HSTS, CSP, nosniff, X-Frame-Options, Permissions-Policy actifs (renforcés aujourd'hui) |
| Fichiers internes | 🟢 Corrigé | Les problèmes de l'audit de septembre sont réglés (tout répond 404) |
| Pare-feu (WAF) Vercel | 🟢 Activé le 8 oct. | Règles personnalisées publiées et testées (scanners bloqués = 403) |
| Courriels au nom du domaine | 🔴 Usurpable | Pas de SPF ni de DMARC : n'importe qui peut envoyer un faux courriel « @bochicacafebistro.ca » |
| Formulaire de contact | 🟡 Correct | Pot de miel anti-spam présent ; à renforcer côté Formspree |
| Autres projets Vercel | 🟠 À vérifier | `mes-finances` et `bochica-v2` (Gestion) sont accessibles publiquement sur Internet |

**Peut-on se défendre en cas d'attaque ?** En partie. Le site lui-même est peu attaquable (statique). Mais il n'y a **aucune règle active qui bloque automatiquement** les robots malveillants dès leur arrivée. Le plan ci-dessous comble ce trou.

---

## 1. 🟢 Ce qui est déjà bien

- **Site statique** : il n'y a rien à « injecter » (pas de SQL, pas de mot de passe, pas de compte admin sur le site). C'est la meilleure défense qui soit.
- **HTTPS forcé** partout (HSTS 2 ans + preload).
- **CSP stricte** : seuls les domaines prévus (Google, Behold, Formspree, LibroReserve, Order Online) peuvent charger du code.
- **Fichiers sensibles inaccessibles** — vérifié en production (404) : `/CONTEXTE.md`, `/AUDIT_*.md`, `/.git/config`, `/vercel.json`, `/images/_originaux/`, `/zi5Ybtie`, l'ancienne page de boutique d'alcool.
- **Pas de secret dans le code** : aucun mot de passe ni clé API à toi dans l'historique Git. (Les jetons trouvés appartiennent à la page Shopify d'un détaillant supprimée en septembre — ce sont des jetons publics, sans risque pour toi.)
- **Liens externes** : les 18 liens `target="_blank"` sont protégés (`noopener`).
- **JavaScript** : aucun `eval`, aucune donnée de visiteur réinjectée dans la page. Le formulaire envoie en `fetch` vers Formspree proprement.
- **URLs Vercel de prévisualisation** protégées par connexion Vercel (seul le domaine public est ouvert).

## 2. ✅ Corrigé aujourd'hui (dans `vercel.json` — à pousser sur GitHub)

- `frame-ancestors 'self'` ajouté à la CSP (empêche d'afficher ton site dans le cadre d'un faux site — « clickjacking »).
- `upgrade-insecure-requests` ajouté (toute ressource en http est forcée en https).
- `Cross-Origin-Opener-Policy: same-origin-allow-popups` ajouté (isole ta page des onglets ouverts par d'autres sites, sans briser les fenêtres de réservation/commande).

➡️ **Action :** dans GitHub Desktop, commit « sécurité : en-têtes » puis **Push**. Vercel redéploie tout seul.

## 3. ✅ Pare-feu Vercel : activé le 8 octobre 2026

**Test en production (14 h 38) :** `/wp-login.php` → **403 bloqué** · `/.env` → **403 bloqué** · page d'accueil → **200 OK**.
**Constat :** sur les 24 h précédentes, Vercel avait déjà refusé 594 requêtes et mis au défi ~1 000 visiteurs suspects (protection DDoS automatique). Les attaques sont réelles et continues.
**Note :** sur le forfait Hobby, l'API ne permet pas de modifier les règles ; elles se gèrent dans Vercel → bochica-web → Firewall → Rules. L'expression (regex) ne doit pas contenir `(?i)`.

### Historique (avant activation)

**Constat :** le pare-feu applicatif (WAF) du projet `bochica-web` n'a jamais été activé. J'ai tenté de le configurer automatiquement, mais Vercel exige une **première activation manuelle** dans le tableau de bord.

**Étape 1 (2 min, toi) :** Vercel → projet **bochica-web** → onglet **Firewall** → ouvrir la page / cliquer « Enable » si proposé.

**Étape 2 (moi, dès que c'est fait) :** j'applique ces règles :

| Règle | Effet |
|---|---|
| **Bloquer les scanners de failles** | Toute requête vers `/wp-admin`, `.php`, `/.env`, `/.git`, `phpmyadmin`, `/cgi-bin`, etc. → **refusée, et l'IP bloquée 1 h**. Ces chemins n'existent pas sur ton site : seul un robot malveillant les demande |
| **Bloquer les méthodes inutiles** | Le site n'accepte que la lecture (GET/HEAD). Toute tentative d'envoi (POST/PUT/DELETE) est refusée (sauf les statistiques Vercel) |
| **Limite de débit** | Plus de 300 requêtes/minute depuis la même IP → bloquée 10 min |
| **Protection anti-bots** (gérée par Vercel) | En mode « journal » d'abord pendant 1–2 semaines pour vérifier qu'aucun outil légitime n'est touché, puis passage en « défi ». Google, Bing et les robots vérifiés ne sont jamais bloqués |

**En cas d'attaque en cours (procédure d'urgence) :** Vercel → bochica-web → Firewall → **Attack Challenge Mode** → ON. Tous les visiteurs passent un défi invisible ; les robots sont arrêtés. Le désactiver après l'attaque. (Je peux aussi l'activer pour toi sur demande.)

> Note : je n'ai **pas** bloqué les robots d'IA (ChatGPT, Perplexity…) parce qu'ils aident ta visibilité dans les recherches IA.

## 4. 🔴 Courriels usurpables (hameçonnage au nom de Bochica)

**Constat (DNS public) :** le domaine n'a **ni SPF, ni DMARC, ni MX**. Résultat : un fraudeur peut envoyer un courriel qui semble venir de `reservation@bochicacafebistro.ca` à tes clients ou fournisseurs (fausse facture, faux remboursement…), et rien ne le signale comme faux.

**Correction (10 min, chez GoDaddy → DNS de bochicacafebistro.ca)** — comme le domaine n'envoie aucun courriel (tu utilises Gmail), on déclare simplement « personne n'a le droit d'envoyer en mon nom » :

| Type | Nom | Valeur |
|---|---|---|
| TXT | `@` | `v=spf1 -all` |
| TXT | `_dmarc` | `v=DMARC1; p=reject; adkim=s; aspf=s` |
| CAA | `@` | `0 issue "letsencrypt.org"` *(optionnel : seule l'autorité utilisée par Vercel peut émettre un certificat pour ton domaine)* |

⚠️ Si un jour tu crées une adresse courriel sur ce domaine (Google Workspace, etc.), il faudra modifier le SPF.

## 5. 🟡 Formulaire de contact (Formspree)

- ✅ Pot de miel `_gotcha` en place.
- **À faire dans le tableau de bord Formspree** (formulaire `xwlpwygy`) :
  - **Restrict to domain** → `bochicacafebistro.ca` (empêche d'autres sites d'utiliser ton formulaire).
  - Activer le **filtre anti-spam / reCAPTCHA** si le plan le permet.
- Rappel : ne jamais cliquer sur un lien reçu via le formulaire sans vérifier.

## 6. 🟠 Autres projets Vercel (hors site, mais sur ton compte)

| Projet | Adresse publique | Observation |
|---|---|---|
| `mes-finances` | mes-finances-ten.vercel.app | Page accessible sans connexion Vercel (seul `noindex` la cache de Google) |
| `bochica-v2` / `bochica-inventaire` | bochica-v2.vercel.app | Page « Gestion » accessible sans connexion Vercel |

Ces deux apps contiennent possiblement des données sensibles (finances, inventaire). La protection « Standard » de Vercel **ne couvre pas l'adresse de production**. À vérifier : l'app demande-t-elle elle-même un mot de passe, et où sont stockées les données ? → audit séparé recommandé.

## 7. 🛡️ Comptes (la vraie porte d'entrée)

Un site statique se pirate surtout **via les comptes** qui le contrôlent. Vérifier que l'authentification à 2 facteurs (2FA) est activée sur :
- [ ] **GitHub** (bochicacafebistro-hash) — quiconque y accède peut modifier le site
- [ ] **Vercel**
- [ ] **GoDaddy** (domaine + DNS) — et activer le **verrouillage du domaine** (Domain Lock)
- [ ] **Gmail** bochicacafebistro@gmail.com — c'est la clé de récupération de tous les autres
- [ ] Formspree, Google Ads, Google Business Profile

## 8. 🟢 Petits points (non urgents)

- `'unsafe-inline'` dans la CSP des scripts : nécessaire à cause des `onclick=` (18 par page). Les remplacer par des écouteurs JS permettrait de durcir la CSP — gain faible pour un site statique.
- Les 404 sous `/images/` sont mis en cache 1 an : si un visiteur demande une image avant qu'elle existe, son navigateur pourrait garder l'erreur. Rare.
- Le dossier `images/_originaux/` est dans GitHub (mais pas en ligne) — OK si le dépôt GitHub est **privé**. À confirmer.

---

## Plan d'action prioritaire

| # | Action | Qui | Temps |
|---|---|---|---|
| 1 | Push du `vercel.json` modifié | Toi (GitHub Desktop) | 1 min |
| 2 | Ouvrir l'onglet Firewall dans Vercel → je pose les règles | Toi puis moi | 2 min + 2 min |
| 3 | SPF + DMARC chez GoDaddy | Toi (ou moi en te guidant) | 10 min |
| 4 | 2FA partout + Domain Lock GoDaddy | Toi | 20 min |
| 5 | Formspree : restriction de domaine | Toi | 2 min |
| 6 | Audit de `mes-finances` et `bochica-v2` | Moi | sur demande |
| 7 | Passer la protection anti-bots de « journal » à « défi » | Moi | dans 2 semaines |
