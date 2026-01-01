import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./authService";



export const registerUser = createAsyncThunk('auth/register' , async (user , thunkAPI)=>{
  try {
    return await authService.register(user)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})

export const authSlice = createSlice({
    name : 'auth' ,
    initialState : {
        user : null , 
        isLoading : false 
    },
    extraReducers : builder => {
    builder
    // register 
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload)
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null
      console.log(action.payload)
    })

    }
})

export default authSlice.reducer