import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";
import { CartErrorBanner } from "@/components/cart-error-banner";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { StatusMessage } from "@/components/status-message";
import { useCart } from "@/hooks/use-cart";
import { useColumns } from "@/hooks/use-columns";
import { useProductFilters } from "@/hooks/use-product-filters";
import { useProducts } from "@/hooks/use-products";

export default function Index() {
  const router = useRouter();
  const { columns, isWide } = useColumns();
  const { state, reload } = useProducts();
  const allProducts = state.status === "success" ? state.products : [];
  const { query, setQuery, category, setCategory, products } = useProductFilters(allProducts);
  const { addToCart } = useCart();

  const openProduct = (id: string) =>
    router.push({ pathname: "/products/[id]", params: { id } });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        key={columns}
        data={products}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={columns > 1 ? styles.row : undefined}
        contentContainerStyle={[styles.content, isWide && styles.wideContent]}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={(
          <View>
            <View style={styles.header}>
              <Text style={styles.heading}>Catalogue</Text>
              {state.status === "success" && (
                <Text style={styles.resultCount}>
                  {products.length} article{products.length > 1 ? "s" : ""}
                </Text>
              )}
            </View>
            <CartErrorBanner />
            <ProductFilters query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} />
          </View>
        )}
        renderItem={({ item }) => <ProductCard product={item} onAddToCart={addToCart} onPress={openProduct} />}
        ListEmptyComponent={
          state.status === "loading" ? (
            <StatusMessage status="loading" message="Chargement du catalogue…" />
          ) : state.status === "error" ? (
            <StatusMessage status="error" message={state.message} onRetry={reload} />
          ) : <Text style={styles.empty}>Aucun article ne correspond à votre recherche.</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  wideContent: { width: "100%", maxWidth: 1200, alignSelf: "center", paddingHorizontal: 32 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginTop: 16, marginBottom: 16 },
  heading: { color: colors.text, fontSize: 28, fontWeight: "700" },
  resultCount: { color: colors.textSecondary, fontSize: 14 },
  row: { gap: 12 },
  empty: { color: colors.textSecondary, textAlign: "center", paddingVertical: 40, fontSize: 15 },
});
