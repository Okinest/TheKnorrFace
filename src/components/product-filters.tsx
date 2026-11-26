import { ScrollView, StyleSheet, TextInput, View } from "react-native";

import { Chip } from "@/components/chip";
import { colors, radius } from "@/constants/theme";
import { CATEGORY_LABELS, type ProductCategory } from "@/models/product";

const CATEGORIES: { label: string; value: ProductCategory | null }[] = [
  { label: "Tout", value: null },
  ...(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((value) => ({ label: CATEGORY_LABELS[value], value })),
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
        accessibilityLabel="Rechercher un article"
        placeholder="Rechercher un article"
        placeholderTextColor={colors.placeholder}
        value={query}
        onChangeText={onQueryChange}
        returnKeyType="search"
        clearButtonMode="while-editing"
        style={styles.search}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
        {CATEGORIES.map((item) => (
          <Chip
            key={item.label}
            label={item.label}
            selected={item.value === category}
            onPress={() => onCategoryChange(item.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
  },
  categories: { gap: 8, paddingVertical: 16 },
});
