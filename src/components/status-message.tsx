import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/button";
import { colors } from "@/constants/theme";

type Props =
  | { status: "loading"; message?: string }
  | { status: "error"; message: string; onRetry?: () => void };

export function StatusMessage(props: Props) {
  if (props.status === "loading") {
    return (
      <View style={styles.box}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.text}>{props.message ?? "Chargement…"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.box} accessibilityRole="alert">
      <Text style={styles.text}>{props.message}</Text>
      {props.onRetry && <Button size="sm" variant="secondary" label="Réessayer" onPress={props.onRetry} />}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: "center", gap: 16, paddingVertical: 40, paddingHorizontal: 16 },
  text: { color: colors.textSecondary, fontSize: 15, textAlign: "center" },
});
