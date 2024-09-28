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
  useEffect(() => {
    const dataFallDownRef = ref(db, "data/fall/66d948021a49420250e10923");
    const unsubscribeFallDown = onValue(dataFallDownRef, (snapshot) => {
      const status: boolean = snapshot.val()?.status;
      if (status) {
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
  }, []);

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
