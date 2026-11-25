import { Stack } from "expo-router";

import { CartProvider } from "@/context/cart-context";

// Un article ouvert directement par son URL est posé sur les onglets :
// sa flèche de retour y mène.
export const unstable_settings = { anchor: "(tabs)" };

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerTransparent: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Catalogue" }} />
      </Stack>
    </CartProvider>
  );
}
