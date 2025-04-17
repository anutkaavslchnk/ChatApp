import { createSlice } from "@reduxjs/toolkit";

const initialState={

    socket:null,
    onlineUsers:[],
    typingUsers:[],
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
        },
        addTypingUser:(state, action)=>{
            if(!state.typingUsers.includes(action.payload)){
                state.typingUsers.push(action.payload)
            }
        },
        removeTypingUser:(state,action)=>{
            state.typingUsers=state.typingUsers.filter(
                (id)=>id!==action.payload
            )
        }
    }
})

export const {setSocket, clearSocket,setOnlineUsers,addTypingUser,removeTypingUser}=socketSlice.actions;


export const  socketReducer= socketSlice.reducer;