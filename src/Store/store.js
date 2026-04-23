// src/store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userReducer from "../reducers/user";
import intakesReducer from "../reducers/intakes";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  intakes: intakesReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "intakes"], // persist only needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);