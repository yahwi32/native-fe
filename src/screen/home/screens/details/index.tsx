import { useNavigation } from "@react-navigation/native";
import { Text, ScrollView, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DetailsStyle } from "./details.style";

import { FallDownType } from "@/api/noti/noti.type";
import { COLOR } from "@/enum/color";
import { AppStackNavigationProps, AppStackScreenProps } from "@/navigation/stack";
import { useCurrentUser } from "@/store/app";
import { convertTimestamp } from "@/ultil";

export type DetailsScreenProps = {
  detail?: FallDownType;
};
const DetailsScreen = ({ route }: AppStackScreenProps<"detail">) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<AppStackNavigationProps>();
  const currentUser = useCurrentUser();
  const { params } = route;
  const { detail } = params;

  const windowWidth = Dimensions.get("window").width;
  const handlePress = () => {
    navigation.navigate("homeStack");
  };

  return (
    <View style={DetailsStyle.wrapper}>
      <ScrollView style={{ flex: 1 }}>
        {params.detail && (
          <View>
            {detail?.image && (
              <Image
                source={{ uri: `data:image/png;base64,${detail.image}` }}
                style={{ width: windowWidth - 32, height: 300 }}
              />
            )}
            <View style={DetailsStyle.content}>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  color: COLOR.heart,
                }}
              >
                Fall detection
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: COLOR.orange,
                }}
              >
                Camera 1
              </Text>
              {detail?.updatedAt && (
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    color: COLOR.text,
                  }}
                >
                  {convertTimestamp(detail?.updatedAt)}
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          paddingVertical: inset.bottom + 48,
          paddingHorizontal: 24,
          gap: 16,
        }}
      >
        <TouchableOpacity
          onPress={handlePress}
          style={{ backgroundColor: COLOR.primary, paddingHorizontal: 16, paddingVertical: 16, borderRadius: 50 }}
        >
          <Text style={{ textAlign: "center", color: "white", fontWeight: 600 }}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;
