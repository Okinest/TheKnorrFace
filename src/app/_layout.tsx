import { Stack } from "expo-router";
import { View } from "react-native";

import { colors } from "@/constants/theme";

import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { useAuth } from "@/hooks/use-auth";
import { StatusMessage } from "@/components/status-message";

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

  if (initializing)
    return (
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: colors.background }}>
        <StatusMessage status="loading" message="Chargement…" />
      </View>
    )

  return (
    <Stack
      screenOptions={{
        headerTransparent: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Protected guard={user !== null}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Catalogue" }} />
        <Stack.Screen name="products/[id]" />
        <Stack.Screen name="products/new" options={{ title: "Nouvel article" }} />
        <Stack.Screen name="products/edit/[id]" options={{ title: "Modifier l’article" }} />
      </Stack.Protected>
      <Stack.Protected guard={user === null}>
        <Stack.Screen name="(auth)/sign-in" options={{ title: "Connexion" }} />
        <Stack.Screen name="(auth)/sign-up" options={{ title: "Inscription" }} />
      </Stack.Protected>
    </Stack>
  )
}
