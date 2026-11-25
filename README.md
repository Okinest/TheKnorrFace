# The Knorr Face

Application mobile et web de boutique de vêtements, réalisée avec Expo et Expo Router (projet React Native, ESGI).

## Lancer le projet

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
| Catalogue (onglet) | `src/app/(tabs)/index.tsx` | `/` | `theknorrface://` |
| Panier (onglet) | `src/app/(tabs)/cart.tsx` | `/cart` | `theknorrface://cart` |
| Détail d'un article | `src/app/products/[id].tsx` | `/products/:id` (ex. `/products/83`) | `theknorrface://products/83` |
| Page introuvable | `src/app/+not-found.tsx` | toute adresse inconnue | |

- **Catalogue** : les articles de l'API, affichés en grille. On peut les filtrer par recherche texte et par catégorie, et ces deux filtres se combinent. Un appui sur une carte ouvre le détail.
- **Panier** : une `SectionList` des articles du panier, regroupés par catégorie, avec les quantités et le total. Chaque article renvoie vers son détail.
- **Détail** : l'écran lit l'identifiant dans l'URL et recharge l'article depuis l'API. Le nom de l'article s'affiche dans l'en-tête. Un identifiant inconnu affiche « Cet article est introuvable. ».
- **Page introuvable** : affiche un lien de retour vers le catalogue.

Dans Expo Go, les liens profonds prennent la forme `exp://<IP>:8081/--/products/83`.

## API utilisée

[DummyJSON](https://dummyjson.com/docs/products), sans clé :

- `GET https://dummyjson.com/products/category/{categorie}` charge la liste du catalogue. Les catégories utilisées sont `mens-shirts`, `mens-shoes`, `tops`, `womens-dresses`, `womens-shoes`, `womens-bags` et `sunglasses`.
- `GET https://dummyjson.com/products/{id}` charge un article. Un article hors de ces catégories, ou un identifiant inconnu (404), est considéré comme introuvable.

Une collection Postman est disponible dans `postman/`.

## Organisation du code

```
src/
├── app/          routes Expo Router (pile racine, onglets, détail, +not-found)
├── components/   composants d'affichage (carte article, filtres, messages d'état…)
├── context/      CartProvider (état du panier partagé)
├── hooks/        useProducts, useProduct, useProductFilters, useCart, useColumns
├── models/       types et règles métier (filtres, regroupement par catégorie, panier)
└── services/     appels à l'API (fetchProducts, fetchProduct)
```
