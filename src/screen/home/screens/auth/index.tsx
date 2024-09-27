/* eslint-disable import/order */

import bgImage from "@/assets/bg.jpg";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";

import { AuthScreenStyle } from "./auth.style";

import { useSignIn } from "@/api/user";
import { SignInParamsType } from "@/api/user/user.type";
import { useEffect, useState } from "react";
import { COLOR } from "@/enum/color";
import LoadingModal from "@/components/loading";
import useAppStore from "@/store/app";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigationProps } from "@/navigation/stack";
import Toast from "react-native-toast-message";

const AuthScreen = () => {
  const { mutate, data, isPending } = useSignIn();
  const [params, setParams] = useState<SignInParamsType>({
    email: "",
    password: "",
  });
  const navigation = useNavigation<AppStackNavigationProps>();

  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const handlePress = async () => {
    // const params2: SignInParamsType = {
    //   email: "john.doe@example.com",
    //   password: "password123",
    // };
    await mutate(params);
  };

  useEffect(() => {
    if (data) {
      setCurrentUser(data);
      Toast.show({
        type: "success",
        text1: "Login successful",
        text2: `Welcome ${data.name}`,
      });
      navigation.navigate("homeStack");
      return;
    }
  }, [data, navigation, setCurrentUser]);
  return (
    <>
      <View style={AuthScreenStyle.wrapper}>
        <ImageBackground source={bgImage} resizeMode="contain" style={{ flex: 1 }}>
          <View style={AuthScreenStyle.container}>
            <View style={AuthScreenStyle.titleContainer}>
              <Text style={AuthScreenStyle.textContent}>Welcome to Healthy app</Text>
            </View>
            <View style={AuthScreenStyle.bottomContainer}>
              <View style={AuthScreenStyle.bottomContent}>
                <View style={{ gap: 12 }}>
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor={COLOR.subText}
                    value={params.email}
                    onChangeText={(value) => setParams((pre) => ({ ...pre, email: value }))}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: COLOR.text,
                      color: COLOR.text,
                    }}
                  />
                  <TextInput
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={params.password}
                    placeholderTextColor={COLOR.subText}
                    onChangeText={(value) => setParams((pre) => ({ ...pre, password: value }))}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: COLOR.text,
                      color: COLOR.text,
                    }}
                  />
                </View>
                <TouchableOpacity style={AuthScreenStyle.btn} onPress={handlePress}>
                  <Text style={AuthScreenStyle.btnText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <LoadingModal visible={isPending} />
    </>
  );
};

export default AuthScreen;
