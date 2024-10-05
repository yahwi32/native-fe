import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { db } from "@/firebase";
import AppStack from "@/navigation/stack";
import useAppStore, { useCurrentUser } from "@/store/app";
import { THRESHOLD_NOTI } from "@/ultil/config";

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

export default function App() {
  const device = useAppStore((state) => state.device);

  const currentUser = useCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (!device) {
      return;
    }

    const dataFallDownRef = ref(db, `data/fall/${device ?? "66d948021a49420250e10923"}`);
    const unsubscribeFallDown = onValue(dataFallDownRef, (snapshot) => {
      const status: boolean = snapshot.val()?.status;
      const updated_at: number = Number(snapshot.val()?.updated_at ?? 0);

      if (status && new Date().getTime() - updated_at < THRESHOLD_NOTI) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Warning",
            body: "Looks like you just fell",
          },
          trigger: { seconds: 5 },
        });
      }
    });
    return () => {
      unsubscribeFallDown();
    };
  }, [currentUser, device]);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          console.error("Permission not granted for notifications.");
        }
      }
    };

    requestNotificationPermission();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppStack />
            <Toast />
          </GestureHandlerRootView>
        </QueryClientProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
