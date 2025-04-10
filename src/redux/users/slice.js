import { createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "./operations"

const initialState={
allUsers:[],
selectedUser: null,
}
const slice=createSlice({
    name:'users',
    initialState,
    reducers:{
selectedUser:(state,action)=>{
    state.selectedUser=action.payload;
}
    },
    extraReducers:builder=>{
        builder
        .addCase(getAllUsers.fulfilled, (state, action)=>{
            state.allUsers = action.payload;
        })
    }
})
export const {selectedUser}=slice.actions;
export const usersReducer=slice.reducer;