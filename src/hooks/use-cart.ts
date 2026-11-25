import { useContext } from "react";

import { CartContext, type CartContextValue } from "@/context/cart-context";

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un <CartProvider>.");
  }
  return context;
}
