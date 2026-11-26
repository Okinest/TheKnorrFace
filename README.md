# The Knorr Face

Application mobile et web de boutique de vêtements, réalisée avec Expo et Expo Router (projet React Native, ESGI).

## Lancer le projet

### 1. Configurer Firebase

Les identifiants Firebase sont lus dans des variables d'environnement `EXPO_PUBLIC_FIREBASE_*`.

- `.env.example` est versionné : il liste les variables, sans valeurs.
- `.env.local` n'est **pas** versionné (ignoré par `.gitignore`) : il contient les vraies valeurs.

```bash
cp .env.example .env.local
```

Puis remplir `.env.local` avec la configuration de l'application Web (Console Firebase > Paramètres du projet > Vos applications). Expo charge `.env.local` automatiquement au démarrage : relancer `npx expo start` après chaque modification.

Côté console Firebase : fournisseur **E-mail/Mot de passe** activé dans Authentication, base Firestore en **mode production** (région `eur3`). Les règles de sécurité sont écrites et publiées dans la console (onglet *Règles* de Firestore).

### 2. Démarrer

```bash
npm install
npx expo start
```

Puis appuyer sur `w` pour le web, ou scanner le QR code avec Expo Go.

Vérifications avant de pousser :

```bash
npx tsc --noEmit
npx expo lint
```

## Écrans

| Écran | Fichier | URL web | Lien profond (mobile) |
| --- | --- | --- | --- |
| Connexion (visiteur) | `src/app/(auth)/sign-in.tsx` | `/sign-in` | `theknorrface://sign-in` |
| Inscription (visiteur) | `src/app/(auth)/sign-up.tsx` | `/sign-up` | `theknorrface://sign-up` |
| Catalogue (onglet) | `src/app/(tabs)/index.tsx` | `/` | `theknorrface://` |
| Panier (onglet) | `src/app/(tabs)/cart.tsx` | `/cart` | `theknorrface://cart` |
| Mes articles (onglet) | `src/app/(tabs)/my-products.tsx` | `/my-products` | `theknorrface://my-products` |
| Compte (onglet) | `src/app/(tabs)/account.tsx` | `/account` | `theknorrface://account` |
| Détail d'un article | `src/app/products/[id].tsx` | `/products/:id` (ex. `/products/83`) | `theknorrface://products/83` |
| Nouveau vêtement | `src/app/products/new.tsx` | `/products/new` | `theknorrface://products/new` |
| Modifier un vêtement | `src/app/products/edit/[id].tsx` | `/products/edit/:id` | `theknorrface://products/edit/:id` |
| Page introuvable | `src/app/+not-found.tsx` | toute adresse inconnue | |

La pile racine (`src/app/_layout.tsx`) utilise `Stack.Protected` : un visiteur ne voit que la connexion et l'inscription, un utilisateur connecté ne voit que les onglets et les écrans d'articles. La session est conservée après redémarrage (AsyncStorage sur mobile).

- **Catalogue** : les vêtements publiés par les utilisateurs (Firestore, en temps réel) suivis des articles de l'API, affichés en grille. On peut les filtrer par recherche texte et par catégorie, et ces deux filtres se combinent. Un appui sur une carte ouvre le détail.
- **Panier** : une `SectionList` des articles du panier, regroupés par catégorie, avec les quantités et le total. Chaque article renvoie vers son détail. Le panier est stocké dans Firestore et écouté en temps réel ; les boutons + et − modifient la quantité. Une écriture qui échoue affiche un message.
- **Mes articles** : la liste des vêtements publiés par l'utilisateur connecté, avec ajout, modification et suppression (suppression en deux appuis).
- **Détail** : l'écran lit l'identifiant dans l'URL. Un identifiant numérique est chargé depuis l'API, les autres depuis Firestore (en temps réel). L'auteur d'un vêtement y trouve aussi les boutons Modifier et Supprimer. Un identifiant inconnu affiche « Cet article est introuvable. ».
- **Compte** : l'adresse de l'utilisateur et le bouton de déconnexion.
- **Page introuvable** : affiche un lien de retour vers le catalogue.

Dans Expo Go, les liens profonds prennent la forme `exp://<IP>:8081/--/products/83`.

## API utilisée

[DummyJSON](https://dummyjson.com/docs/products), sans clé :

- `GET https://dummyjson.com/products/category/{categorie}` charge la liste du catalogue. Les catégories utilisées sont `mens-shirts`, `mens-shoes`, `tops`, `womens-dresses`, `womens-shoes`, `womens-bags` et `sunglasses`.
- `GET https://dummyjson.com/products/{id}` charge un article. Un article hors de ces catégories, ou un identifiant inconnu (404), est considéré comme introuvable.

Une collection Postman est disponible dans `postman/`.

## Données Firestore

Deux collections, toutes deux accessibles uniquement à un utilisateur connecté.

### Panier : `users/{uid}/cart/{productId}`

Le panier de chaque utilisateur est rangé sous son `uid`. L'identifiant du document est l'identifiant de l'article (DummyJSON ou Firestore). Lecture en temps réel avec `onSnapshot`.

| Champ | Type | Description |
| --- | --- | --- |
| `productId` | string | identifiant de l'article (identique à l'id du document) |
| `quantity` | number | quantité, entier ≥ 1 (à 0, le document est supprimé) |
| `addedAt` | number | date d'ajout (ms depuis 1970), pour trier du plus récent au plus ancien |

### Catalogue commun : `products/{productId}`

Les vêtements publiés par les utilisateurs, visibles par tous les utilisateurs connectés et affichés avec ceux de DummyJSON. Seul l'auteur (`ownerId`) peut les modifier ou les supprimer. Lecture en temps réel avec `onSnapshot`.

| Champ | Type | Description |
| --- | --- | --- |
| `title` | string | nom, 1 à 80 caractères |
| `description` | string | 0 à 500 caractères |
| `price` | number | prix en euros, > 0 et ≤ 10 000 |
| `category` | string | `men`, `women`, `kids` ou `accessories` |
| `brand` | string | marque, 0 à 40 caractères (chaîne vide si aucune) |
| `image` | string | adresse http(s) de l'image, 500 caractères max |
| `inStock` | boolean | article disponible ou non |
| `ownerId` | string | `uid` de l'auteur, fixé à la création, jamais modifié |
| `createdAt` | number | date de création (ms depuis 1970), jamais modifiée |

## Organisation du code

```
src/
├── app/          routes Expo Router (pile racine protégée, (auth), onglets, articles, +not-found)
├── components/   composants d'affichage (carte article, filtres, formulaires, messages d'état…)
├── context/      AuthProvider (session Firebase), CartProvider (panier partagé)
├── hooks/        useAuth, useCart, useRealtimeCart, useCatalog, useMyProducts, useCatalogActions,
│                 useProducts, useProduct, useProductFilters, useColumns
├── models/       types et règles métier (utilisateur, article, validation, panier)
├── services/     Firebase (firebase, auth-service, cart-service, catalog-service) et API (products-service)
└── types/        déclaration de getReactNativePersistence pour firebase/auth
```

Aucun appel Firebase n'est fait dans `src/app/` ni dans `src/components/` : les écrans passent par les hooks, qui passent par les services.