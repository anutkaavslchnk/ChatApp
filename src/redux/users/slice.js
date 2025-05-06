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
},
clearSelectedUser: (state) => {
    state.selectedUser = null;
  },
    },
    extraReducers:builder=>{
        builder
        .addCase(getAllUsers.fulfilled, (state, action)=>{
            state.allUsers = action.payload;
        })
    }
})
export const {selectedUser,clearSelectedUser}=slice.actions;
export const usersReducer=slice.reducer;