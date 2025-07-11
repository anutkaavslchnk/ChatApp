import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getConversationSummariesList = createAsyncThunk(
  'getSummariesList',
  async (userId, thunkAPI) => {
    try {
      const response = await api.get(`/api/conversation/summary/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);