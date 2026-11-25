import { Tabs } from "expo-router/js-tabs";
import { SymbolView } from "expo-symbols";

import { colors } from "@/constants/theme";

const ACTIVE = colors.text;
const INACTIVE = colors.textMuted;

export default function TabsLayout() {
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
        name="account"
        options={{
          title: "Compte",
          tabBarIcon: ({ focused, size }) => (
            <SymbolView name="person" tintColor={focused ? ACTIVE : INACTIVE} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
