import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
import { usersReducer } from "./users/slice";
  const persistConfig = {
    key: 'auth',
    version: 1,
    storage,
    whitelist:['accessToken', 'profileAvatar']
  }
  
 
  
export const store=configureStore({
    reducer:{
        auth: persistReducer(persistConfig, authReducer),
        users: persistReducer(persistConfig, usersReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

export const  persistor = persistStore(store)