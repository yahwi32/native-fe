import { StyleSheet } from "react-native";

import { COLOR } from "@/enum/color";

export const AuthScreenStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.backgroundDark,
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
    color: COLOR.text,
    fontSize: 32,
    lineHeight: 36,
    textAlign: "center",
  },
  bottomContainer: {
    minHeight: 450,
    paddingHorizontal: 24,
  },
  bottomContent: {
    flex: 1,
    paddingVertical: 32,
    backgroundColor: COLOR.backgroundGray,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    gap: 32,
    overflow: "hidden",
    paddingHorizontal: 24,
  },
  btn: {
    width: "auto",
    marginTop: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 44,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: COLOR.primary,
    borderColor: COLOR.primary,
  },
  btnText: {
    color: COLOR.text,
    textAlign: "center",
    fontSize: 18,
  },
});
