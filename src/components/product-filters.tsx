import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import type { ProductCategory } from "@/models/product";

const CATEGORIES: { label: string; value: ProductCategory | null }[] = [
  { label: "Tout", value: null },
  { label: "Homme", value: "men" },
  { label: "Femme", value: "women" },
  { label: "Enfant", value: "kids" },
  { label: "Accessoires", value: "accessories" },
];

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  category: ProductCategory | null;
  onCategoryChange: (value: ProductCategory | null) => void;
};

export function ProductFilters({ query, onQueryChange, category, onCategoryChange }: Props) {
  return (
    <View>
      <TextInput
        accessibilityLabel="Rechercher un vêtement"
        placeholder="Rechercher un vêtement…"
        placeholderTextColor="#89847B"
        value={query}
        onChangeText={onQueryChange}
        returnKeyType="search"
        style={styles.search}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
        {CATEGORIES.map((item) => {
          const selected = item.value === category;
          return (
            <Pressable key={item.label} accessibilityRole="button" accessibilityState={{ selected }} onPress={() => onCategoryChange(item.value)} style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  search: { height: 48, backgroundColor: "#FFFFFF", borderRadius: 12, borderWidth: 1, borderColor: "#E7E3DC", paddingHorizontal: 15, fontSize: 14, color: "#25231F" },
  categories: { gap: 9, paddingVertical: 14 },
  chip: { borderWidth: 1, borderColor: "#DEDAD2", borderRadius: 24, paddingHorizontal: 15, paddingVertical: 9 },
  chipSelected: { backgroundColor: "#292720", borderColor: "#292720" },
  chipText: { color: "#514D45", fontSize: 12 },
  chipTextSelected: { color: "#FFFFFF", fontWeight: "600" },
});
