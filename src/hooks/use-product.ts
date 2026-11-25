import { useEffect, useState } from "react";

import type { Product } from "@/models/product";
import { fetchProduct } from "@/services/products-service";

export type ProductState =
  | { status: "loading" }
  | { status: "not-found" }
  | { status: "error"; message: string }
  | { status: "success"; product: Product };

export function useProduct(id: string) {
  const [state, setState] = useState<ProductState>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    fetchProduct(id)
      .then((product) => {
        if (!cancelled)
          setState(
            product
              ? { status: "success", product }
              : { status: "not-found" },
          );
      })
      .catch(() => {
        if (!cancelled)
          setState({ status: "error", message: "L’article n’a pas pu être chargé." });
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
