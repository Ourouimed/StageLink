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





export const getCandidatures = createAsyncThunk('etudiant/candidatures/get' , async (_, thunkAPI)=>{
  try {
    return await etudiantService.getCandidatures()
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})

export const getStages = createAsyncThunk('etudiant/stages/get' , async (_, thunkAPI)=>{
  try {
    return await etudiantService.getStages()
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})

const etudiantSlice = createSlice({
    name : 'etudiant' ,
    initialState : {
        profile : null , 
        isLoading : false ,
        candidatures : [],
        stages : []
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



    // get candidatures
    .addCase(getCandidatures.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(getCandidatures.fulfilled , (state , action)=>{
        state.candidatures = action.payload.candidatures
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(getCandidatures.rejected , (state )=>{
        state.candidatures = []
        state.isLoading = false
        console.log(null)
    }) 


     // get stages
    .addCase(getStages.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(getStages.fulfilled , (state , action)=>{
        state.stages = action.payload.stages
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(getStages.rejected , (state )=>{
        state.stages = []
        state.isLoading = false
        console.log(null)
    })
})



export default etudiantSlice.reducer
