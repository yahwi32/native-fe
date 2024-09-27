import { useNavigation } from "@react-navigation/native";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withRepeat } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SvgHeart from "@/assets/svg/SvgHeart";
import { COLOR } from "@/enum/color";
import { db } from "@/firebase";
import { AppStackNavigationProps } from "@/navigation/stack";
import { useCurrentUser } from "@/store/app";

const HomeScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<AppStackNavigationProps>();
  const currentUser = useCurrentUser();
  const [heartRate, setHeartRate] = useState("");

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    navigation.navigate("auth");
  };

  useEffect(() => {
    const dataRef = ref(db, "data/66d948021a49420250e10923");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setHeartRate(data);
    });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("auth");
      return;
    }
  }, [currentUser, navigation]);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.5, { duration: 1000 }), -1, true);
  }, [scale]);

  return (
    <View style={{ flex: 1, paddingTop: 48 }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontSize: 24, lineHeight: 28, fontWeight: 500, color: COLOR.text }}>
          {heartRate ? "Measured heart rate:" : "Measuring heart rate ..."}
        </Text>
        <Text style={{ fontSize: 24, lineHeight: 28, fontWeight: 500, color: COLOR.heart }}> {heartRate} bpm</Text>
      </View>
      <View style={{ marginTop: 100 }}>
        <Animated.View style={animatedStyle}>
          <SvgHeart width={100} height={100} fill={COLOR.heart} />
        </Animated.View>
      </View>
      <View style={{ marginTop: 100, paddingHorizontal: 24, gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ fontSize: 14, color: COLOR.subText }}>Id Device:</Text>
          <Text style={{ fontSize: 14, fontWeight: 700, color: COLOR.text }}>{"66d948021a49420250e10923"}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ fontSize: 14, color: COLOR.subText }}>Username:</Text>
          <Text style={{ fontSize: 14, fontWeight: 700, color: COLOR.text }}>{currentUser?.name}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ fontSize: 14, color: COLOR.subText }}>Time:</Text>
          <Text style={{ fontSize: 14, fontWeight: 700, color: COLOR.text }}>{"27/09/2024 11:00 AM"}</Text>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: inset.bottom + 48,
          paddingHorizontal: 24,
        }}
      >
        <TouchableOpacity
          onPress={handlePress}
          style={{ backgroundColor: COLOR.primary, paddingHorizontal: 16, paddingVertical: 16, borderRadius: 50 }}
        >
          <Text style={{ textAlign: "center", color: "white", fontWeight: 600 }}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
