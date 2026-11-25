import { Pressable, StyleSheet, Text } from "react-native";

import { useCart } from "@/hooks/use-cart";

// Lit le panier directement depuis le Context : aucune prop nécessaire.
export function CartBadge() {
  const { count } = useCart();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Panier, ${count} article${count > 1 ? "s" : ""}`}
      style={styles.badge}
    >
      <Text style={styles.text}>PANIER  ·  {count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: { borderWidth: 1, borderColor: "#D8D4CC", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 9 },
  text: { color: "#35322C", fontSize: 10, letterSpacing: 0.8 },
});
