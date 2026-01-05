import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import entrepriseService from "./entrepriseService";


export const updateProfile = createAsyncThunk('entreprise/update' , async (data, thunkAPI)=>{
  try {
    return await entrepriseService.updateProfile(data)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})



export const getProfile = createAsyncThunk('entreprise/get' , async (_, thunkAPI)=>{
  try {
    return await entrepriseService.getProfile(_)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


const entrepriseSlice = createSlice({
    name : 'entreprise' ,
    initialState : {
        profile : null , 
        isLoading : false
    },

    extraReducers : builder => builder
    // update profile
    .addCase(updateProfile.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(updateProfile.fulfilled , (state , action)=>{
        state.profile = action.payload.profile
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(updateProfile.rejected , (state )=>{
        state.profile = null
        state.isLoading = false
        console.log(null)
    })


    // get profile
    .addCase(getProfile.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(getProfile.fulfilled , (state , action)=>{
        state.profile = action.payload.profile
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(getProfile.rejected , (state )=>{
        state.profile = null
        state.isLoading = false
        console.log(null)
    })
})



export default entrepriseSlice.reducer
