import { PRODUCTS } from "@/data/products";
import type { Product } from "@/models/product";

// Service mocké : pourra être remplacé par fetch sans changer l'écran.
export async function fetchProducts(): Promise<Product[]> {
  return PRODUCTS;
}
