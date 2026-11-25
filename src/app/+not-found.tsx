import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/theme";

export default function NotFoundScreen() {
  return (
    <View style={styles.box}>
      <Stack.Screen options={{ title: "Page introuvable" }} />
      <Text style={styles.text}>Cette page est introuvable.</Text>
      <Link href="/" style={styles.link}>
        Retour au catalogue
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: colors.background },
  text: { color: colors.text, fontSize: 18 },
  link: { color: colors.text, fontSize: 16, fontWeight: "600" },
});
