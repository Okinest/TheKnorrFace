import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ProductForm } from "@/components/product-form";
import { StatusMessage } from "@/components/status-message";
import { colors } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { useCatalogActions } from "@/hooks/use-catalog";
import { useProduct } from "@/hooks/use-product";
import type { ProductInput } from "@/models/product";

export default function EditProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const state = useProduct(id);
  const { update } = useCatalogActions();

  if (state.status === "loading") return <StatusMessage status="loading" message="Chargement de l’article…" />;
  if (state.status === "error") return <StatusMessage status="error" message={state.message} />;
  if (state.status === "not-found" || state.product.ownerId !== user?.uid)
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ title: "Modification impossible" }} />
        <StatusMessage status="error" message="Vous ne pouvez modifier que vos propres articles." />
      </View>
    );

  const { product } = state;
  const initial: ProductInput = {
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    brand: product.brand ?? "",
    image: product.image,
    inStock: product.inStock,
  };

  const submit = async (input: ProductInput) => {
    await update(id, input);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: "Modifier l’article" }} />
      <ProductForm initial={initial} submitLabel="Enregistrer" onSubmit={submit} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
});
