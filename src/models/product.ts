export type ProductCategory = 'men' | 'women' | 'kids' | 'accessories';

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
  inStock: boolean;
  brand?: string;
}

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