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
    return await entrepriseService.getProfile()
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const getCandidats = createAsyncThunk('entreprise/candidats/get' , async (_, thunkAPI)=>{
  try {
    return await entrepriseService.getCandidats()
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})



export const getEncadrants = createAsyncThunk('entreprise/encadrants/get' , async (_, thunkAPI)=>{
  try {
    return await entrepriseService.getEncadrants()
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})




export const addEncadrant = createAsyncThunk('entreprise/encadrants/add' , async (id, thunkAPI)=>{
  try {
    return await entrepriseService.addEncadrant(id)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})



export const declineCandidature = createAsyncThunk('entreprise/candidature/decline' , async (id, thunkAPI)=>{
  try {
    return await entrepriseService.declineCandidature(id)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const acceptCandidature = createAsyncThunk('entreprise/candidature/accept' , async (data, thunkAPI)=>{
  try {
    return await entrepriseService.acceptCandidature(data.id , data.encadrant)
  }
  catch (err){
    console.log(err)
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})




const entrepriseSlice = createSlice({
    name : 'entreprise' ,
    initialState : {
        profile : null , 
        isLoading : false , 
        candidats : [] ,
        encadrants : []
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



     // get candidates
    .addCase(getCandidats.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(getCandidats.fulfilled , (state , action)=>{
        state.candidats = action.payload.candidats
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(getCandidats.rejected , (state )=>{
        state.candidats = []
        state.isLoading = false
        console.log(null)
    })


    // get encadrants
    .addCase(getEncadrants.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(getEncadrants.fulfilled , (state , action)=>{
        state.encadrants = action.payload.encadrants
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(getEncadrants.rejected , (state )=>{
        state.encadrants = []
        state.isLoading = false
        console.log(null)
    })



     // add encadrant
    .addCase(addEncadrant.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(addEncadrant.fulfilled , (state , action)=>{
        state.encadrants.push(action.payload.encadrant)
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(addEncadrant.rejected , (state )=>{
        state.isLoading = false
        console.log(null)
    })


     // accept candidature
    .addCase(acceptCandidature.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(acceptCandidature.fulfilled , (state , action)=>{
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(acceptCandidature.rejected , (state )=>{
        state.isLoading = false
        console.log(null)
    })


    // decline candidature
    .addCase(declineCandidature.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(declineCandidature.fulfilled , (state , action)=>{
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(declineCandidature.rejected , (state )=>{
        state.isLoading = false
        console.log(null)
    })
})



export default entrepriseSlice.reducer
