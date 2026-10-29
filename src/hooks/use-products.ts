import { useCallback, useEffect, useState } from "react";

import { fetchProducts } from "@/services/products-service";
import type { Product } from "@/models/product";

type ProductsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; products: Product[] };

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: "loading" });

  const reload = useCallback(async () => {
    setState({ status: "loading" });
    try {
      setState({ status: "success", products: await fetchProducts() });
    } catch {
      setState({ status: "error", message: "Le catalogue n’a pas pu être chargé." });
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchProducts()
      .then((products) => { if (active) setState({ status: "success", products }); })
      .catch(() => { if (active) setState({ status: "error", message: "Le catalogue n’a pas pu être chargé." }); });
    return () => { active = false; };
  }, []);

  return { state, reload };
}
