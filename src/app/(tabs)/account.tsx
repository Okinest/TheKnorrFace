import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/services/auth-service";

export default function AccountScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.screen}>
        <Text style={styles.heading}>Mon compte</Text>
        <Text style={styles.label}>Connecté en tant que</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={signOut}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonLabel}>Se déconnecter</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  screen: { width: "100%", maxWidth: 800, alignSelf: "center", paddingHorizontal: 18, gap: 8 },
  heading: { color: colors.text, fontSize: 24, fontWeight: "700", marginTop: 20, marginBottom: 12 },
  label: { color: colors.textMuted, fontSize: 14 },
  email: { color: colors.text, fontSize: 18, fontWeight: "700" },
  button: {
    marginTop: 16,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  pressed: { opacity: 0.6 },
  buttonLabel: { color: colors.danger, fontSize: 14, fontWeight: "600" },
});
