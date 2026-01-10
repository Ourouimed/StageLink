import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import candidatureService from "./candidatureService";




export const createCandidature = createAsyncThunk('candidature/create' , async (id_stage , thunkAPI)=>{
    try {
        return await candidatureService.createCandidature(id_stage)
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})

export const candidatureSlice = createSlice({
    name : 'candidature' ,
    initialState : {
        condidatures : [] ,
        isLoading : false
    },

    extraReducers : builder => builder
        // add new candidature
        .addCase(createCandidature.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(createCandidature.fulfilled, (state , action)=>{
            state.condidatures.push(action.payload.candidature)
            state.isLoading = false
            console.log(action.payload)
        })
        .addCase(createCandidature.rejected, (state , action)=>{
            state.isLoading = false
            console.log(action.payload)
        })
})


export default candidatureSlice.reducer