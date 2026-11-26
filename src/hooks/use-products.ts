import { useCallback, useEffect, useMemo, useState } from "react";

import { useCatalog } from "@/hooks/use-catalog";
import type { Product } from "@/models/product";
import { fetchProducts } from "@/services/products-service";

type ProductsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; products: Product[] };

type ApiState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; products: Product[] };

export function useProducts() {
  const [api, setApi] = useState<ApiState>({ status: "loading" });
  const [loadAttempt, setLoadAttempt] = useState(0);
  const catalog = useCatalog(loadAttempt);

  const reload = useCallback(() => {
    setApi({ status: "loading" });
    setLoadAttempt((attempt) => attempt + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const products = await fetchProducts();
        if (!controller.signal.aborted) setApi({ status: "success", products });
      } catch {
        if (!controller.signal.aborted) setApi({ status: "error" });
      }
    }

    void load();
    return () => controller.abort();
  }, [loadAttempt]);

  const state = useMemo<ProductsState>(() => {
    if (api.status === "error" || catalog.status === "error")
      return { status: "error", message: "Le catalogue n’a pas pu être chargé." };
    if (api.status === "loading" || catalog.status === "loading") return { status: "loading" };
    return { status: "success", products: [...catalog.products, ...api.products] };
  }, [api, catalog]);

  return { state, reload };
}
