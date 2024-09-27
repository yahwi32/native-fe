import { StyleSheet } from "react-native";

import { COLOR } from "@/enum/color";

type tabBarStyleProps = {
  paddingBottom: number;
};

export const containerTabBar = StyleSheet.create({
  default: {
    flexDirection: "row",
    borderTopWidth: 1,
    display: "flex",
    borderColor: COLOR.subText,
    backgroundColor: COLOR.backgroundDark,
  },
});

export const tabBarStyle = ({ paddingBottom }: tabBarStyleProps) =>
  StyleSheet.create({
    default: {
      paddingBottom: paddingBottom ? paddingBottom : 12,
      flex: 1,
    },
  });

export const wrapperTabBarItem = StyleSheet.create({
  default: {
    flex: 1,
  },
});
export const containerTabBarItem = StyleSheet.create({
  default: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    height: 80,
    elevation: 0,
    paddingTop: 12,
    borderColor: COLOR.subText,
  },
  active: {
    borderColor: COLOR.primary,
  },
});

export const headerTitleStyle = StyleSheet.create({
  default: {
    fontFamily: "SpaceGrotesk",
    lineHeight: 26,
    marginTop: 2,
    fontSize: 16,
    color: COLOR.subText,
  },
  active: {
    color: COLOR.primary,
  },
});
