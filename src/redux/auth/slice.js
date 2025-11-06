import { createSlice } from "@reduxjs/toolkit";
import {
  getMe,
  googleLoginThunk,
  googleRegisterThunk,
  loginThunk,
  logOutThunk,
  registerThunk,
  updateProfileThunk,
} from "./operations";

const initialState = {
  user: {
    fullName: "",
    email: "",
    profileAvatar: null,
  },
  accessToken: "",
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user.fullName = action.payload.user.fullName;
        state.user._id = action.payload.user._id;
        state.user.email = action.payload.user.email;
        state.isLoggedIn = true;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user._id = action.payload.user._id;
        state.user.fullName = action.payload.user.fullName;
        state.user.email = action.payload.user.email;
        state.user.profileAvatar = action.payload.user.profileAvatar;
        state.isLoggedIn = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user._id = action.payload._id;
        state.user.fullName = action.payload.fullName;
        state.user.email = action.payload.email;
        state.user.profileAvatar = action.payload.profileAvatar;
        state.isLoggedIn = true;
      })

      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        if (action.payload?.user?.profileAvatar) {
          state.user.profileAvatar = action.payload.user.profileAvatar;
        }
        state.isLoggedIn = true;
      })

      .addCase(logOutThunk.fulfilled, (state, action) => {
        return initialState;
      });
    const setAuthState = (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = { ...action.payload.user };
      state.isLoggedIn = true;
    };

    builder
      .addCase(googleRegisterThunk.fulfilled, setAuthState)
      .addCase(googleLoginThunk.fulfilled, setAuthState);
  },
});
export const authReducer = slice.reducer;
