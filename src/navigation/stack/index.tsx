import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from "@react-navigation/stack";

import Navigation from "@/navigation";
import AuthScreen from "@/screen/auth";

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
        options={{
          headerShown: false,
        }}
      >
        {() => {
          return <Navigation />;
        }}
      </Stack.Screen>
      <Stack.Screen name="auth" component={AuthScreen} options={{ headerLeft: () => <></> }} />
    </Stack.Navigator>
  );
};

export default AppStack;
