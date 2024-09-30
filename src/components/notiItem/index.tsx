import { formatDistanceToNow } from "date-fns";
import { TouchableOpacity, View, Text, GestureResponderEvent } from "react-native";

import { COLOR } from "@/enum/color";

type NotiItemProps = {
  title: string;
  time: number | string;
  onPress?: (event: GestureResponderEvent) => void;
};
const NotiItem = ({ time, title, onPress }: NotiItemProps) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          borderWidth: 1,
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 12,
          borderColor: COLOR.subText,
        }}
        onPress={onPress}
      >
        <Text style={{ fontSize: 16, color: COLOR.orange }}>{title}</Text>
        <Text style={{ fontSize: 12, color: COLOR.subText }}>
          {formatDistanceToNow(new Date(time), { addSuffix: true })}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotiItem;
