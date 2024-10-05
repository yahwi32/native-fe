/* eslint-disable import/order */

import bgImage from "@/assets/bg.jpg";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useSignIn, useSignUp } from "@/api/user";
import { SignInParamsType } from "@/api/user/user.type";
import { useCallback, useEffect, useState } from "react";
import { COLOR } from "@/enum/color";
import LoadingModal from "@/components/loading";
import useAppStore from "@/store/app";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigationProps } from "@/navigation/stack";
import Toast from "react-native-toast-message";
import { LoginScreenStyle } from "./login.style";
import { DEAULT_PARAMS_LOGIN } from "./login.const";
import { BottomTabNavigationProps } from "@/navigation";

const LoginScreen = () => {
  // const { params: paramRoute } = route;
  const navigationConfig = useNavigation<AppStackNavigationProps<"login">>();
  const { mutate: mutateLogin, data: dataLogin, isPending: isPendingLogin, error: errorLogin } = useSignIn();
  const { mutate: mutateSignUp, data: dataSignUp, isPending: isPendingSignUp, error: errorSignUp } = useSignUp();
  const [params, setParams] = useState<SignInParamsType>(DEAULT_PARAMS_LOGIN);

  const [mode, setMode] = useState<"login" | "signUp">("login");

  const navigation = useNavigation<BottomTabNavigationProps>();

  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const areAllFieldsFilled = useCallback(
    (fields: SignInParamsType) => {
      if (mode === "login") {
        if (fields.email && fields.password) {
          return true;
        }
        return false;
      } else {
        for (const key in fields) {
          if (fields[key as keyof SignInParamsType] === "" || fields[key as keyof SignInParamsType] == null) {
            return false;
          }
        }
        return true;
      }
    },
    [mode]
  );

  const handlePress = async () => {
    if (mode === "login" && areAllFieldsFilled(params)) {
      await mutateLogin(params);
      return;
    }
    if (params.password !== params.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password is incorrect",
        text2: `Please enter the same password and confirm password`,
      });
      return;
    }
    if (areAllFieldsFilled(params)) await mutateSignUp(params);
  };

  const handeChangeMode = () => {
    setMode((pre) => (pre === "login" ? "signUp" : "login"));
    setParams(DEAULT_PARAMS_LOGIN);
  };

  useEffect(() => {
    navigationConfig.setOptions({
      headerTitle: mode === "login" ? "Login" : "Sign Up",
    });
  }, [mode, navigationConfig]);

  useEffect(() => {
    const userData = dataLogin || dataSignUp;
    if (userData) {
      setCurrentUser(userData);
      Toast.show({
        type: "success",
        text1: userData === dataLogin ? "Login successful" : "Sign up successful",
        text2: `Welcome ${userData.name}`,
      });
      navigation.navigate("home");
    }
  }, [dataLogin, dataSignUp, navigation, setCurrentUser]);

  useEffect(() => {
    if (errorLogin) {
      Toast.show({
        type: "error",
        text1: "Email or Password is incorrect",
        text2: `Please check and try again`,
      });
      return;
    }
    if (errorSignUp) {
      Toast.show({
        type: "error",
        text1: "Server error",
        text2: `Try again later`,
      });
      return;
    }
  }, [errorLogin, errorSignUp]);

  return (
    <>
      <View style={LoginScreenStyle.wrapper}>
        <ImageBackground source={bgImage} resizeMode="contain" style={{ flex: 1 }}>
          <View style={LoginScreenStyle.container}>
            <View style={LoginScreenStyle.titleContainer}>
              <Text style={LoginScreenStyle.textContent}>Welcome to Healthy app</Text>
            </View>
            <View style={LoginScreenStyle.bottomContainer}>
              <View style={LoginScreenStyle.bottomContent}>
                <View style={{ gap: 12 }}>
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor={COLOR.subText}
                    value={params.email}
                    onChangeText={(value) => setParams((pre) => ({ ...pre, email: value }))}
                    style={LoginScreenStyle.input}
                  />
                  {mode === "signUp" && (
                    <TextInput
                      placeholder="Enter your name"
                      value={params.name}
                      placeholderTextColor={COLOR.subText}
                      onChangeText={(value) => setParams((pre) => ({ ...pre, name: value }))}
                      style={LoginScreenStyle.input}
                    />
                  )}
                  <TextInput
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={params.password}
                    placeholderTextColor={COLOR.subText}
                    onChangeText={(value) => setParams((pre) => ({ ...pre, password: value }))}
                    style={LoginScreenStyle.input}
                  />
                  {mode === "signUp" && (
                    <TextInput
                      placeholder="Enter confirm your password"
                      secureTextEntry={true}
                      value={params.confirmPassword}
                      placeholderTextColor={COLOR.subText}
                      onChangeText={(value) => setParams((pre) => ({ ...pre, confirmPassword: value }))}
                      style={LoginScreenStyle.input}
                    />
                  )}
                </View>
                <TouchableOpacity style={LoginScreenStyle.btn} onPress={handlePress}>
                  <Text style={LoginScreenStyle.btnText}>{mode === "signUp" ? "Sign Up" : "Login"}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <Text style={{ fontSize: 12, color: COLOR.subText }}>
                    {mode === "signUp" ? "You don't have an account ? " : "You already have an account "}
                  </Text>
                  <TouchableOpacity onPress={handeChangeMode}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLOR.primary,
                      }}
                    >
                      {mode === "signUp" ? " Login " : " Sign up "}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 12, color: COLOR.subText }}>now</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <LoadingModal visible={isPendingLogin || isPendingSignUp} />
    </>
  );
};

export default LoginScreen;
