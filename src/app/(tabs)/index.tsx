import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";
import { CartBadge } from "@/components/cart-badge";
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
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        key={columns}
        data={products}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={columns > 1 ? styles.row : undefined}
        contentContainerStyle={[styles.content, isWide && styles.wideContent]}
        ListHeaderComponent={(
          <View>
            <View style={styles.topBar}>
              <View>
                <Text style={styles.brand}>THE KNORR FACE</Text>
                <Text style={styles.tagline}>LE STYLE, SANS EFFORT.</Text>
              </View>
              <CartBadge />
            </View>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>COLLECTION 2026</Text>
              <Text style={styles.heroTitle}>Les essentiels{ "\n" }du quotidien.</Text>
              <Text style={styles.heroSubtitle}>Des pièces choisies pour durer, pensées pour vous.</Text>
            </View>
            <View style={styles.catalogHeading}>
              <Text style={styles.sectionTitle}>La sélection</Text>
              <Text style={styles.resultCount}>{state.status === "success" ? `${products.length} articles` : ""}</Text>
            </View>
            <ProductFilters query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} />
          </View>
        )}
        renderItem={({ item }) => <ProductCard product={item} onAddToCart={addToCart} onPress={openProduct} />}
        ListEmptyComponent={
          state.status === "loading" ? (
            <StatusMessage status="loading" />  
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
  content: { paddingHorizontal: 18, paddingBottom: 28 },
  wideContent: { width: "100%", maxWidth: 1200, alignSelf: "center", paddingHorizontal: 32 },
  topBar: { minHeight: 68, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.border },
  brand: { color: colors.text, fontSize: 16, letterSpacing: 2, fontWeight: "800" },
  tagline: { color: colors.textMuted, fontSize: 8, letterSpacing: 2, marginTop: 4 },
  hero: { backgroundColor: colors.surfaceAccent, borderRadius: 18, marginTop: 20, marginBottom: 25, paddingHorizontal: 22, paddingVertical: 28 },
  eyebrow: { color: colors.textSecondary, fontSize: 10, letterSpacing: 2 },
  heroTitle: { color: colors.text, fontSize: 32, lineHeight: 37, fontWeight: "700", marginTop: 12 },
  heroSubtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 9, lineHeight: 19 },
  catalogHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  sectionTitle: { color: colors.text, fontSize: 21, fontWeight: "700" },
  resultCount: { color: colors.textMuted, fontSize: 12 },
  row: { gap: 14 },
  empty: { color: colors.textSecondary, textAlign: "center", paddingVertical: 36, fontSize: 14 },
  stateBox: { alignItems: "center", gap: 12, paddingVertical: 36 },
  stateText: { color: colors.textSecondary, fontSize: 14, textAlign: "center" },
  retryButton: { backgroundColor: colors.primary, borderRadius: 20, paddingHorizontal: 18, paddingVertical: 10 },
  retryText: { color: colors.onPrimary, fontSize: 12, fontWeight: "600" },
});
