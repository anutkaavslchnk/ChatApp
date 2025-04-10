import { createSlice } from "@reduxjs/toolkit";

const initialState={

    socket:null,
    onlineUsers:[],
}
const socketSlice=createSlice({
    name:'socket',
    initialState:initialState,

    reducers:{
        setSocket:(state,action)=>{
            state.socket=action.payload;
        },
        clearSocket:(state)=>{
            if(state.socket){
                state.socket.disconnect();
                
            }
            state.socket=null;
            state.onlineUsers=[];
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload;
        }
    }
})

export const {setSocket, clearSocket,setOnlineUsers}=socketSlice.actions;


export const  socketReducer= socketSlice.reducer;