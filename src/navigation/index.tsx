import { BottomTabNavigationProp, BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TabBarItem } from "./components/tabItem";

import { COLOR } from "@/enum/color";
import HomeScreen from "@/screen/home";
import SettingScreen from "@/screen/setting";

export type RootBottomTabParamList = {
  home: undefined;
  settings: undefined;
};

export type BottomTabNavigationProps<T extends keyof RootBottomTabParamList = keyof RootBottomTabParamList> =
  BottomTabNavigationProp<RootBottomTabParamList, T>;

export type AppBottomTabScreenProps<T extends keyof RootBottomTabParamList = keyof RootBottomTabParamList> =
  BottomTabScreenProps<RootBottomTabParamList, T>;

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const Navigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBarItem {...props} />}
      sceneContainerStyle={{ backgroundColor: COLOR.backgroundDark }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: COLOR.orange,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingScreen}
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: COLOR.orange,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
