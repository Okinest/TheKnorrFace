import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Array.isArray(id) ? id[0] : id;

  return (
    <View style={styles.box}>
      <Stack.Screen options={{ title: "Article" }} />
      <Text style={styles.text}>Article {productId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F8F7F4" },
  text: { color: "#25231F", fontSize: 18 },
});
