import { StyleSheet } from "react-native";

import { COLOR } from "@/enum/color";

export const AuthScreenStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  container: {
    backgroundColor: COLOR.backgroundFill,
    flex: 1,
    justifyContent: "space-between",
  },
  titleContainer: {
    marginTop: 48,
  },
  textContent: {
    color: COLOR.textBlue,
    fontSize: 32,
    lineHeight: 36,
    textAlign: "center",
  },
  bottomContainer: {
    minHeight: 350,
    paddingHorizontal: 24,
  },
  bottomContent: {
    flex: 1,
    backgroundColor: COLOR.backgroundGray,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    overflow: "hidden",
    paddingHorizontal: 24,
  },
  btn: {
    width: "auto",
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLOR.primary,
  },
  btnText: {
    color: COLOR.primary,
    fontSize: 18,
  },
});
