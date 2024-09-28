import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from "@react-navigation/stack";

import { COLOR } from "@/enum/color";
import Navigation from "@/navigation";
import LoginScreen from "@/screen/home/screens/login";

export type AppStackParamList = {
  homeStack: undefined;
  login: undefined;
  signup: undefined;
};

export type AppStackNavigationProps<T extends keyof AppStackParamList = keyof AppStackParamList> = StackNavigationProp<
  AppStackParamList,
  T
>;

export type AppStackScreenProps<T extends keyof AppStackParamList = keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>;

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: [],
        headerTitleAlign: "center",
        headerTitleStyle: [],
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="homeStack"
        component={Navigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: "Login",
          headerStyle: {
            backgroundColor: COLOR.orange,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
