import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import encadrantService from "./encadrantService";


export const getProfile = createAsyncThunk('encadrant/get' , async (_, thunkAPI)=>{
  try {
    return await encadrantService.getProfile()
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})

export const encadrantSlice = createSlice({
    name : 'encadrant' ,
    initialState : {
        profile : null , 
        isLoading : false
    },

    extraReducers : builder => builder
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


export default encadrantSlice.reducer