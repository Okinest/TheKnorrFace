import { Stack, useRouter } from "expo-router";

import { ProductForm } from "@/components/product-form";
import { useCatalogActions } from "@/hooks/use-catalog";
import type { ProductInput } from "@/models/product";

export default function NewProductScreen() {
  const router = useRouter();
  const { create } = useCatalogActions();

  const submit = async (input: ProductInput) => {
    const id = await create(input);
    router.replace({ pathname: "/products/[id]", params: { id } });
  };

  return (
    <>
      <Stack.Screen options={{ title: "Nouvel article" }} />
      <ProductForm submitLabel="Publier" onSubmit={submit} />
    </>
  );
}
