import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import etudiantService from "./etudiantService";


export const updateProfile = createAsyncThunk('etudiant/update' , async (data, thunkAPI)=>{
  try {
    return await etudiantService.updateProfile(data)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})



export const getProfile = createAsyncThunk('etudiant/get' , async (_, thunkAPI)=>{
  try {
    return await etudiantService.getProfile()
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


const etudiantSlice = createSlice({
    name : 'etudiant' ,
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



export default etudiantSlice.reducer
