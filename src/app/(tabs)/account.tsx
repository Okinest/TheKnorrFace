import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { colors } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/services/auth-service";

export default function AccountScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.screen}>
        <Text style={styles.heading}>Compte</Text>
        <View style={styles.identity}>
          <Text style={styles.label}>Connecté en tant que</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <View style={styles.actions}>
          <Button variant="danger" label="Se déconnecter" onPress={signOut} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  screen: { width: "100%", maxWidth: 800, alignSelf: "center", paddingHorizontal: 16 },
  heading: { color: colors.text, fontSize: 28, fontWeight: "700", marginTop: 16, marginBottom: 24 },
  identity: { gap: 4 },
  label: { color: colors.textSecondary, fontSize: 14 },
  email: { color: colors.text, fontSize: 17, fontWeight: "600" },
  actions: { marginTop: 32, alignItems: "flex-start" },
});
