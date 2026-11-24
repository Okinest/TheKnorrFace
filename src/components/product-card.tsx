import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Product, ProductCategory } from "@/models/product";

type Props = { product: Product; onAddToCart: (productId: string) => void };

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  men: "HOMME",
  women: "FEMME",
  kids: "ENFANT",
  accessories: "ACCESSOIRES",
};

export function ProductCard({ product, onAddToCart }: Props) {
  return (
    <View style={styles.card}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 14, overflow: "hidden", marginBottom: 18, borderWidth: 1, borderColor: "#EDEAE5" },
  imageWrap: { height: 220, backgroundColor: "#F0EEE9" },
  image: { width: "100%", height: "100%" },
  details: { padding: 13 },
  category: { color: "#7D786F", fontSize: 10, letterSpacing: 1.4, marginBottom: 5 },
  name: { color: "#25231F", fontSize: 15, fontWeight: "600" },
  footer: { marginTop: 11, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 6 },
  price: { color: "#25231F", fontSize: 14, fontWeight: "700" },
  addButton: { backgroundColor: "#27251F", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8 },
  pressed: { opacity: 0.7 },
  addText: { color: "#FFFFFF", fontSize: 11, fontWeight: "600" },
});
