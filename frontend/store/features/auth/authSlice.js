import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";



export const registerUser = createAsyncThunk('auth/register' , async (user , thunkAPI)=>{
  try {
    return await authService.register(user)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const loginUser = createAsyncThunk('auth/login' , async (user , thunkAPI)=>{
  try {
    return await authService.login(user)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const verifyEmail = createAsyncThunk('auth/verify-email' , async ({email , otp} , thunkAPI)=>{
  try {
    return await authService.verifyEmail(email , otp)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})

export const verifySession = createAsyncThunk('auth/verify-session' , async (_ , thunkAPI)=>{
  try {
    return await authService.verifySession()
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})

export const logout = createAsyncThunk('auth/logout' , async (_ , thunkAPI)=>{
  try {
    return await authService.logout()
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const resendOtp = createAsyncThunk('auth/resend-otp' , async (email , thunkAPI)=>{
  try {
    return await authService.resendOtp(email)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})

export const authSlice = createSlice({
    name : 'auth' ,
    initialState : {
        user : null , 
        isLoading : false  ,
        isInitialized: false
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



    // Login 
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data
      console.log(action.payload)
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null
    })

    // verify email
    .addCase(verifyEmail.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(verifyEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload)
    })
    .addCase(verifyEmail.rejected, (state, action) => {
      state.isLoading = false;
    })


    // verify Session
    .addCase(verifySession.pending, (state) => {
      state.isLoading = true
    })
    .addCase(verifySession.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload)
      state.user = action.payload.data
       state.isInitialized = true;
    })
    .addCase(verifySession.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null
      state.isInitialized = true;
    })

    // Log out 
    .addCase(logout.pending, (state) => {
      state.isLoading = true
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload)
      state.user = null
    })
    .addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null
    })



    // Resend Otp 
    .addCase(resendOtp.pending, (state) => {
      state.isLoading = true
    })
    .addCase(resendOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload)
    })
    .addCase(resendOtp.rejected, (state, action) => {
      state.isLoading = false;
    })
    }
})

export default authSlice.reducer