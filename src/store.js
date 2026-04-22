// src/store.js
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from './reducers/user';
import intakesReducer from './reducers/intakes';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
    user: userReducer,
    intakes: intakesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// CRITICAL: Export both specifically
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);