import { Image } from "expo-image";
import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { DeleteProductButton } from "@/components/delete-product-button";
import { StatusMessage } from "@/components/status-message";
import { colors, radius } from "@/constants/theme";
import { useMyProducts } from "@/hooks/use-catalog";
import { CATEGORY_LABELS, formatPrice } from "@/models/product";

export default function MyProductsScreen() {
  const state = useMyProducts();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        data={state.status === "success" ? state.products : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.heading}>Mes articles</Text>
            <Link href="/products/new" asChild>
              <Button size="sm" label="Nouvel article" />
            </Link>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.thumb} contentFit="cover" />
            <View style={styles.info}>
              <Link href={{ pathname: "/products/[id]", params: { id: item.id } }} style={styles.title} numberOfLines={1}>
                {item.title}
              </Link>
              <Text style={styles.meta}>
                {CATEGORY_LABELS[item.category]} · {formatPrice(item.price)}
                {!item.inStock && <Text style={styles.unavailable}> · Épuisé</Text>}
              </Text>
              <View style={styles.actions}>
                <Link href={{ pathname: "/products/edit/[id]", params: { id: item.id } }} asChild>
                  <Button size="sm" variant="secondary" label="Modifier" />
                </Link>
                <DeleteProductButton productId={item.id} />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          state.status === "loading" ? (
            <StatusMessage status="loading" message="Chargement de vos articles…" />
          ) : state.status === "error" ? (
            <StatusMessage status="error" message={state.message} />
          ) : (
            <Text style={styles.empty}>Vous n’avez encore publié aucun article.</Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  list: { width: "100%", maxWidth: 800, alignSelf: "center", paddingHorizontal: 16, paddingBottom: 32 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16, marginBottom: 8 },
  heading: { color: colors.text, fontSize: 28, fontWeight: "700" },
  row: { flexDirection: "row", gap: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  thumb: { width: 80, height: 100, borderRadius: radius.sm, backgroundColor: colors.surfaceMuted },
  info: { flex: 1, gap: 4 },
  title: { color: colors.text, fontSize: 15, fontWeight: "600" },
  meta: { color: colors.textSecondary, fontSize: 14 },
  unavailable: { color: colors.danger },
  actions: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginTop: 8, flexWrap: "wrap" },
  empty: { color: colors.textSecondary, textAlign: "center", paddingVertical: 40, fontSize: 15 },
});
