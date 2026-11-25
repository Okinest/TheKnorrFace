import { createContext, useCallback, useMemo, type ReactNode } from "react";

import { useAuth } from "@/hooks/use-auth";
import { useRealtimeCart, type CartState } from "@/hooks/use-realtime-cart";
import type { CartItem } from "@/models/cart";
import { deleteCartItem, saveCartItem } from "@/services/cart-service";

export type CartContextValue = {
  status: CartState["status"];
  items: CartItem[];
  count: number;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

// `null` par défaut : permet au hook useCart de détecter un usage hors du Provider.
export const CartContext = createContext<CartContextValue | null>(null);

type Props = { children: ReactNode };

// Le panier vit dans Firestore. Le Provider ne stocke rien lui-même :
// chaque action écrit dans Firestore, puis onSnapshot prévient tous les écrans.
export function CartProvider({ children }: Props) {
  const { user } = useAuth();
  const uid = user ? user.uid : null;
  const state = useRealtimeCart(uid);
  const items = useMemo(() => (state.status === "success" ? state.items : []), [state]);

  const addToCart = useCallback(
    (productId: string) => {
      if (uid === null) return;
      const existing = items.find((item) => item.productId === productId);
      void saveCartItem(uid, {
        productId,
        quantity: (existing?.quantity ?? 0) + 1,
        addedAt: existing?.addedAt ?? Date.now(),
      });
    },
    [uid, items],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      if (uid === null) return;
      const existing = items.find((item) => item.productId === productId);
      if (!existing) return;
      // Les règles refusent une quantité à 0 : on supprime le document.
      void (existing.quantity <= 1
        ? deleteCartItem(uid, productId)
        : saveCartItem(uid, { ...existing, quantity: existing.quantity - 1 }));
    },
    [uid, items],
  );

  const clearCart = useCallback(() => {
    if (uid === null) return;
    items.forEach((item) => void deleteCartItem(uid, item.productId));
  }, [uid, items]);

  // Le total est dérivé des items : pas de useState séparé.
  const count = items.reduce((total, item) => total + item.quantity, 0);

  const value = useMemo(
    () => ({ status: state.status, items, count, addToCart, removeFromCart, clearCart }),
    [state.status, items, count, addToCart, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
