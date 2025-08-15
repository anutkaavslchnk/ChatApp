import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, clearToken, setToken } from "../../config/api";
import toast from "react-hot-toast";

import { connectedSocket } from "../socket/helper";
import { clearSocket } from "../socket/slice";

export const registerThunk = createAsyncThunk(
  "register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("api/auth/signup", credentials);
      setToken(data.accessToken);
      toast.success("New account created! Please log in");

      connectedSocket(thunkAPI.dispatch, data.accessToken, data.user._id);
      return data;
    } catch (error) {
      toast.error("Something went wrong! Try again");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("api/auth/login", credentials);
      setToken(data.accessToken);
      toast.success("You logged in!");
      connectedSocket(thunkAPI.dispatch, data.accessToken, data.user._id);
      return data;
    } catch (error) {
      toast.error("Something went wrong! Try again");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutThunk = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await api.post("api/auth/logout");
    toast.success("You logged out!");
    clearToken();
    thunkAPI.dispatch(clearSocket());
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getMe = createAsyncThunk("getMe", async (_, thunkAPI) => {
  let savedToken = thunkAPI.getState().auth.accessToken;
  if (typeof savedToken === "string") {
    savedToken = savedToken.replace(/^"|"$/g, "");
  }
  if (savedToken === null) {
    return thunkAPI.rejectWithValue("Token is not exist!");
  }
  try {
    setToken(savedToken);
    const { data } = await api.get("api/auth/check");
    connectedSocket(thunkAPI.dispatch, data.accessToken, data._id);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateProfileThunk = createAsyncThunk(
  "updateProfile",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.put("api/auth/update-profile", credentials);
      console.log("Server Response:", data);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// in operations.js
export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async (token, thunkAPI) => {
    try {
      // send id_token to backend
      const { data } = await api.post("/api/auth/google", {
        credential: token,
      });
      setToken(data.accessToken);
      toast.success("You logged in with Google!");
      connectedSocket(thunkAPI.dispatch, data.accessToken, data.user._id);
      return data;
    } catch (error) {
      toast.error("Google login failed!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const googleRegisterThunk = createAsyncThunk(
  "auth/googleRegister",
  async (token, thunkAPI) => {
    try {
      // send id_token to backend
      const { data } = await api.post("/api/auth/google/signup", {
        credential: token,
      });
      setToken(data.accessToken);
      toast.success("Signed up with Google successfully!");
      connectedSocket(thunkAPI.dispatch, data.accessToken, data.user._id);
      return data;
    } catch (error) {
      toast.error("Google signup failed!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
