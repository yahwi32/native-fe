import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  containerTabBar,
  containerTabBarItem,
  headerTitleStyle,
  tabBarStyle,
  wrapperTabBarItem,
} from "./tabitem.style";
import { IconListType } from "./tabitem.type";

import SvgHome from "@/assets/svg/SvgHome";
import SvgSetting from "@/assets/svg/SvgSetting";
import { COLOR } from "@/enum/color";

const IconList: IconListType = {
  home: SvgHome,
  settings: SvgSetting,
};
export const TabBarItem = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const inset = useSafeAreaInsets();

  return (
    <View style={[containerTabBar.default]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const Icon = IconList[label as keyof IconListType];

        if (!Icon) {
          console.error(`No icon found for route: ${label}`);
          return null; // Early return if the icon is undefined
        }

        let labelTranslation = "";
        const isFocused = state.index === index;
        switch (label) {
          case "home":
            labelTranslation = "Home";
            break;
          default:
            labelTranslation = "Setting";
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[wrapperTabBarItem.default, tabBarStyle({ paddingBottom: inset.bottom }).default]}
          >
            <View style={[containerTabBarItem.default, isFocused && containerTabBarItem.active]}>
              <Icon fill={isFocused ? COLOR.primary : COLOR.subText} width={30} height={30} />
              <Text style={[headerTitleStyle.default, isFocused && headerTitleStyle.active]}>{labelTranslation}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
