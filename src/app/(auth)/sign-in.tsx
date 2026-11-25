import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AuthForm } from "@/components/auth-form";
import { colors } from "@/constants/theme";
import { signIn } from "@/services/auth-service";

export default function SignInScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.screen}>
        <Text style={styles.brand}>THE KNORR FACE</Text>
        <Text style={styles.title}>Connexion</Text>
        <AuthForm submitLabel="Se connecter" onSubmit={signIn} />
        <Link href="/sign-up" style={styles.link}>
          Pas encore de compte ? Créer un compte
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: colors.background },
  screen: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    padding: 24,
    gap: 16,
  },
  brand: { color: colors.text, fontSize: 14, letterSpacing: 2, fontWeight: "800" },
  title: { color: colors.text, fontSize: 26, fontWeight: "700" },
  link: { color: colors.text, fontSize: 14, fontWeight: "600", textAlign: "center", marginTop: 4 },
});
