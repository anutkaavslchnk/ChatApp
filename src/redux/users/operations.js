import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getAllUsers=createAsyncThunk('getUsers', async(_, thunkAPI)=>{
    try {
        const {data}=await api.get('/api/message/user');
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})