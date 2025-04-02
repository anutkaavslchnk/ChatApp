import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, clearToken, setToken } from "../../config/api";
import toast from "react-hot-toast";

export const registerThunk=createAsyncThunk('register', async(credentials, thunkAPI)=>{
    try {
        const {data}=await api.post('api/auth/signup', credentials);
        setToken(data.accessToken)
        toast.success("New account created! Please log in")
        return data;
    } catch (error) {
        toast.error("Something went wrong! Try again");
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const loginThunk=createAsyncThunk('login', async(credentials,thunkAPI)=>{
    try {
        const {data}=await api.post('api/auth/login', credentials);
        setToken(data.accessToken);
        toast.success("You logged in!");
        return data;
       
    } catch (error) {
        toast.error("Something went wrong! Try again");
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const logOutThunk=createAsyncThunk('logout', async(_, thunkAPI)=>{
try {
    await api.post('api/auth/logout');
    toast.success("You logged out!");
    clearToken();
} catch (error) {
    return thunkAPI.rejectWithValue(error.message);
}
})

export const getMe=createAsyncThunk('getMe', async(_,thunkAPI)=>{
    const savedToken=thunkAPI.getState().auth.accessToken;
    console.log("Saved Token on Reload:", savedToken);
    if(savedToken===null){
        return thunkAPI.rejectWithValue('Token is not exist!');
    }
    try {
        setToken(savedToken)
        const {data}=await api.get('api/auth/check');
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const updateProfileThunk=createAsyncThunk('updateProfile', async(credentials, thunkAPI)=>{
    try {
        const {data}=await api.put('api/auth/update-profile', credentials);
        console.log("Server Response:", data);

        return data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})