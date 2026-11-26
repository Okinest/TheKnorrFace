import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius } from "@/constants/theme";
import { useCart } from "@/hooks/use-cart";

// Affiche l'échec d'une écriture du panier (ajout, retrait, suppression)
export function CartErrorBanner() {
  const { writeError, dismissWriteError } = useCart();
  if (writeError === null) return null;

  return (
    <View accessibilityRole="alert" style={styles.banner}>
      <Text style={styles.text}>{writeError}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Fermer le message" onPress={dismissWriteError} hitSlop={12}>
        <Text style={styles.close}>OK</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.surface,
  },
  text: { flex: 1, color: colors.danger, fontSize: 14 },
  close: { color: colors.danger, fontSize: 14, fontWeight: "700" },
});
