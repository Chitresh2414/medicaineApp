// src/reducers/user.js

// ==============================
// ACTION TYPES
// ==============================
export const SET_TOKEN = "SET_TOKEN";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const LOGOUT = "LOGOUT";

// ==============================
// INITIAL STATE
// ==============================
const initialState = {
  name: "Chinku",
  profileLetter: "C",
  location: "Udaipur, IN",
  isLoggedIn: false,
  token: null,
};

// ==============================
// HELPERS
// ==============================
const isValidToken = (token) => {
  return typeof token === "string" && token.trim().length > 10;
};

const getProfileLetter = (name) => {
  if (!name || typeof name !== "string") return "C";
  return name.charAt(0).toUpperCase();
};

// ==============================
// REDUCER
// ==============================
const userReducer = (state = initialState, action) => {
  switch (action.type) {

    // ==========================
    // SET TOKEN (LOGIN)
    // ==========================
    case SET_TOKEN: {
      const token = action.payload;

      return {
        ...state,
        token,
        isLoggedIn: isValidToken(token), // ✅ safer check
      };
    }

    // ==========================
    // UPDATE PROFILE
    // ==========================
    case UPDATE_PROFILE: {
      const { name, location } = action.payload || {};

      return {
        ...state,
        name: name ?? state.name,
        location: location ?? state.location,
        profileLetter: name
          ? getProfileLetter(name)
          : state.profileLetter,
      };
    }

    // ==========================
    // LOGOUT
    // ==========================
    case LOGOUT:
      return {
        ...initialState,
        isLoggedIn: false,
        token: null,
      };

    default:
      return state;
  }
};

export default userReducer;