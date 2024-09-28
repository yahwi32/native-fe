import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

import { SettingStyle } from "./setting.style";

import { COLOR } from "@/enum/color";
import { AppStackNavigationProps } from "@/navigation/stack";
import useAppStore from "@/store/app";

const SettingScreen = () => {
  const [device, setDevice, currentUser, logout] = useAppStore((state) => [
    state.device,
    state.setDevice,
    state.currentUser,
    state.logout,
  ]);

  const [deviceId, setDeviceId] = useState("");
  const [mode, setMode] = useState<"edit" | "save">("edit");

  const navigation = useNavigation<AppStackNavigationProps>();

  const handlePressLogout = () => {
    logout();
    if (currentUser) {
      Toast.show({
        type: "success",
        text1: "Logout successful",
        text2: `Please login with email and password to use the app.`,
      });
    }
    navigation.navigate("login");
  };

  const handlePressDevice = () => {
    setMode((pre) => (pre === "edit" ? "save" : "edit"));

    if (mode === "save" && deviceId) {
      setDevice(deviceId);
    }
  };

  useEffect(() => {
    if (device) {
      setDeviceId(device);
    }
  }, [device]);

  return (
    <View style={SettingStyle.wrapper}>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Text style={[SettingStyle.title, SettingStyle.textOrange]}>User information</Text>
          <View>
            <View style={SettingStyle.fieldContainer}>
              <Text style={SettingStyle.label}>Username:</Text>
              <Text style={SettingStyle.value}>{currentUser?.name}</Text>
            </View>
            <View style={SettingStyle.fieldContainer}>
              <Text style={SettingStyle.label}>Email:</Text>
              <Text style={SettingStyle.value}>{currentUser?.email}</Text>
            </View>
          </View>
          <View style={SettingStyle.divider} />
          <View>
            <Text style={[SettingStyle.title, SettingStyle.textOrange]}>Set up health tracker id</Text>
            <TextInput
              placeholder="Enter your health tracker id"
              value={deviceId}
              placeholderTextColor={COLOR.subText}
              onChangeText={(value) => setDeviceId(value)}
              style={[SettingStyle.input, mode !== "save" && SettingStyle.inputDisable]}
              editable={mode === "save" ? true : false}
              selectTextOnFocus={mode === "save" ? true : false}
            />
            <TouchableOpacity onPress={handlePressDevice} style={[SettingStyle.btn, SettingStyle.btnSave]}>
              <Text style={SettingStyle.textBtn}>{mode === "edit" ? "Edit" : "Save"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={SettingStyle.logout}>
        <TouchableOpacity onPress={handlePressLogout} style={SettingStyle.btn}>
          <Text style={SettingStyle.textBtn}>{currentUser ? "Logout" : "Login"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;
