import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CURRENT_ENV } from "./config";

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

const api = axios.create({
  baseURL: CURRENT_ENV.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Error formatter
const formatError = (error) => {
  if (!error.response) {
    return {
      message: "Network error. Check your internet connection.",
      status: 0,
      detail: null,
    };
  }

  return {
    message:
      error.response.data?.message ||
      error.message ||
      "Something went wrong",
    status: error.response.status,
    detail: error.response.data?.detail || null,
  };
};

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");
      setAuthToken(null);
      console.log("Session expired");
    }

    return Promise.reject(formatError(error));
  }
);

// DEV logging
if (__DEV__) {
  api.interceptors.request.use((req) => {
    console.log("➡️", req.method?.toUpperCase(), req.url);
    return req;
  });

  api.interceptors.response.use((res) => {
    console.log("✅", res.config.url);
    return res;
  });
}

export default api;