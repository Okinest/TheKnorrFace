import { useMemo, useState } from "react";

import { matchesFilters, type Product, type ProductCategory } from "@/models/product";

export function useProductFilters(items: Product[]) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const products = useMemo(
    () => items.filter((product) => matchesFilters(product, {
      query,
      category,
      price: { min: null, max: null },
      inStock: null,
    })),
    [items, query, category],
  );

  return { query, setQuery, category, setCategory, products };
}
