import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

import { INITIAL_CART, type CartItem } from "@/data/cart";

export type CartContextValue = {
  items: CartItem[];
  count: number;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

// `null` par défaut : permet au hook useCart de détecter un usage hors du Provider.
export const CartContext = createContext<CartContextValue | null>(null);

type Props = { children: ReactNode };

export function CartProvider({ children }: Props) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  const addToCart = useCallback((productId: string) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      return existing
        ? current.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
        : [...current, { productId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((current) =>
      current
        .map((item) => (item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  // Le total est dérivé des items : pas de useState séparé.
  const count = items.reduce((total, item) => total + item.quantity, 0);

  const value = useMemo(
    () => ({ items, count, addToCart, removeFromCart, clearCart }),
    [items, count, addToCart, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
