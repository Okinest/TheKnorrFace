import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import type { Product, ProductInput } from "@/models/product";
import {
  createProduct,
  deleteProduct,
  subscribeToCatalog,
  updateProduct,
} from "@/services/catalog-service";

export type CatalogState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; products: Product[] };

// Écoute en temps réel les vêtements ajoutés par les utilisateurs.
// `attempt` permet de relancer l'écoute après une erreur.
export function useCatalog(attempt = 0): CatalogState {
  const [received, setReceived] = useState<{ attempt: number; state: CatalogState } | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToCatalog(
      (products) => setReceived({ attempt, state: { status: "success", products } }),
      () => setReceived({ attempt, state: { status: "error", message: "Le catalogue n’a pas pu être chargé." } }),
    );
    return unsubscribe;
  }, [attempt]);

  return received !== null && received.attempt === attempt ? received.state : { status: "loading" };
}

// Les vêtements publiés par l'utilisateur connecté
export function useMyProducts(): CatalogState {
  const { user } = useAuth();
  const state = useCatalog();
  if (state.status !== "success") return state;
  return { status: "success", products: state.products.filter((p) => p.ownerId === user?.uid) };
}

// Actions d'écriture. Chaque action renvoie une promesse : l'écran affiche l'erreur s'il y en a une.
export function useCatalogActions() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const create = useCallback(
    (input: ProductInput) => {
      if (uid === null) return Promise.reject(new Error("Non connecté"));
      return createProduct(uid, input);
    },
    [uid],
  );

  const update = useCallback((id: string, input: ProductInput) => updateProduct(id, input), []);
  const remove = useCallback((id: string) => deleteProduct(id), []);

  return { create, update, remove };
}
