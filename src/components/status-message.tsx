import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/theme";

type Props =
  | { status: "loading"; message?: string }
  | { status: "error"; message: string; onRetry?: () => void };

export function StatusMessage(props: Props) {
  if (props.status === "loading") {
    return (
      <View style={styles.box}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.text}>{props.message ?? "Chargement du catalogue…"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.box}>
      <Text style={styles.text}>{props.message}</Text>
      {props.onRetry && (
        <Pressable
          accessibilityRole="button"
          onPress={props.onRetry}
          style={({ pressed }) => [styles.retryButton, pressed && styles.pressed]}
        >
          <Text style={styles.retryText}>Réessayer</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: "center", gap: 12, paddingVertical: 36 },
  text: { color: colors.textSecondary, fontSize: 14, textAlign: "center" },
  retryButton: { backgroundColor: colors.primary, borderRadius: 20, paddingHorizontal: 18, paddingVertical: 10 },
  pressed: { opacity: 0.7 },
  retryText: { color: colors.onPrimary, fontSize: 12, fontWeight: "600" },
});
