import React from "react";
import { SvgProps } from "react-native-svg";

export type IconListType = {
  [key: string]: React.FC<SvgProps>;
};
