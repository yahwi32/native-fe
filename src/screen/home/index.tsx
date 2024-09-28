import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
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
import { convertTimestamp } from "@/ultil";

const HomeScreen = () => {
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
    navigation.navigate("login");
  };

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification Received!");
      console.log(notification);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification Clicked!");
      console.log(response);
    });
    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

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
    if (!currentUser) {
      navigation.navigate("login");
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
          {heartRate.toString() === "0" ? "Measuring heart rate ..." : "Measured heart rate:"}
        </Text>
        <Text style={{ fontSize: 24, lineHeight: 28, fontWeight: 500, color: COLOR.heart }}>
          {" "}
          {heartRate.toString() === "0" ? " - " : heartRate} bpm
        </Text>
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
          <Text style={{ fontSize: 14, fontWeight: 700, color: COLOR.text }}>{convertTimestamp(updatedAt)}</Text>
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
