import { StyleSheet } from "react-native";

import { COLOR } from "@/enum/color";

export const LoadingModalStyle = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: COLOR.backgroundDarkOverlay,
    justifyContent: "center",
    alignItems: "center",
  },
});
