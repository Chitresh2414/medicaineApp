// src/reducers/user.js

const initialState = {
    name: "Chinku",
    profileLetter: "C",
    location: "Udaipur, IN",
    isLoggedIn: true,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE':
            return {
                ...state,
                ...action.payload,
            };
        case 'LOGOUT':
            return {
                ...initialState,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default userReducer;