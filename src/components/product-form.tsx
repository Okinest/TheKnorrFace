import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { Button } from "@/components/button";
import { Chip } from "@/components/chip";
import { colors, radius } from "@/constants/theme";
import {
  CATEGORY_LABELS,
  PRODUCT_LIMITS,
  validateProductInput,
  type ProductCategory,
  type ProductInput,
} from "@/models/product";

type Props = {
  initial?: ProductInput;
  submitLabel: string;
  onSubmit: (input: ProductInput) => Promise<void>;
};

const EMPTY: ProductInput = {
  title: "",
  description: "",
  price: 0,
  category: "women",
  brand: "",
  image: "",
  inStock: true,
};

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[];

export function ProductForm({ initial = EMPTY, submitLabel, onSubmit }: Props) {
  const [title, setTitle] = useState(initial.title);
  const [brand, setBrand] = useState(initial.brand);
  const [price, setPrice] = useState(initial.price > 0 ? String(initial.price) : "");
  const [category, setCategory] = useState<ProductCategory>(initial.category);
  const [image, setImage] = useState(initial.image);
  const [description, setDescription] = useState(initial.description);
  const [inStock, setInStock] = useState(initial.inStock);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async () => {
    const input: ProductInput = {
      title,
      brand,
      price: Number(price.replace(",", ".")),
      category,
      image: image.trim(),
      description,
      inStock,
    };
    const invalid = validateProductInput(input);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError("");
    setSending(true);
    try {
      await onSubmit(input);
    } catch {
      setError("L’enregistrement a échoué. Vérifiez votre connexion et réessayez.");
    } finally {
      setSending(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Field label="Nom">
        <TextInput value={title} onChangeText={setTitle} maxLength={PRODUCT_LIMITS.title} placeholder="Veste en lin" placeholderTextColor={colors.placeholder} style={styles.input} />
      </Field>
      <Field label="Marque (facultatif)">
        <TextInput value={brand} onChangeText={setBrand} maxLength={PRODUCT_LIMITS.brand} placeholder="The Knorr Face" placeholderTextColor={colors.placeholder} style={styles.input} />
      </Field>
      <Field label="Prix (€)">
        <TextInput value={price} onChangeText={setPrice} keyboardType="decimal-pad" placeholder="49.90" placeholderTextColor={colors.placeholder} style={styles.input} />
      </Field>
      <Field label="Catégorie">
        <View style={styles.chips}>
          {CATEGORIES.map((value) => (
            <Chip key={value} label={CATEGORY_LABELS[value]} selected={value === category} onPress={() => setCategory(value)} />
          ))}
        </View>
      </Field>
      <Field label="Image (URL)">
        <TextInput value={image} onChangeText={setImage} maxLength={PRODUCT_LIMITS.image} autoCapitalize="none" keyboardType="url" placeholder="https://…" placeholderTextColor={colors.placeholder} style={styles.input} />
      </Field>
      <Field label="Description">
        <TextInput value={description} onChangeText={setDescription} maxLength={PRODUCT_LIMITS.description} multiline placeholder="Matière, coupe, entretien…" placeholderTextColor={colors.placeholder} style={[styles.input, styles.multiline]} />
      </Field>
      <View style={styles.switchRow}>
        <Text style={styles.label}>En stock</Text>
        <Switch
          accessibilityLabel="En stock"
          value={inStock}
          onValueChange={setInStock}
          trackColor={{ true: colors.primary, false: colors.borderStrong }}
        />
      </View>
      {error !== "" && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
      <View style={styles.submit}>
        <Button label={submitLabel} loading={sending} onPress={submit} />
      </View>
    </ScrollView>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", maxWidth: 600, alignSelf: "center", padding: 16, gap: 16, paddingBottom: 32 },
  field: { gap: 6 },
  label: { color: colors.text, fontSize: 14, fontWeight: "600" },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  multiline: { minHeight: 120, paddingTop: 12, textAlignVertical: "top" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", minHeight: 48 },
  error: { color: colors.danger, fontSize: 14 },
  submit: { marginTop: 8 },
});
