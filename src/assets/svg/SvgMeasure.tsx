import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

import { SvgProps } from "./svg.type";

export default function SvgMeasure({ style, width = 24, height = 24, ...props }: SvgProps) {
  return (
    <View style={[styles.container, style]}>
      <Svg width={width} height={height} x="0px" y="0px" viewBox="0 0 24 24" fill="none">
        <Path
          {...props}
          d="M512 64C264.6 64 64 264.6 64 512c0 57.3 11.2 111.9 30.8 162.3 4.7 12.2 10 24 15.7 35.6 35.8 72.5 90.4 133.9 157.8 177.7 10.7 6.9 21.6 13.6 33 19.6C364.1 940.8 435.8 960 512 960c76.2 0 147.9-19.2 210.7-52.7 11.4-6 22.3-12.7 33-19.6 67.4-43.8 122-105.2 157.8-177.7 5.7-11.6 11-23.4 15.7-35.6 19.7-50.4 30.8-105 30.8-162.3C960 264.6 759.5 64 512 64M324.2 846.6c-74.5-42-133.7-107.9-166.8-187.4 19.5-11.9 42.1-19.2 66.5-19.2 70.6 0 128 57.4 128 128 0.1 29.7-10.5 56.8-27.7 78.6m375.6 0C682.6 824.9 672 797.7 672 768c0-70.6 57.4-128 128-128 24.5 0 47.1 7.3 66.6 19.2-33.2 79.5-92.3 145.5-166.8 187.4m177.9-217.7C854.6 616 828.4 608 800 608c-88.3 0-160 71.7-160 160 0 35 11.6 67 30.5 93.3C622.2 883.4 568.6 896 512 896c-56.5 0-110.1-12.6-158.5-34.7C372.5 835 384 803 384 768c0-88.3-71.6-160-160-160-28.3 0-54.5 8-77.7 20.9C134.5 592 128 552.8 128 512c0-211.8 172.3-384 384-384 211.8 0 384 172.2 384 384 0 40.8-6.5 80-18.3 116.9"
        />
        <Path
          {...props}
          d="M512 256c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.4 32 32 32M672 234.9c-15.3-8.8-34.9-3.6-43.7 11.7-8.8 15.3-3.6 34.8 11.7 43.8 15.3 8.8 34.9 3.5 43.7-11.8 8.9-15.3 3.6-34.9-11.7-43.7M745.4 340.2c-15.3 8.9-20.6 28.5-11.7 43.8 8.8 15.3 28.4 20.6 43.7 11.7 15.3-8.8 20.6-28.4 11.7-43.7-8.8-15.3-28.3-20.6-43.7-11.8M768 512c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32.1c-17.7 0.1-32 14.4-32 32.1M395.7 246.6c-8.8-15.3-28.4-20.5-43.7-11.7-15.3 8.8-20.5 28.4-11.7 43.7 8.8 15.3 28.4 20.5 43.7 11.8 15.3-9 20.6-28.5 11.7-43.8M278.6 340.2c-15.3-8.8-34.9-3.5-43.7 11.7-8.9 15.4-3.6 34.9 11.7 43.7 15.3 8.9 34.9 3.6 43.7-11.7 8.9-15.2 3.7-34.8-11.7-43.7M224.1 479.9c-17.7 0-32 14.4-32 32 0 17.7 14.3 32 32 32s32-14.3 32-32c0-17.6-14.4-31.9-32-32M518.1 480.6c-52.2-62.1-130.5-123-130.5-123s26.1 95.6 63.4 167.6c-1.8 6-3.1 12.2-3.1 18.7 0 35.4 28.6 64 64 64 12.4 0 23.9-3.6 33.7-9.8 0.6-0.4 1.2-0.5 1.8-1h0.1c17.1-11.5 28.4-31.1 28.4-53.2 0.1-33.2-25.3-60.1-57.8-63.3"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
