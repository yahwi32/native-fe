import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, View } from "react-native";

import { AppStackNavigationProps } from "@/navigation/stack";
import { useCurrentUser } from "@/store/app";

const HomeScreen = () => {
  const navigation = useNavigation<AppStackNavigationProps>();
  const currentUser = useCurrentUser();
  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("auth");
      return;
    }
  }, [currentUser, navigation]);
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
