import { Stack } from "expo-router";

import { AuthProvider } from "@/context/auth-context"
import { CartProvider } from "@/context/cart-context";
import { useAuth } from "@/hooks/use-auth";
import { StatusMessage } from "@/components/status-message";

// Un article ouvert directement par son URL est posé sur les onglets :
// sa flèche de retour y mène.
export const unstable_settings = { anchor: "(tabs)" };

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <RootStack />
      </CartProvider>
    </AuthProvider>
  );
}

function RootStack() { 
  const { user, initializing } = useAuth()

  if (initializing) return <StatusMessage status="loading" message="Chargement…" />

  return (
    <Stack screenOptions={{ headerTransparent: false }}>
      <Stack.Protected guard={user !== null}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Catalogue" }} />
        <Stack.Screen name="products/[id]" />
      </Stack.Protected>
      <Stack.Protected guard={user === null}>
        <Stack.Screen name="(auth)/sign-in" options={{ title: "Connexion" }} />
        <Stack.Screen name="(auth)/sign-up" options={{ title: "Inscription" }} />
      </Stack.Protected>
    </Stack>
  )
}
