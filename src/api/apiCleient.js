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

// Load token from storage on app startup
const loadStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  } catch (e) {
    console.error("Failed to load token", e);
  }
};

loadStoredToken();

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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");
      setAuthToken(null);
      console.log("Session expired");
    }

    const formattedError = {
      message: error.response?.data?.message || error.message || "Something went wrong",
      status: error.response?.status || 0,
      detail: error.response?.data?.detail || null,
    };
    return Promise.reject(formattedError);
  }
);

export default api;