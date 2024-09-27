import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from "@react-navigation/stack";

import { COLOR } from "@/enum/color";
import Navigation from "@/navigation";
import AuthScreen from "@/screen/home/screens/auth";

export type AppStackParamList = {
  homeStack: undefined;
  auth: undefined;
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
        name="auth"
        component={AuthScreen}
        options={{
          title: "Login",
          headerStyle: {
            backgroundColor: COLOR.orange,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // headerLeft: () => <></>,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
