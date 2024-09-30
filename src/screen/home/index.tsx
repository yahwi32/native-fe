import { useNavigation } from "@react-navigation/native";
import { onValue, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { HomeStyle } from "./home.style";

import SvgBell from "@/assets/svg/SvgBell";
import SvgHeart from "@/assets/svg/SvgHeart";
import Chart from "@/components/chart";
import { COLOR } from "@/enum/color";
import { db } from "@/firebase";
import { AppStackNavigationProps } from "@/navigation/stack";
import useAppStore, { useCurrentUser } from "@/store/app";

const HomeScreen = () => {
  const device = useAppStore((state) => state.device);
  const navigation = useNavigation<AppStackNavigationProps>();
  const navigationConfig = useNavigation<AppStackNavigationProps<"homeStack">>();
  const currentUser = useCurrentUser();

  const [isLastestNoti, setIsLastestNoti] = useState(false);

  const handlePress = () => {
    navigation.navigate("measure");
  };

  const handlePressNoti = useCallback(() => {
    setIsLastestNoti(false);
    navigation.navigate("noti");
  }, [navigation]);

  const isLoadingUser = currentUser === undefined;
  useEffect(() => {
    if (!isLoadingUser && !currentUser) {
      navigation.navigate("login");
    }
  }, [currentUser, isLoadingUser, navigation]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (!device) {
      return;
    }

    const dataFallDownRef = ref(db, `data/fall/${device ?? "66d948021a49420250e10923"}`);
    const unsubscribeFallDown = onValue(dataFallDownRef, (snapshot) => {
      const status = snapshot.val()?.status;
      const lastest = snapshot.val()?.updated_at;

      const now = new Date().getTime();
      if (now - lastest < 3000 && status) {
        setIsLastestNoti(true);
      }
    });
    return () => {
      unsubscribeFallDown();
    };
  }, [currentUser, device]);

  useEffect(() => {
    navigationConfig.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 8, position: "relative" }}>
          <TouchableOpacity style={{ padding: 4 }} onPress={handlePressNoti}>
            <SvgBell width={28} height={28} />
          </TouchableOpacity>
          {isLastestNoti && (
            <View
              style={{
                position: "absolute",
                backgroundColor: "red",
                width: 10,
                height: 10,
                borderRadius: 10,
                right: 6,
                top: 4,
              }}
            />
          )}
        </View>
      ),
    });
  }, [handlePressNoti, isLastestNoti, navigationConfig]);

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
