import axios from "axios";
import { Alert } from "react-native";

const instance = axios.create({
  baseURL: "http://192.168.1.7:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor for requests
instance.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for responses
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || "An error occurred";
      Alert.alert("Error", message);
    } else if (error.request) {
      Alert.alert("Error", "Network error. Please try again.");
    } else {
      Alert.alert("Error", error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
