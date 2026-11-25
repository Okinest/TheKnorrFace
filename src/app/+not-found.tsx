import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

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
  box: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: "#F8F7F4" },
  text: { color: "#25231F", fontSize: 18 },
  link: { color: "#25231F", fontSize: 16, fontWeight: "600" },
});
