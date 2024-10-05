import { StyleSheet } from "react-native";

import { COLOR } from "@/enum/color";

export const SettingStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 24,
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
  btnSave: {
    backgroundColor: COLOR.orange,
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: COLOR.text,
  },
  textOrange: {
    color: COLOR.orange,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: COLOR.subText,
    marginVertical: 40,
  },
  device: {
    marginTop: 12,
    paddingVertical: 10,
    color: COLOR.text,
  },
  delete: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnDelete: {
    padding: 12,
    borderRadius: 100,
  },
  inputDisable: {
    color: COLOR.subText,
  },
  fieldContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
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
  logout: {
    paddingBottom: 24,
  },
  textBtn: {
    textAlign: "center",
    color: "white",
    fontWeight: 600,
  },
});
