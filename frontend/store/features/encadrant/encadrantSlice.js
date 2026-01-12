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


export const updateProfile = createAsyncThunk('encadrant/update' , async (data, thunkAPI)=>{
  try {
    return await encadrantService.updateProfile(data)
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})



export const getEntreprises = createAsyncThunk('encadrant/entreprises/get' , async (_, thunkAPI)=>{
  try {
    return await encadrantService.getEntreprises()
  }
  catch (err){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})



export const acceptEntrepriseRequest = createAsyncThunk('encadrant/entreprises/accept' , async (id, thunkAPI)=>{
  try {
    return await encadrantService.acceptEntrepriseRequest(id)
  }
  catch (err){
    console.log(err)
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})




export const declineEntrepriseRequest = createAsyncThunk('encadrant/entreprises/decline' , async (id, thunkAPI)=>{
  try {
    return await encadrantService.declineEntrepriseRequest(id)
  }
  catch (err){
    console.log(err)
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const encadrantSlice = createSlice({
    name : 'encadrant' ,
    initialState : {
        profile : null , 
        entreprises : [],
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


    // get entreprises
      .addCase(getEntreprises.pending , (state)=>{
          state.isLoading = true
      })
      .addCase(getEntreprises.fulfilled , (state , action)=>{
          state.entreprises = action.payload.entreprises
          state.isLoading = false
          console.log(action.payload)
      })
      .addCase(getEntreprises.rejected , (state )=>{
          state.entreprises = []
          state.isLoading = false
          console.log(null)
      })



       // accept entreprise
      .addCase(acceptEntrepriseRequest.pending , (state)=>{
          state.isLoading = true
      })
      .addCase(acceptEntrepriseRequest.fulfilled , (state , action)=>{
          
          state.entreprises.map(e => {
            console.log(e.id_entreprise)
            console.log(action.payload.ids.entreprise_id)

            return e.id_entreprise === action.payload.ids.entreprise_id ? {...e , status : 'accepted'} : e
          })
          state.isLoading = false
          console.log(action.payload)
      })
      .addCase(acceptEntrepriseRequest.rejected , (state )=>{
          state.entreprises = []
          state.isLoading = false
          console.log(null)
      })


      // decline entreprise
      .addCase(declineEntrepriseRequest.pending , (state)=>{
          state.isLoading = true
      })
      .addCase(declineEntrepriseRequest.fulfilled , (state , action)=>{
          
          state.entreprises.map(e => {
            console.log(e.id_entreprise)
            console.log(action.payload.ids.entreprise_id)

            return e.id_entreprise === action.payload.ids.entreprise_id ? {...e , status : 'accepted'} : e
          })
          state.isLoading = false
          console.log(action.payload)
      })
      .addCase(declineEntrepriseRequest.rejected , (state )=>{
          state.entreprises = []
          state.isLoading = false
          console.log(null)
      })

      
})


export default encadrantSlice.reducer