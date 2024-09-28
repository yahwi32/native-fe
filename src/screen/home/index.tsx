import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { HomeStyle } from "./home.style";

import SvgHeart from "@/assets/svg/SvgHeart";
import Chart from "@/components/chart";
import { COLOR } from "@/enum/color";
import { AppStackNavigationProps } from "@/navigation/stack";
import { useCurrentUser } from "@/store/app";

const HomeScreen = () => {
  const navigation = useNavigation<AppStackNavigationProps>();
  const currentUser = useCurrentUser();

  const handlePress = () => {
    navigation.navigate("measure");
  };

  console.log("currentUser", currentUser);
  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("login");
    }
  }, [currentUser, navigation]);

  return (
    <View style={HomeStyle.wrapper}>
      <ScrollView style={{ flex: 1 }}>
        <View style={HomeStyle.containerBtn}>
          <TouchableOpacity onPress={handlePress} style={HomeStyle.btn}>
            <SvgHeart fill={COLOR.orange} width={24} />
            <Text style={HomeStyle.text}>Measure your heart now</Text>
          </TouchableOpacity>
        </View>
        <Chart />
        <Chart />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
