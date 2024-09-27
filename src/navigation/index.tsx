import { BottomTabNavigationProp, BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TabBarItem } from "./components/tabItem";

import HomeScreen from "@/screen/home";

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
      sceneContainerStyle={{ backgroundColor: "red" }}
      screenOptions={({ route }) => ({})}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="settings" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default Navigation;
