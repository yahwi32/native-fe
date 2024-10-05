import { useNavigation } from "@react-navigation/native";
import { BarcodeScanningResult, useCameraPermissions } from "expo-camera";
import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

import { SettingStyle } from "./setting.style";

import SvgBin from "@/assets/svg/svgBin";
import ModalCamera from "@/components/modalCamera";
import ModalConfirm from "@/components/modalConfirm";
import { COLOR } from "@/enum/color";
import { AppStackNavigationProps } from "@/navigation/stack";
import useAppStore from "@/store/app";
import { ContentModalType, TITLE_MODAL } from "@/ultil/config";

const SettingScreen: React.FC = () => {
  const [device, setDevice, currentUser, logout, clearDevice] = useAppStore((state) => [
    state.device,
    state.setDevice,
    state.currentUser,
    state.logout,
    state.clearDevice,
  ]);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenConfirm, setIsOpenComfirm] = useState<boolean>(false);
  const [isOpenConfirmDevice, setIsOpenComfirmDevice] = useState<boolean>(false);

  const [dataScan, setDataScan] = useState<string | undefined>();

  const [contentModal, setContentModal] = useState<ContentModalType>({
    title: "",
    content: "",
  });

  const navigation = useNavigation<AppStackNavigationProps>();

  const handlePressDelete = () => {
    setContentModal({
      title: TITLE_MODAL.DELETE_DEVICE_CONTENT,
      content: TITLE_MODAL.DELETE_DEVICE_CONTENT,
    });
    setIsOpenComfirm(true);
  };

  const handlePressScanDevice = () => {
    setIsOpen(true);
  };

  const handleConfirmAddDevice = () => {
    setIsOpenComfirmDevice(false);
    if (dataScan) {
      setDevice(dataScan);
      Toast.show({
        type: "success",
        text1: `Added device successful`,
        text2: `Device id: ${dataScan} `,
      });
    }
  };

  const handlePressLogout = (): void => {
    logout();
    clearDevice();
    Toast.show({
      type: "success",
      text1: "Logout successful",
      text2: `Please login with email and password to use the app.`,
    });
    navigation.navigate("login");
  };

  const handlePressClear = () => {
    setIsOpenComfirm(false);
    clearDevice();
    Toast.show({
      type: "success",
      text1: "Delete device successful",
    });
  };

  const [_, requestPermission] = useCameraPermissions();

  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult): void => {
    setIsOpen(false);
    const data = JSON.parse(scanningResult.data);
    if (data?.device) {
      setContentModal({
        title: TITLE_MODAL.ADD_DEVICE,
        content: `${data?.device}`,
      });
      setDataScan(data?.device);
      setIsOpenComfirmDevice(true);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      setHasPermission(status === "granted");
    })();
  }, [requestPermission]);

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
            <View style={SettingStyle.delete}>
              <Text style={[SettingStyle.device]}>{device ? device : "No device"}</Text>
              {device && (
                <TouchableOpacity style={SettingStyle.btnDelete} onPress={handlePressDelete}>
                  <SvgBin fill={COLOR.red} width={20} height={20} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View>
            <TouchableOpacity onPress={handlePressScanDevice} style={[SettingStyle.btn, SettingStyle.btnSave]}>
              <Text style={SettingStyle.textBtn}>
                {device ? "Tap to change QR code of device" : "Tap to Scan QR code of device"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ModalCamera visible={isOpen} onClose={() => setIsOpen(false)} onBarcodeScanned={handleBarcodeScanned} />
      <ModalConfirm
        visible={isOpenConfirm || isOpenConfirmDevice}
        onCancel={() => {
          setIsOpenComfirm(false);
          setIsOpenComfirmDevice(false);
        }}
        onConfirm={isOpenConfirm ? handlePressClear : isOpenConfirmDevice ? handleConfirmAddDevice : undefined}
        title={contentModal.title}
        content={contentModal.content}
      />

      <View style={SettingStyle.logout}>
        <TouchableOpacity onPress={handlePressLogout} style={SettingStyle.btn}>
          <Text style={SettingStyle.textBtn}>{currentUser ? "Logout" : "Login"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;
