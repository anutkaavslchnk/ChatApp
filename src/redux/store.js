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
import { messageReducer } from "./messages/slice";
import { socketReducer } from "./socket/slice";
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
        messages: persistReducer(persistConfig, messageReducer),
        socket: socketReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'socket/setSocket',],
            ignoredPaths: ['socket.socket'],
          },
        }),
})

export const  persistor = persistStore(store)