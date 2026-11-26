import { useEffect, useState } from "react";

import { isApiProductId, type Product } from "@/models/product";
import { subscribeToCatalogProduct } from "@/services/catalog-service";
import { fetchProduct } from "@/services/products-service";

export type ProductState =
  | { status: "loading" }
  | { status: "not-found" }
  | { status: "error"; message: string }
  | { status: "success"; product: Product };

const ERROR: ProductState = { status: "error", message: "L’article n’a pas pu être chargé." };

export function useProduct(id: string) {
  const [received, setReceived] = useState<{ id: string; state: ProductState } | null>(null);

  useEffect(() => {
    if (!isApiProductId(id)) {
      return subscribeToCatalogProduct(
        id,
        (product) =>
          setReceived({ id, state: product ? { status: "success", product } : { status: "not-found" } }),
        () => setReceived({ id, state: ERROR }),
      );
    }

    let cancelled = false;
    fetchProduct(id)
      .then((product) => {
        if (!cancelled)
          setReceived({ id, state: product ? { status: "success", product } : { status: "not-found" } });
      })
      .catch(() => {
        if (!cancelled) setReceived({ id, state: ERROR });
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return received !== null && received.id === id ? received.state : ({ status: "loading" } as ProductState);
}
