import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/theme";
import { Button } from "@/components/button";
import { CartErrorBanner } from "@/components/cart-error-banner";
import { DeleteProductButton } from "@/components/delete-product-button";
import { StatusMessage } from "@/components/status-message";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useProduct } from "@/hooks/use-product";
import { CATEGORY_LABELS, formatPrice, type Product } from "@/models/product";

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
  const { user } = useAuth();
  const router = useRouter();
  const isOwner = product.ownerId !== undefined && product.ownerId === user?.uid;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Le titre est déjà affiché dans la page : on garde un en-tête neutre */}
      <Stack.Screen options={{ title: "" }} />
      <Image source={{ uri: product.image }} style={styles.image} contentFit="contain" transition={180} />
      <View style={styles.body}>
        <Text style={styles.category}>
          {CATEGORY_LABELS[product.category]}
          {product.brand ? ` · ${product.brand}` : ""}
        </Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        {!product.inStock && <Text style={styles.unavailable}>Épuisé</Text>}
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.cta}>
          <Button
            label={product.inStock ? "Ajouter au panier" : "Indisponible"}
            accessibilityLabel={`Ajouter ${product.title} au panier`}
            disabled={!product.inStock}
            onPress={() => addToCart(product.id)}
          />
        </View>
        <CartErrorBanner />
        {isOwner && (
          <View style={styles.ownerActions}>
            <Link href={{ pathname: "/products/edit/[id]", params: { id: product.id } }} asChild>
              <Button size="sm" variant="secondary" label="Modifier" />
            </Link>
            <DeleteProductButton productId={product.id} onDeleted={() => router.back()} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", maxWidth: 800, alignSelf: "center", paddingBottom: 32 },
  image: { width: "100%", aspectRatio: 1, backgroundColor: colors.surfaceMuted },
  body: { padding: 16, gap: 8 },
  category: { color: colors.textSecondary, fontSize: 14 },
  title: { color: colors.text, fontSize: 28, fontWeight: "700" },
  price: { color: colors.text, fontSize: 20, fontWeight: "700", fontVariant: ["tabular-nums"] },
  unavailable: { color: colors.danger, fontSize: 15, fontWeight: "600" },
  description: { color: colors.textBody, fontSize: 16, lineHeight: 24, marginTop: 8 },
  cta: { marginTop: 16 },
  ownerActions: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
});
