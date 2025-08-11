import { createSlice } from "@reduxjs/toolkit";
import { getConversationSummariesList } from "./operations";

const initialValues = {
  summaries: {},
  isLoading: false,
  isError: null,
};

const slice = createSlice({
  initialState: initialValues,
  name: "conversation",
  reducers: {
    updateSummary: (state, action) => {
      const msg = action.payload;

      const contactId =
        msg.senderId === msg.currentUserId ? msg.receiverId : msg.senderId;

      if (!state.summaries[contactId]) {
        state.summaries[contactId] = {
          lastMessage: msg,
        };
      } else {
        state.summaries[contactId].lastMessage = msg;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversationSummariesList.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getConversationSummariesList.fulfilled, (state, action) => {
        state.isLoading = false;
        const map = {};

        action.payload.forEach((item) => {
          map[item.userId] = {
            lastMessage: item.lastMessage,
          };
        });
        console.log("Payload in fulfilled:", action.payload);
        state.summaries = map;
      })
      .addCase(getConversationSummariesList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});
export const { updateSummary } = slice.actions;
export const conversationReducer = slice.reducer;
