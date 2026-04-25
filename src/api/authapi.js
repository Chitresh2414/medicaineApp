import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Replace with your machine's local IP
const BASE_URL = "http://192.168.0.101:8000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor: Attach Bearer Token
 */
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * LOGIN
 * Matches Pydantic: UserLogin(email, password)
 */
export const loginUserApi = async (credentials) => {
  try {
    // credentials is { email: "...", password: "..." }
    const response = await api.post("/auth/login", credentials);

    if (response.data?.token) {
      await AsyncStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    // Extracting Pydantic validation errors or custom server messages
    const errorData = error.response?.data;
    throw {
      message: errorData?.message || "Login failed",
      detail: errorData?.detail, // This contains specific field errors from FastAPI
      status: error.response?.status,
    };
  }
};

/**
 * REGISTER
 * Matches Pydantic: UserCreate(name, email, password)
 */
export const registerUserApi = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Registration failed",
      detail: error.response?.data?.detail,
      status: error.response?.status,
    };
  }
};

/**
 * UPDATE PROFILE
 * Matches Pydantic: UpdateProfileSchema(name, email, currentPassword?, newPassword?)
 */
export const updateProfileApi = async (updateData) => {
  try {
    const response = await api.put("/auth/me", updateData);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Profile update failed",
      detail: error.response?.data?.detail,
      status: error.response?.status,
    };
  }
};

/**
 * GET CURRENT USER
 */
export const getCurrentUserApi = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw {
      message: "Session expired",
      status: error.response?.status,
    };
  }
};

/**
 * LOGOUT
 */
export const logoutUserApi = async () => {
  await AsyncStorage.removeItem("token");
};

export default api;