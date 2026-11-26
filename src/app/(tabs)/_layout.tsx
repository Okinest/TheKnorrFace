import { Tabs } from "expo-router/js-tabs";
import { SymbolView } from "expo-symbols";

import { colors } from "@/constants/theme";
import { useCart } from "@/hooks/use-cart";

const ACTIVE = colors.text;
const INACTIVE = colors.textMuted;

export default function TabsLayout() {
  const { count } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Catalogue",
          tabBarIcon: ({ focused, size }) => (
            <SymbolView
              name={{ ios: "tshirt", android: "apparel", web: "apparel" }}
              tintColor={focused ? ACTIVE : INACTIVE}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Panier",
          tabBarBadge: count > 0 ? count : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.primary, color: colors.onPrimary },
          tabBarAccessibilityLabel: `Panier, ${count} article${count > 1 ? "s" : ""}`,
          tabBarIcon: ({ focused, size }) => (
            <SymbolView
              name={{ ios: "bag", android: "shopping_bag", web: "shopping_bag" }}
              tintColor={focused ? ACTIVE : INACTIVE}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-products"
        options={{
          title: "Mes articles",
          tabBarIcon: ({ focused, size }) => (
            <SymbolView
              name={{ ios: "square.and.pencil", android: "edit", web: "edit" }}
              tintColor={focused ? ACTIVE : INACTIVE}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Compte",
          tabBarIcon: ({ focused, size }) => (
            <SymbolView
              name={{ ios: "person", android: "person", web: "person" }}
              tintColor={focused ? ACTIVE : INACTIVE}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
