import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, logOutThunk, registerThunk } from "./operations";

const initialState={
    accessToken: "",
    isLoggedIn:false,
    
    
}

const slice=createSlice({
    name:'auth',
    initialState:initialState,
    extraReducers:builder=>{
        builder.addCase(registerThunk.fulfilled, (state,action)=>{
state.accessToken=action.payload.accessToken;
state.isLoggedIn=true;
        })
        
        .addCase(loginThunk.fulfilled, (state,action)=>{
            state.accessToken=action.payload.accessToken;
            state.isLoggedIn=true;
                    })
               
                    .addCase(logOutThunk.fulfilled, (state,action)=>{
                        return initialState;
                                })
    }

})
export const authReducer=slice.reducer;