import { StyleSheet, Text, View } from "react-native";

import { AuthForm } from "@/components/auth-form";
import { colors } from "@/constants/theme";
import { signUp } from "@/services/auth-service";

export default function SignUpScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.screen}>
        <Text style={styles.brand}>The Knorr Face</Text>
        <AuthForm submitLabel="Créer mon compte" isSignUp onSubmit={signUp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: colors.background },
  screen: { width: "100%", maxWidth: 420, alignSelf: "center", padding: 24, gap: 24 },
  brand: { color: colors.text, fontSize: 28, fontWeight: "800" },
});
