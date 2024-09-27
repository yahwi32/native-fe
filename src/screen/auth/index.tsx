/* eslint-disable import/order */

import bgImage from "@/assets/bg.jpg";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { AuthScreenStyle } from "./auth.style";

import SvgGoogle from "@/assets/svg/Google.svg";
import SvgFacebook from "@/assets/svg/Facebook.svg";
import { useSignIn } from "@/api/user";
import { SignInParamsType } from "@/api/user/user.type";

const AuthScreen = () => {
  const { mutate, data, isPending, error } = useSignIn();

  const handlePress = async () => {
    const params: SignInParamsType = {
      email: "john.doe@example.com",
      password: "password123",
    };
    await mutate(params);
  };
  console.log("data", data, isPending, error);
  return (
    <View style={AuthScreenStyle.wrapper}>
      <ImageBackground source={bgImage} resizeMode="contain" style={{ flex: 1 }}>
        <View style={AuthScreenStyle.container}>
          <View style={AuthScreenStyle.titleContainer}>
            <Text style={AuthScreenStyle.textContent}>Welcome to Healthy app</Text>
          </View>
          <View style={AuthScreenStyle.bottomContainer}>
            <View style={AuthScreenStyle.bottomContent}>
              <TouchableOpacity style={AuthScreenStyle.btn} onPress={handlePress}>
                <SvgFacebook width={36} height={36} />
                <Text style={AuthScreenStyle.btnText}>Login with Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={AuthScreenStyle.btn}>
                <SvgGoogle width={36} height={36} />
                <Text style={AuthScreenStyle.btnText}>Login with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AuthScreen;
