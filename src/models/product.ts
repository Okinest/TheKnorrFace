export type ProductCategory = 'men' | 'women' | 'kids' | 'accessories';

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  brand?: string;
  image: string;
  inStock: boolean;
  ownerId?: string;
};

// Les identifiants DummyJSON sont numériques, ceux de Firestore ne le sont pas
export function isApiProductId(id: string): boolean {
  return /^\d+$/.test(id);
}

export type ProductInput = {
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  brand: string;
  image: string;
  inStock: boolean;
};

export const PRODUCT_LIMITS = { title: 80, description: 500, brand: 40, image: 500 } as const;

export function validateProductInput(input: ProductInput): string | null {
  if (input.title.trim() === "") return "Le nom est obligatoire.";
  if (input.title.length > PRODUCT_LIMITS.title)
    return `Le nom ne doit pas dépasser ${PRODUCT_LIMITS.title} caractères.`;
  if (input.brand.length > PRODUCT_LIMITS.brand)
    return `La marque ne doit pas dépasser ${PRODUCT_LIMITS.brand} caractères.`;
  if (input.description.length > PRODUCT_LIMITS.description)
    return `La description ne doit pas dépasser ${PRODUCT_LIMITS.description} caractères.`;
  if (!Number.isFinite(input.price) || input.price <= 0 || input.price > 10000)
    return "Le prix doit être un nombre entre 0 et 10 000 €.";
  if (!/^https?:\/\/\S+$/.test(input.image) || input.image.length > PRODUCT_LIMITS.image)
    return "L'image doit être une adresse web (http ou https).";
  return null;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  men: "Homme",
  women: "Femme",
  kids: "Enfant",
  accessories: "Accessoires",
};

export type ProductFilters = {
  query: string;
  category: ProductCategory | null;
  price: {
      min: number | null;
      max: number | null;
  };
  inStock: boolean | null;
}

export function matchesFilters(product: Product, filters: ProductFilters): boolean {
  const search = filters.query.trim().toLowerCase();
  const matchesQuery = 
    product.title.toLowerCase().includes(search) ||
    product.description.toLowerCase().includes(search);
  const matchesCategory = filters.category === null || product.category === filters.category;
  const matchesPrice =
    (filters.price.min === null || product.price >= filters.price.min) &&
    (filters.price.max === null || product.price <= filters.price.max);
  const matchesInStock = filters.inStock === null || product.inStock === filters.inStock;
  return matchesQuery && matchesCategory && matchesPrice && matchesInStock;
}

export type CategorySection<T> = { title: string; data: T[] };

// Regroupe des articles par catégorie, au format attendu par SectionList
export function groupByCategory<T extends { category: ProductCategory }>(
  items: T[],
): CategorySection<T>[] {
  const categories = Object.keys(CATEGORY_LABELS) as ProductCategory[];
  return categories
    .map((category) => ({
      title: CATEGORY_LABELS[category],
      data: items.filter((item) => item.category === category),
    }))
    .filter((section) => section.data.length > 0);
}

const priceFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

// Format unique des prix : « 49,90 € »
export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}
