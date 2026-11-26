import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Button } from "@/components/button";
import { colors, radius } from "@/constants/theme";
import { authErrorMessage } from "@/services/auth-service";

type AuthFormProps = {
  submitLabel: string;
  isSignUp?: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function AuthForm({ submitLabel, isSignUp = false, onSubmit }: AuthFormProps) {
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
      <View style={styles.field}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          accessibilityLabel="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          style={styles.input}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Mot de passe"
          secureTextEntry
          autoComplete={isSignUp ? "new-password" : "current-password"}
          textContentType={isSignUp ? "newPassword" : "password"}
          returnKeyType="go"
          onSubmitEditing={submit}
          style={styles.input}
        />
      </View>
      {error !== "" && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
      <View style={styles.submit}>
        <Button label={submitLabel} loading={sending} onPress={submit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16 },
  field: { gap: 6 },
  label: { color: colors.text, fontSize: 14, fontWeight: "600" },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  error: { color: colors.danger, fontSize: 14 },
  submit: { marginTop: 8 },
});
