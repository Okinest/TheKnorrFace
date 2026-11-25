import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "@/constants/theme";
import { authErrorMessage } from "@/services/auth-service";

type AuthFormProps = {
  submitLabel: string;
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function AuthForm({ submitLabel, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async () => {
    setError("");
    setSending(true);
    try {
      await onSubmit(email.trim(), password);
    } catch (e) {
      setError(authErrorMessage(e));
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        placeholderTextColor={colors.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        style={styles.input}
      />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <Pressable
        accessibilityRole="button"
        onPress={submit}
        disabled={sending}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        {sending ? (
          <ActivityIndicator color={colors.onPrimary} />
        ) : (
          <Text style={styles.buttonLabel}>{submitLabel}</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  error: { color: colors.danger, fontSize: 14 },
  button: {
    marginTop: 4,
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  pressed: { opacity: 0.7 },
  buttonLabel: { color: colors.onPrimary, fontWeight: "600", fontSize: 15 },
});
