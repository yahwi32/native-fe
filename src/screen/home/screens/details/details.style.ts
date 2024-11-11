import { StyleSheet } from "react-native";

import { COLOR } from "@/enum/color";

export const DetailsStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: COLOR.backgroundDark,
  },
  content: {
    marginTop: 16,
    gap: 8,
  },
});
