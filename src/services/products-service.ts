import type { Product, ProductCategory } from "@/models/product";

const PRODUCTS_URL = "https://dummyjson.com/products";

type ApiProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
  brand?: string;
};

type ApiResponse = { products: ApiProduct[] };

const CATEGORIES: Record<string, ProductCategory> = {
  "mens-shirts": "men",
  "mens-shoes": "men",
  "tops": "women",
  "womens-dresses": "women",
  "womens-shoes": "women",
  "womens-bags": "accessories",
  "sunglasses": "accessories",
};

function toProduct(item: ApiProduct, category: ProductCategory): Product {
  return {
    id: String(item.id),
    title: item.title,
    description: item.description,
    price: item.price,
    category,
    image: item.thumbnail,
    inStock: item.stock > 0,
    brand: item.brand,
  };
}

async function fetchCategory(apiCategory: string): Promise<Product[]> {
  const response = await fetch(`${PRODUCTS_URL}/category/${apiCategory}`);
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }
  const data: ApiResponse = await response.json();
  return data.products.map((item) => toProduct(item, CATEGORIES[apiCategory]));
}

export async function fetchProducts(): Promise<Product[]> {
  const lists = await Promise.all(Object.keys(CATEGORIES).map(fetchCategory));
  return lists.flat();
}

export async function fetchProduct(id: string): Promise<Product | undefined> {
  const response = await fetch(`${PRODUCTS_URL}/${encodeURIComponent(id)}`);
  // L'API répond 404 pour un identifiant inconnu : ce n'est pas une erreur
  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }
  const data: ApiProduct = await response.json();
  // Un article hors des catégories du catalogue n'est pas vendu par la boutique
  const category = CATEGORIES[data.category];
  return category ? toProduct(data, category) : undefined;
}
