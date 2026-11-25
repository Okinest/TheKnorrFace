import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/theme";
import { CATEGORY_LABELS, type Product } from "@/models/product";

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
      style={styles.card}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" transition={180} />
      </View>
      <View style={styles.details}>
        <Text style={styles.category}>{CATEGORY_LABELS[product.category]}</Text>
        <Text style={styles.name} numberOfLines={1}>{product.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{product.price} €</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Ajouter ${product.title} au panier`}
            onPress={() => onAddToCart(product.id)}
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
          >
            <Text style={styles.addText}>+ Panier</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: colors.surface, borderRadius: 14, overflow: "hidden", marginBottom: 18, borderWidth: 1, borderColor: colors.border },
  imageWrap: { height: 220, backgroundColor: colors.surfaceMuted },
  image: { width: "100%", height: "100%" },
  details: { padding: 13 },
  category: { color: colors.textMuted, fontSize: 10, letterSpacing: 1.4, marginBottom: 5, textTransform: "uppercase" },
  name: { color: colors.text, fontSize: 15, fontWeight: "600" },
  footer: { marginTop: 11, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 6 },
  price: { color: colors.text, fontSize: 14, fontWeight: "700" },
  addButton: { backgroundColor: colors.primary, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8 },
  pressed: { opacity: 0.7 },
  addText: { color: colors.onPrimary, fontSize: 11, fontWeight: "600" },
});
