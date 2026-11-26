import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps } from "react-native";

import { colors, pressedOpacity, radius } from "@/constants/theme";

type Variant = "primary" | "secondary" | "danger" | "danger-solid";

type Props = Omit<PressableProps, "children" | "style"> & {
  label: string;
  variant?: Variant;
  size?: "md" | "sm";
  loading?: boolean;
};

// Bouton unique de l'app : mêmes rayons, hauteurs et états partout.
// Transmet les props reçues au Pressable, donc compatible avec <Link asChild>.
export function Button({ label, variant = "primary", size = "md", loading = false, disabled, ...rest }: Props) {
  const solid = variant === "primary" || variant === "danger-solid";
  const textColor = solid ? colors.onPrimary : variant === "danger" ? colors.danger : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: loading }}
      disabled={disabled || loading}
      hitSlop={size === "sm" ? 4 : undefined}
      {...rest}
      style={({ pressed }) => [
        styles.base,
        size === "sm" ? styles.sm : styles.md,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.label, size === "sm" && styles.labelSm, { color: textColor }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.pill, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  md: { minHeight: 48, paddingHorizontal: 20 },
  sm: { minHeight: 40, paddingHorizontal: 14 },
  primary: { backgroundColor: colors.primary, borderColor: colors.primary },
  secondary: { backgroundColor: "transparent", borderColor: colors.borderStrong },
  danger: { backgroundColor: "transparent", borderColor: colors.danger },
  "danger-solid": { backgroundColor: colors.danger, borderColor: colors.danger },
  pressed: { opacity: pressedOpacity },
  disabled: { opacity: 0.4 },
  label: { fontSize: 15, fontWeight: "600" },
  labelSm: { fontSize: 14 },
});
