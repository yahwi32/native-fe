import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns";
import { TouchableOpacity, View, Text, GestureResponderEvent, Image } from "react-native";

import { FallDownType } from "@/api/noti/noti.type";
import { COLOR } from "@/enum/color";
import { AppStackNavigationProps } from "@/navigation/stack";

type NotiItemProps = {
  title: string;
  time: number | string;
  image?: string;
  data: FallDownType;
};
const NotiItem = ({ time, title, image, data }: NotiItemProps) => {
  const navigate = useNavigation<AppStackNavigationProps>();
  const handleNavigateDetail = () => {
    navigate.navigate("detail", { detail: data });
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 12,
          borderColor: COLOR.subText,
        }}
        onPress={handleNavigateDetail}
      >
        {image && <Image source={{ uri: `data:image/png;base64,${image}` }} style={{ width: 40, height: 40 }} />}

        <Text style={{ fontSize: 16, color: COLOR.orange }}>{title}</Text>
        <Text style={{ fontSize: 12, color: COLOR.subText }}>
          {formatDistanceToNow(new Date(time), { addSuffix: true })}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotiItem;
