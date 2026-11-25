import { StyleSheet, Text, View } from "react-native";

import { AuthForm } from "@/components/auth-form";
import { colors } from "@/constants/theme";
import { signUp } from "@/services/auth-service";

export default function SignUpScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.screen}>
        <Text style={styles.brand}>THE KNORR FACE</Text>
        <Text style={styles.title}>Créer un compte</Text>
        <AuthForm submitLabel="S'inscrire" onSubmit={signUp} />
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
});
