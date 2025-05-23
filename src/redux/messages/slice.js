import { createSlice } from "@reduxjs/toolkit"
import { deleteMessage, getMessages, sendMsg, updateDeliveredStatus, updateReadStatus } from "./operations";
import toast from "react-hot-toast";


const initialValues={
messages:[],
    txt: "",
    image: null,
isRead:false,
isDelivered:false,
}

const messageSlice=createSlice({
    initialState: initialValues,
    name:'messages',
    reducers:{
        addMessage:(state,action)=>{
            state.messages.push(action.payload);
            
        },
        setDeliveredLocal: (state, action) => {
            const idx = state.messages.findIndex(msg => msg._id === action.payload);
            if (idx !== -1) {
                state.messages[idx].isDelivered = true;
            }
        },
        setReadLocal: (state, action) => {
            const idx = state.messages.findIndex(msg => msg._id === action.payload);
            if (idx !== -1) {
                state.messages[idx].isRead = true;
            }
        },
       deleteLocal: (state, action) => {
      state.messages = state.messages.filter(msg => msg._id !== action.payload);
    }
  },
    extraReducers:builder=>{
builder.addCase(sendMsg.fulfilled,(state,action)=>{
    state.txt=action.payload.txt;
    state.messages.push(action.payload);
})
.addCase(getMessages.fulfilled,(state,action)=>{
    state.messages=action.payload;
})
.addCase(updateDeliveredStatus.fulfilled, (state,action)=>{
    const idx=state.messages.findIndex(msg=>msg._id===action.payload._id);
    if (idx!==-1){
        state.messages[idx].isDelivered=true;
    }
})

.addCase(updateReadStatus.fulfilled, (state,action)=>{
    const idx=state.messages.findIndex(msg=>msg._id===action.payload._id);
    if (idx!==-1){
        state.messages[idx].isRead=true;
    }
})
.addCase(deleteMessage.fulfilled,(state,action)=>{
    state.messages=state.messages.filter(item=>item.id!==action.payload);
    toast.success('Message is deleted!');
})

}
})

export const {addMessage,setDeliveredLocal, setReadLocal,deleteLocal}=messageSlice.actions;
export const messageReducer=messageSlice.reducer;