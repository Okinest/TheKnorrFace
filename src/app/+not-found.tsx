import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/button";
import { colors } from "@/constants/theme";

export default function NotFoundScreen() {
  return (
    <View style={styles.box}>
      <Stack.Screen options={{ title: "Page introuvable" }} />
      <Text style={styles.text}>Cette page est introuvable.</Text>
      <Link href="/" asChild>
        <Button variant="secondary" label="Retour au catalogue" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16, padding: 16, backgroundColor: colors.background },
  text: { color: colors.text, fontSize: 17 },
});
