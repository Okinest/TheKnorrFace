import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AuthForm } from "@/components/auth-form";
import { colors } from "@/constants/theme";
import { signIn } from "@/services/auth-service";

export default function SignInScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.screen}>
        <Text style={styles.brand}>The Knorr Face</Text>
        <AuthForm submitLabel="Se connecter" onSubmit={signIn} />
        <Text style={styles.switch}>
          Pas encore de compte ?{" "}
          <Link href="/sign-up" style={styles.link}>Créer un compte</Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: colors.background },
  screen: { width: "100%", maxWidth: 420, alignSelf: "center", padding: 24, gap: 24 },
  brand: { color: colors.text, fontSize: 28, fontWeight: "800" },
  switch: { color: colors.textSecondary, fontSize: 15, textAlign: "center" },
  link: { color: colors.text, fontWeight: "600", textDecorationLine: "underline" },
});
