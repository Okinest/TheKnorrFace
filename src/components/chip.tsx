import { Pressable, StyleSheet, Text } from "react-native";

import { colors, pressedOpacity, radius } from "@/constants/theme";

type Props = { label: string; selected: boolean; onPress: () => void };

// Puce de sélection partagée par les filtres du catalogue et le formulaire d'article
export function Chip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 40,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  pressed: { opacity: pressedOpacity },
  text: { color: colors.text, fontSize: 14 },
  textSelected: { color: colors.onPrimary, fontWeight: "600" },
});
