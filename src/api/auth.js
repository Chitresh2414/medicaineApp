/**
 * authApi.js
 * Handles authentication requests to the backend
 */

/**
 * Simulates a user login request
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise} - Resolves with user data and token
 */
export const loginUserApi = async (email, password) => {
  return new Promise((resolve, reject) => {
    console.log(`[API] Attempting login for: ${email}`);

    // Simulating network latency (1.5 seconds)
    setTimeout(() => {
      // Logic for mock authentication
      const isValidUser = email === "admin@test.com" && password === "password123";

      if (isValidUser) {
        resolve({
          status: "success",
          data: {
            user: { 
                id: '1', 
                name: 'Chinku', // Updated to your preferred nickname
                location: 'Udaipur, IN' 
            },
            token: 'fake-jwt-token-for-development-use',
          }
        });
      } else {
        // Professional error message
        reject({
          status: "error",
          message: "Invalid credentials. Please check your email or password."
        });
      }
    }, 1500);
  });
};