import { useCallback, useEffect, useState } from "react";

import { fetchProducts } from "@/services/products-service";
import type { Product } from "@/models/product";

type ProductsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; products: Product[] };

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: "loading" });
  const [loadAttempt, setLoadAttempt] = useState(0);

  const reload = useCallback(() => {
    setState({ status: "loading" });
    setLoadAttempt((attempt) => attempt + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const products = await fetchProducts();
        if (!controller.signal.aborted) {
          setState({ status: "success", products });
        }
      } catch {
        if (!controller.signal.aborted) {
          setState({ status: "error", message: "Le catalogue n’a pas pu être chargé." });
        }
      }
    }

    void load();
    return () => controller.abort();
  }, [loadAttempt]);

  return { state, reload };
}
