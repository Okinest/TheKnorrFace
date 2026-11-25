import { useEffect, useState } from "react";

import type { CartItem } from "@/models/cart";
import { subscribeToCart } from "@/services/cart-service";

export type CartState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; items: CartItem[] };

const LOADING: CartState = { status: "loading" };

// Écoute le panier de l'utilisateur dans Firestore.
// L'écoute démarre au montage et s'arrête au démontage ou au changement d'utilisateur.
export function useRealtimeCart(uid: string | null): CartState {
  // On retient à quel utilisateur appartient l'état reçu : après un changement
  // de compte, l'ancien panier n'est jamais affiché, on repasse en chargement.
  const [received, setReceived] = useState<{ uid: string; state: CartState } | null>(null);

  useEffect(() => {
    if (uid === null) return;
    const unsubscribe = subscribeToCart(
      uid,
      (items) => setReceived({ uid, state: { status: "success", items } }),
      () => setReceived({ uid, state: { status: "error", message: "Panier indisponible." } }),
    );
    // Sans ce nettoyage, les écoutes s'empileraient à chaque connexion.
    return unsubscribe;
  }, [uid]);

  return received !== null && received.uid === uid ? received.state : LOADING;
}
