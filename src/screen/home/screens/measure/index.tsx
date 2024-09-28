import { useNavigation } from "@react-navigation/native";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withRepeat } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MeasureStyle } from "./measure.style";

import SvgHeart from "@/assets/svg/SvgHeart";
import { COLOR } from "@/enum/color";
import { db } from "@/firebase";
import { AppStackNavigationProps } from "@/navigation/stack";
import { useCurrentUser } from "@/store/app";
import { convertTimestamp } from "@/ultil";

const MeasureScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<AppStackNavigationProps>();
  const currentUser = useCurrentUser();
  const [heartRate, setHeartRate] = useState("");
  const [updatedAt, setUpdatedAt] = useState(new Date().getTime());

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    navigation.navigate("homeStack");
  };

  useEffect(() => {
    const dataRef = ref(db, "data/heart/66d948021a49420250e10923");

    const unsubscribeHeartRate = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setHeartRate(data?.heart_rate);
      setUpdatedAt(data?.updated_at);
    });

    return () => {
      unsubscribeHeartRate();
    };
  }, []);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.5, { duration: 1000 }), -1, true);
  }, [scale]);
  return (
    <View style={MeasureStyle.wrapper}>
      <ScrollView style={{ flex: 1 }}>
        <View style={MeasureStyle.title}>
          <Text style={MeasureStyle.text}>
            {heartRate.toString() === "0" ? "Measuring heart rate ..." : "Measured heart rate:"}
          </Text>
          <Text style={[MeasureStyle.text, MeasureStyle.textPrimary]}>
            {" "}
            {heartRate.toString() === "0" ? " - " : heartRate} bpm
          </Text>
        </View>
        <View style={{ marginTop: 100 }}>
          <Animated.View style={animatedStyle}>
            <SvgHeart width={100} height={100} fill={COLOR.heart} />
          </Animated.View>
        </View>
        <View style={MeasureStyle.information}>
          <View style={MeasureStyle.fieldContainer}>
            <Text style={MeasureStyle.label}>Id Device:</Text>
            <Text style={MeasureStyle.value}>{"66d948021a49420250e10923"}</Text>
          </View>
          <View style={MeasureStyle.fieldContainer}>
            <Text style={MeasureStyle.label}>Username:</Text>
            <Text style={MeasureStyle.value}>{currentUser?.name}</Text>
          </View>
          <View style={MeasureStyle.fieldContainer}>
            <Text style={MeasureStyle.label}>Time:</Text>
            <Text style={MeasureStyle.value}>{convertTimestamp(updatedAt)}</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
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

export default MeasureScreen;
