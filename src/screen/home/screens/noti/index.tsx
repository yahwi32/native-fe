import { ScrollView, View, Text } from "react-native";

import { NotiStyle } from "./noti.style";

import { useGetNoti } from "@/api/noti";
import LoadingModal from "@/components/loading";
import NotiItem from "@/components/notiItem";
import { COLOR } from "@/enum/color";

const NotificationScreen = () => {
  const { data, isLoading } = useGetNoti();

  return (
    <View style={NotiStyle.wrapper}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 24 }}>
        {data ? (
          <View style={{ gap: 16 }}>
            {data?.reverse()?.map((item, index) => {
              return <NotiItem key={index} time={item.createdAt} title="Looks like you just fell" />;
            })}
          </View>
        ) : (
          <View>
            <Text style={{ fontSize: 24, color: COLOR.orange, fontWeight: 700, textAlign: "center" }}>Not found</Text>
          </View>
        )}
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </View>
  );
};
export default NotificationScreen;
