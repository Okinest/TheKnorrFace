import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/button";
import { colors } from "@/constants/theme";
import { useCatalogActions } from "@/hooks/use-catalog";

type Props = { productId: string; onDeleted?: () => void };

// Suppression en deux appuis (Alert.alert ne fonctionne pas sur le web).
export function DeleteProductButton({ productId, onDeleted }: Props) {
  const { remove } = useCatalogActions();
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const confirm = async () => {
    setError("");
    setSending(true);
    try {
      await remove(productId);
      onDeleted?.();
    } catch {
      setError("La suppression a échoué. Réessayez.");
      setSending(false);
      setConfirming(false);
    }
  };

  return (
    <View style={styles.wrap}>
      {confirming ? (
        <View style={styles.row}>
          <Button size="sm" variant="danger-solid" label="Confirmer" loading={sending} onPress={confirm} />
          <Button size="sm" variant="secondary" label="Annuler" disabled={sending} onPress={() => setConfirming(false)} />
        </View>
      ) : (
        <Button size="sm" variant="danger" label="Supprimer" onPress={() => setConfirming(true)} />
      )}
      {error !== "" && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 4 },
  row: { flexDirection: "row", gap: 8 },
  error: { color: colors.danger, fontSize: 13 },
});
