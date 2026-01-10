import { createAsyncThunk, createSlice } from  "@reduxjs/toolkit";
import offreStageService from "./offreStageService";


export const createStage = createAsyncThunk('offres-stage/create' , async (data , thunkAPI)=>{
    try {
        return await offreStageService.createOffre(data)
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})


export const getAllByEntreprise = createAsyncThunk('offres-stage/getall-entreprise' , async (_ , thunkAPI)=>{
    try {
        return await offreStageService.getAllByEntreprise()
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})




export const getAllStages = createAsyncThunk('offres-stage/getall' , async (_ , thunkAPI)=>{
    try {
        return await offreStageService.getAll()
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})


export const ajouterCandidature = createAsyncThunk('offres-stage/candidature' , async (_ , thunkAPI)=>{
    try {
        return await offreStageService.getAll()
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})



export const offreStageSlice = createSlice({
    name : 'stage' ,
    initialState : {
        stages : [] ,
        isLoading : false
    },

    extraReducers : builder => builder
    // add new stage
    .addCase(createStage.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(createStage.fulfilled, (state , action)=>{
        state.stages.push(action.payload.stage)
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(createStage.rejected, (state , action)=>{
        state.isLoading = false
        console.log(action.payload)
    })


    // get all stages by entreprise
    .addCase(getAllByEntreprise.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(getAllByEntreprise.fulfilled, (state , action)=>{
        state.stages = action.payload.stages
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(getAllByEntreprise.rejected, (state , action)=>{
        state.isLoading = false
        console.log(action.payload)
    })


    // get all stages
    .addCase(getAllStages.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(getAllStages.fulfilled, (state , action)=>{
        state.stages = action.payload.stages
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(getAllStages.rejected, (state , action)=>{
        state.isLoading = false
        console.log(action.payload)
    })


   
})


export default offreStageSlice.reducer