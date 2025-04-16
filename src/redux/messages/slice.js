import { createSlice } from "@reduxjs/toolkit"
import { getMessages, sendMsg } from "./operations";


const initialValues={
messages:[],
    txt: "",
    image: null,

}

const messageSlice=createSlice({
    initialState: initialValues,
    name:'messages',
    reducers:{
        addMessage:(state,action)=>{
            state.messages.push(action.payload);
        },
    },
    extraReducers:builder=>{
builder.addCase(sendMsg.fulfilled,(state,action)=>{
    state.txt=action.payload.txt;
    state.messages.push(action.payload);
})
.addCase(getMessages.fulfilled,(state,action)=>{
    state.messages=action.payload;
})

}
})

export const {addMessage}=messageSlice.actions;
export const messageReducer=messageSlice.reducer;