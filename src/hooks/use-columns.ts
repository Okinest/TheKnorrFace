import { useWindowDimensions } from "react-native";

export function useColumns() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return { columns: isWide ? 4 : width >= 600 ? 3 : 2, isWide };
}
