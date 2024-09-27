import { ActivityIndicator, Modal, View } from "react-native";

import { LoadingModalStyle } from "./loading.style";

import { COLOR } from "@/enum/color";

type LoadingModalProps = {
  visible?: boolean;
};
const LoadingModal = ({ visible = false }: LoadingModalProps) => {
  return (
    <Modal transparent visible={visible}>
      <View style={LoadingModalStyle.default}>
        <ActivityIndicator size="large" color={COLOR.orange} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
