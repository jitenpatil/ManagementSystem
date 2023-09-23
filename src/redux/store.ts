import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { encryptTransform } from 'redux-persist-transform-encrypt';

import authSlice from './slices/auth'


const persistConfig = {
    key: "root",
    version: 1,
    storage,
    transforms:[encryptTransform({
        secretKey: process.env.REACT_APP_ENCRYPTION_KEY || "",
        onError: function (error:any) {
          // Handle the error.
        },
      })
    ]
  };

const reducers = combineReducers({
    auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;