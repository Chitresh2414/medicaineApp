// /**
//  * authApi.js
//  * Handles authentication requests to the backend
//  */

// /**
//  * Simulates a user login request
//  * @param {string} email 
//  * @param {string} password 
//  * @returns {Promise} - Resolves with user data and token
//  */
// export const loginUserApi = async (email, password) => {
//   return new Promise((resolve, reject) => {
//     console.log(`[API] Attempting login for: ${email}`);

//     // Simulating network latency (1.5 seconds)
//     setTimeout(() => {
//       // Logic for mock authentication
//       const isValidUser = email === "admin@test.com" && password === "password123";

//       if (isValidUser) {
//         resolve({
//           status: "success",
//           data: {
//             user: { 
//                 id: '1', 
//                 name: 'Chinku', // Updated to your preferred nickname
//                 location: 'Udaipur, IN' 
//             },
//             token: 'fake-jwt-token-for-development-use',
//           }
//         });
//       } else {
//         // Professional error message
//         reject({
//           status: "error",
//           message: "Invalid credentials. Please check your email or password."
//         });
//       }
//     }, 1500);
//   });
// };

// src/api/authApi.js
// FastAPI Backend Integration

import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/auth';
// For Android Emulator use:
// const BASE_URL = 'http://10.0.2.2:8000/api/v1/auth';

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
};

// REGISTER
export const registerApi = async (payload) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    }),
  });

  return await response.json();
};

// LOGIN
export const loginApi = async (payload) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });

  const data = await response.json();

  if (data.success && data.token) {
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};

// GET CURRENT USER
export const getMeApi = async () => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: 'GET',
    headers: await getAuthHeaders(),
  });

  return await response.json();
};

// UPDATE PROFILE
export const updateProfileApi = async (payload) => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      currentPassword: payload.currentPassword || null,
      newPassword: payload.newPassword || null,
    }),
  });

  const data = await response.json();

  if (data.success) {
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};

// LOGOUT
export const logoutApi = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
};


/*
====================================================
LOGIN SCREEN USAGE
====================================================

import { loginApi } from '../api/authApi';

const handleLogin = async () => {
  const response = await loginApi({
    email,
    password,
  });

  if (response.success) {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        token: response.token,
        ...response.user,
      },
    });

    navigation.replace('Home');
  } else {
    Alert.alert('Error', response.message);
  }
};

====================================================
UPDATE PROFILE SCREEN USAGE
====================================================

import { updateProfileApi } from '../api/authApi';

const handleSave = async () => {
  const response = await updateProfileApi(formData);

  if (response.success) {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: response.user,
    });

    Alert.alert('Success', response.message);
    navigation.goBack();
  } else {
    Alert.alert('Error', response.message || 'Update failed');
  }
};

*/
