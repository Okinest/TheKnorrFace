import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/theme";
import { StatusMessage } from "@/components/status-message";
import { useCart } from "@/hooks/use-cart";
import { useProduct } from "@/hooks/use-product";
import { CATEGORY_LABELS, type Product } from "@/models/product";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const state = useProduct(id);

  if (state.status === "loading")
    return <StatusMessage status="loading" message="Chargement de l’article…" />;
  if (state.status === "not-found")
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ title: "Article introuvable" }} />
        <StatusMessage status="error" message="Cet article est introuvable." />
      </View>
    );
  if (state.status === "error")
    return <StatusMessage status="error" message={state.message} />;
  return <ProductDetails product={state.product} />;
}

function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: product.title }} />
      <Image source={{ uri: product.image }} style={styles.image} contentFit="contain" transition={180} />
      <View style={styles.body}>
        <Text style={styles.category}>{CATEGORY_LABELS[product.category]}</Text>
        <Text style={styles.title}>{product.title}</Text>
        {product.brand && <Text style={styles.brand}>{product.brand}</Text>}
        <Text style={styles.price}>{product.price} €</Text>
        {!product.inStock && <Text style={styles.unavailable}>Rupture de stock</Text>}
        <Text style={styles.description}>{product.description}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ajouter ${product.title} au panier`}
          disabled={!product.inStock}
          onPress={() => addToCart(product.id)}
          style={({ pressed }) => [styles.button, pressed && styles.pressed, !product.inStock && styles.disabled]}
        >
          <Text style={styles.buttonText}>Ajouter au panier</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", maxWidth: 800, alignSelf: "center" },
  image: { width: "100%", aspectRatio: 1, backgroundColor: colors.surfaceMuted },
  body: { padding: 18, gap: 8 },
  category: { color: colors.textMuted, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase" },
  title: { color: colors.text, fontSize: 26, fontWeight: "800" },
  brand: { color: colors.textSecondary, fontSize: 15 },
  price: { color: colors.text, fontSize: 20, fontWeight: "700" },
  unavailable: { color: colors.danger, fontSize: 14 },
  description: { color: colors.textBody, fontSize: 15, lineHeight: 22, marginTop: 6 },
  button: { marginTop: 14, backgroundColor: colors.primary, borderRadius: 24, paddingVertical: 14, alignItems: "center" },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.4 },
  buttonText: { color: colors.onPrimary, fontSize: 14, fontWeight: "600" },
});
