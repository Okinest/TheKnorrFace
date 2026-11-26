import { Link } from "expo-router";
import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, pressedOpacity } from "@/constants/theme";
import { CartErrorBanner } from "@/components/cart-error-banner";
import { StatusMessage } from "@/components/status-message";
import { useCart } from "@/hooks/use-cart";
import { useProducts } from "@/hooks/use-products";
import { cartTotal, toCartLines } from "@/models/cart";
import { formatPrice, groupByCategory } from "@/models/product";

export default function CartScreen() {
  const { state, reload } = useProducts();
  const { status: cartStatus, items, addToCart, removeFromCart } = useCart();

  let body: React.ReactNode;
  if (state.status === "loading" || cartStatus === "loading")
    body = <StatusMessage status="loading" message="Chargement du panier…" />;
  else if (state.status === "error")
    body = <StatusMessage status="error" message={state.message} onRetry={reload} />;
  else if (cartStatus === "error")
    body = <StatusMessage status="error" message="Votre panier est indisponible pour le moment." />;
  else {
    const lines = toCartLines(state.products, items);
    const total = cartTotal(lines);
    body = (
      <SectionList
        sections={groupByCategory(lines)}
        keyExtractor={(line) => line.id}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>Panier</Text>
            <CartErrorBanner />
          </View>
        }
        renderSectionHeader={({ section }) => <Text style={styles.category}>{section.title}</Text>}
        renderItem={({ item }) => (
          <View style={styles.line}>
            <View style={styles.info}>
              <Link href={{ pathname: "/products/[id]", params: { id: item.id } }} style={styles.title} numberOfLines={1}>
                {item.title}
              </Link>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
            </View>
            <View style={styles.quantity}>
              <QuantityButton symbol="−" label={`Retirer un ${item.title}`} onPress={() => removeFromCart(item.id)} />
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <QuantityButton symbol="+" label={`Ajouter un ${item.title}`} onPress={() => addToCart(item.id)} />
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Votre panier est vide.</Text>}
        ListFooterComponent={
          lines.length > 0 ? (
            <View style={styles.footer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
          ) : undefined
        }
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {body}
    </SafeAreaView>
  );
}

function QuantityButton({ symbol, label, onPress }: { symbol: string; label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [styles.qtyButton, pressed && styles.pressed]}
    >
      <Text style={styles.qtyText}>{symbol}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  list: { width: "100%", maxWidth: 800, alignSelf: "center", paddingHorizontal: 16, paddingBottom: 32 },
  heading: { color: colors.text, fontSize: 28, fontWeight: "700", marginTop: 16, marginBottom: 8 },
  category: { color: colors.textSecondary, fontSize: 14, fontWeight: "600", marginTop: 24, marginBottom: 4 },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  info: { flex: 1, gap: 2 },
  title: { color: colors.text, fontSize: 15, fontWeight: "600" },
  price: { color: colors.textSecondary, fontSize: 14, fontVariant: ["tabular-nums"] },
  quantity: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: pressedOpacity },
  qtyText: { color: colors.text, fontSize: 18, fontWeight: "600" },
  qtyValue: { minWidth: 24, textAlign: "center", color: colors.text, fontSize: 15, fontVariant: ["tabular-nums"] },
  empty: { color: colors.textSecondary, textAlign: "center", paddingVertical: 40, fontSize: 15 },
  footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
  totalLabel: { color: colors.text, fontSize: 17, fontWeight: "700" },
  totalValue: { color: colors.text, fontSize: 17, fontWeight: "700", fontVariant: ["tabular-nums"] },
});
