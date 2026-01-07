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


export const getAllStage = createAsyncThunk('offres-stage/getall' , async (_ , thunkAPI)=>{
    try {
        return await offreStageService.getAll(_)
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


    // get all stages
    .addCase(getAllStage.pending , (state)=>{
        state.isLoading = true
    })
    .addCase(getAllStage.fulfilled, (state , action)=>{
        state.stages = action.payload.stages
        state.isLoading = false
        console.log(action.payload)
    })
    .addCase(getAllStage.rejected, (state , action)=>{
        state.isLoading = false
        console.log(action.payload)
    })
})


export default offreStageSlice.reducer