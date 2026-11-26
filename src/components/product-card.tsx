import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/button";
import { colors, pressedOpacity, radius } from "@/constants/theme";
import { CATEGORY_LABELS, formatPrice, type Product } from "@/models/product";

type Props = {
  product: Product;
  onAddToCart: (productId: string) => void;
  onPress?: (productId: string) => void;
};

export function ProductCard({ product, onAddToCart, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`Voir ${product.title}`}
      onPress={() => onPress?.(product.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" transition={180} />
      <View style={styles.details}>
        <Text style={styles.category}>{CATEGORY_LABELS[product.category]}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {product.inStock ? (
            <Button
              size="sm"
              label="Ajouter"
              accessibilityLabel={`Ajouter ${product.title} au panier`}
              onPress={() => onAddToCart(product.id)}
            />
          ) : (
            <Text style={styles.unavailable}>Épuisé</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: pressedOpacity },
  image: { width: "100%", aspectRatio: 4 / 5, backgroundColor: colors.surfaceMuted },
  details: { padding: 12, gap: 4, flex: 1 },
  category: { color: colors.textSecondary, fontSize: 12 },
  name: { color: colors.text, fontSize: 15, fontWeight: "600" },
  footer: { marginTop: "auto", paddingTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  price: { color: colors.text, fontSize: 15, fontWeight: "700", fontVariant: ["tabular-nums"] },
  unavailable: { color: colors.danger, fontSize: 14, fontWeight: "600" },
});
