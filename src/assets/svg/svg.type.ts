import { StyleProp, ViewStyle } from "react-native";
import { PathProps } from "react-native-svg";

export type SvgProps = PathProps & {
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
};
