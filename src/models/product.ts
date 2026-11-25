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
};

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
