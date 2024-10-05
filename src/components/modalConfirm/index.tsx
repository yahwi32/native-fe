import { Modal, Text, TouchableOpacity, View } from "react-native";

import { COLOR } from "@/enum/color";

type ModalConfirmProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
  title: string;
  content?: string;
};

const ModalConfirm = ({ visible, onCancel, onConfirm, title, content }: ModalConfirmProps) => {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLOR.backgroundOverlay,
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            backgroundColor: COLOR.text,
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 16,
            minWidth: 200,
          }}
        >
          <View style={{ gap: 16 }}>
            <Text style={{ textAlign: "center", fontSize: 24, fontWeight: 600 }}>{title}</Text>
            {content && <Text>{content}</Text>}
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 32,
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 100,
                borderWidth: 1,
              }}
              onPress={onCancel}
            >
              <Text style={{ color: COLOR.background }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 100,
                backgroundColor: COLOR.red,
              }}
              onPress={onConfirm}
            >
              <Text style={{ color: COLOR.text }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfirm;
