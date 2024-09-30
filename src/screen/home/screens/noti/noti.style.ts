import { StyleSheet } from "react-native";

import { COLOR } from "@/enum/color";

export const NotiStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.backgroundDark,
    paddingTop: 24,
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 500,
    color: COLOR.text,
  },
  textPrimary: {
    color: COLOR.heart,
  },
  information: {
    marginTop: 100,
    paddingHorizontal: 24,
    gap: 10,
  },
  fieldContainer: {
    flexDirection: "row",
    gap: 10,
  },
  label: {
    fontSize: 14,
    color: COLOR.subText,
  },
  value: {
    fontSize: 14,
    fontWeight: 700,
    color: COLOR.text,
  },
});
