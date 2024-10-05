import { BarcodeScanningResult, CameraView } from "expo-camera";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { COLOR } from "@/enum/color";

type ModalCameraProps = {
  visible: boolean;
  onClose: () => void;
  onBarcodeScanned: ((scanningResult: BarcodeScanningResult) => void) | undefined;
};

const ModalCamera = ({ visible, onClose, onBarcodeScanned }: ModalCameraProps) => {
  return (
    <Modal visible={visible}>
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
          onPress={onClose}
        >
          <Text style={{ color: COLOR.text }}>Close</Text>
        </TouchableOpacity>
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={onBarcodeScanned}
          style={{ height: 300, width: 300, borderWidth: 1, borderColor: COLOR.orange }}
        />
      </View>
    </Modal>
  );
};

export default ModalCamera;
