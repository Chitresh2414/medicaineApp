import api from "../api/apiCleient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../api/apiCleient"; // important

/**
 * LOGIN
 */
export const loginUserApi = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  const token = response.data?.token;

  if (token) {
    await AsyncStorage.setItem("token", token);
    setAuthToken(token); // 🔥 important
  }

  return response.data;
};

/**
 * REGISTER
 */
export const registerUserApi = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

/**
 * UPDATE PROFILE
 */
export const updateProfileApi = async (updateData) => {
  const response = await api.put("/auth/me", updateData);
  return response.data;
};

/**
 * GET CURRENT USER
 */
export const getCurrentUserApi = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

/**
 * LOGOUT
 */
export const logoutUserApi = async () => {
  await AsyncStorage.removeItem("token");
  setAuthToken(null); // 🔥 important
};