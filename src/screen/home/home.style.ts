import { StyleSheet } from "react-native";

import { COLOR } from "@/enum/color";

export const HomeStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 24,
  },
  containerBtn: {
    paddingHorizontal: 24,
  },
  btn: {
    backgroundColor: COLOR.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: 600,
  },
});
