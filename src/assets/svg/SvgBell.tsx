import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

import { SvgProps } from "./svg.type";

export default function SvgBell({ style, width = 24, height = 24, ...props }: SvgProps) {
  return (
    <View style={[styles.container, style]}>
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="#000000">
        <Path
          d="M12 22c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10 3.17 10 4v.68C7.14 5.36 5.5 7.92 5.5 11v5l-1.29 1.29c-.63.63-.18 1.71.71 1.71h12.17c.89 0 1.34-1.08.7-1.71L18 16z"
          fill="white"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
