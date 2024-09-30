import { useNavigation } from "@react-navigation/native";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera"; // Correct import for Camera component
import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import Toast from "react-native-toast-message";

import { SettingStyle } from "./setting.style";

import { COLOR } from "@/enum/color";
import { AppStackNavigationProps } from "@/navigation/stack";
import useAppStore from "@/store/app";

const SettingScreen: React.FC = () => {
  const [device, setDevice, currentUser, logout] = useAppStore((state) => [
    state.device,
    state.setDevice,
    state.currentUser,
    state.logout,
  ]);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<string>("");
  const [mode, setMode] = useState<"edit" | "save">("edit");

  const navigation = useNavigation<AppStackNavigationProps>();

  const handlePressLogout = (): void => {
    logout();
    Toast.show({
      type: "success",
      text1: "Logout successful",
      text2: `Please login with email and password to use the app.`,
    });
    navigation.navigate("login");
  };

  const handlePressDevice = (): void => {
    setMode((prevMode) => (prevMode === "edit" ? "save" : "edit"));
    if (mode === "save" && deviceId) {
      setDevice(deviceId);
    }
  };
  const [_, requestPermission] = useCameraPermissions();

  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult): void => {
    setIsOpen(false);
    const data = JSON.parse(scanningResult.data);
    setDeviceId(data?.device);
  };

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      setHasPermission(status === "granted");
    })();
  }, [requestPermission]);

  useEffect(() => {
    if (device) {
      setDeviceId(device);
    }
  }, [device]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={SettingStyle.wrapper}>
      <ScrollView style={{ flex: 1 }}>
        <View>
          {/* User Information */}
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
          {/* Health Tracker ID */}
          <View>
            <Text style={[SettingStyle.title, SettingStyle.textOrange]}>Set up health tracker id</Text>
            <TextInput
              placeholder="Enter your health tracker id"
              value={deviceId}
              placeholderTextColor={COLOR.subText}
              onChangeText={(value) => setDeviceId(value)}
              style={[SettingStyle.input, mode !== "save" && SettingStyle.inputDisable]}
              editable={mode === "save"}
              selectTextOnFocus={mode === "save"}
            />
            <TouchableOpacity onPress={handlePressDevice} style={[SettingStyle.btn, SettingStyle.btnSave]}>
              <Text style={SettingStyle.textBtn}>{mode === "edit" ? "Edit" : "Save"}</Text>
            </TouchableOpacity>
          </View>
          {/* QR Scanner */}
          <View>
            <TouchableOpacity onPress={() => setIsOpen(true)} style={[SettingStyle.btn, SettingStyle.btnSave]}>
              <Text style={SettingStyle.textBtn}>{"Tap to Scan QR code"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal visible={isOpen}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOR.backgroundDark,
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 50,
              right: 24,
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 100,
              backgroundColor: "red",
            }}
            onPress={() => setIsOpen(false)}
          >
            <Text style={{ color: COLOR.text }}>Close</Text>
          </TouchableOpacity>
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleBarcodeScanned}
            style={{ height: 300, width: 300, borderWidth: 1, borderColor: COLOR.orange }}
          />
        </View>
      </Modal>
      <View style={SettingStyle.logout}>
        <TouchableOpacity onPress={handlePressLogout} style={SettingStyle.btn}>
          <Text style={SettingStyle.textBtn}>{currentUser ? "Logout" : "Login"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;
