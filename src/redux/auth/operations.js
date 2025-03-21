import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../config/api";

export const registerThunk=createAsyncThunk('register', async(credentials, thunkAPI)=>{
    try {
        const {data}=await api.post('api/auth/signup', credentials);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const loginThunk=createAsyncThunk('login', async(credentials,thunkAPI)=>{
    try {
        const {data}=await api.post('api/auth/login', credentials);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})