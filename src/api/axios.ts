import axios from "axios";

const instance = axios.create({
  baseURL: "https://health-care-delta.vercel.app" ?? "https://heallthy-be.vercel.app", //http://192.168.1.7:3000",
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
      console.warn("Error", message);
    } else if (error.request) {
      console.warn("Error", "Network error. Please try again.");
    } else {
      console.warn("Error", error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
