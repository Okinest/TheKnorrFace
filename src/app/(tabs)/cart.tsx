import { Link } from "expo-router";
import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusMessage } from "@/components/status-message";
import { useCart } from "@/hooks/use-cart";
import { useProducts } from "@/hooks/use-products";
import { cartTotal, toCartLines } from "@/models/cart";
import { groupByCategory } from "@/models/product";

export default function CartScreen() {
  const { state, reload } = useProducts();
  const { items, addToCart, removeFromCart } = useCart();

  if (state.status === "loading")
    return <StatusMessage status="loading" message="Chargement du panier…" />;
  if (state.status === "error")
    return <StatusMessage status="error" message={state.message} onRetry={reload} />;

  const lines = toCartLines(state.products, items);
  const sections = groupByCategory(lines);
  const total = cartTotal(lines);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <SectionList
        sections={sections}
        keyExtractor={(line) => line.id}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={<Text style={styles.heading}>Mon panier</Text>}
        renderSectionHeader={({ section }) => (
          <Text style={styles.category}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.line}>
            <Link
              href={{ pathname: "/products/[id]", params: { id: item.id } }}
              style={styles.title}
              numberOfLines={1}
            >
              {item.title}
            </Link>
            <Text style={styles.price}>{item.price} €</Text>
            <View style={styles.quantity}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Retirer un ${item.title}`}
                onPress={() => removeFromCart(item.id)}
                style={({ pressed }) => [styles.qtyButton, pressed && styles.pressed]}
              >
                <Text style={styles.qtyText}>−</Text>
              </Pressable>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Ajouter un ${item.title}`}
                onPress={() => addToCart(item.id)}
                style={({ pressed }) => [styles.qtyButton, pressed && styles.pressed]}
              >
                <Text style={styles.qtyText}>+</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Votre panier est vide pour le moment.</Text>
        }
        ListFooterComponent={
          lines.length > 0 ? (
            <View style={styles.footer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{total.toFixed(2)} €</Text>
            </View>
          ) : undefined
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F7F4" },
  list: { width: "100%", maxWidth: 800, alignSelf: "center", paddingHorizontal: 18, paddingBottom: 28 },
  heading: { color: "#25231F", fontSize: 24, fontWeight: "700", marginTop: 20 },
  category: {
    color: "#7D786F",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginTop: 22,
    marginBottom: 6,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E9E6DF",
  },
  title: { flex: 1, color: "#25231F", fontSize: 15, fontWeight: "600" },
  price: { color: "#25231F", fontSize: 14 },
  quantity: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D8D4CC",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.6 },
  qtyText: { color: "#25231F", fontSize: 16, fontWeight: "600" },
  qtyValue: { minWidth: 18, textAlign: "center", color: "#25231F", fontSize: 14 },
  empty: { color: "#6B665D", textAlign: "center", paddingVertical: 36, fontSize: 14 },
  footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 22 },
  totalLabel: { color: "#25231F", fontSize: 17, fontWeight: "700" },
  totalValue: { color: "#25231F", fontSize: 17, fontWeight: "700" },
});
