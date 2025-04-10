import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

import { getSelectedUser } from "../users/selectors";

export const sendMsg=createAsyncThunk("sendMsg",async(body, thunkAPI)=>{
    
    const state = thunkAPI.getState();
  const user = getSelectedUser(state); 
    
try {
    const {data}=await api.post(`/api/message/send/${user._id}`, body);
    return data;
} catch (error) {
    return thunkAPI.rejectWithValue(error.message);
}
})


export const getMessages=createAsyncThunk("getMessages", async(_, thunkAPI)=>{
    const state = thunkAPI.getState();
    const user = getSelectedUser(state); 
    try {
        const {data}=await api.get(`/api/message/${user._id}`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})