import { createSlice } from "@reduxjs/toolkit"
import { getMe, loginThunk, logOutThunk, registerThunk } from "./operations";

const initialState={
    user:{
        fullName:"",
        email:"",
    },
    accessToken: "",
    isLoggedIn:false,

}

const slice=createSlice({
    name:'auth',
    initialState:initialState,
    extraReducers:builder=>{
        builder.addCase(registerThunk.fulfilled, (state,action)=>{
state.accessToken=action.payload.accessToken;
state.user.fullName=action.payload.user.fullName;
state.user.email=action.payload.user.email;
state.isLoggedIn=true;
        })
        
        .addCase(loginThunk.fulfilled, (state,action)=>{
            state.accessToken=action.payload.accessToken;
            state.user.fullName=action.payload.user.fullName;
            state.user.email=action.payload.user.email;
            state.isLoggedIn=true;
                    })
                    .addCase(getMe.fulfilled, (state, action) => {
                        state.user.fullName = action.payload.fullName;
                        state.user.email = action.payload.email;
                        state.isLoggedIn = true;
                    })
        
        
               
                    .addCase(logOutThunk.fulfilled, (state,action)=>{
                        return initialState;
                                })
    }

})
export const authReducer=slice.reducer;