import type { CartItem } from "@/data/cart";
import type { Product } from "@/models/product";

// Une ligne du panier : l'article et sa quantité
export type CartLine = Product & { quantity: number };

// Associe chaque élément du panier à son article. Un article inconnu est ignoré
export function toCartLines(products: Product[], items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return product ? [{ ...product, quantity: item.quantity }] : [];
  });
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.price * line.quantity, 0);
}
