import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

export const getUsers = createAsyncThunk('users/get' , async (_ , thunkAPI)=>{
    try {
        return await adminService.getUsers();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})


export const changeStatus = createAsyncThunk('users/change-status' , async (data , thunkAPI)=>{
    try {
        return await adminService.changeUserStatus(data.id , data.blocked);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})

export const adminSlice = createSlice({
    name : 'admin' ,
    initialState : {
        users : [],
        isLoading : false
    },


    extraReducers : builder => builder
    // get all users 
    .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.isLoading = false;
    })
    .addCase(getUsers.rejected, (state) => {
        state.users = [];
        state.isLoading = false;
    })


    // change status (blocked/unblock)
    .addCase(changeStatus.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(changeStatus.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.isLoading = false;
    })
    .addCase(changeStatus.rejected, (state) => {
        state.users = [];
        state.isLoading = false;
    })
})

export default adminSlice.reducer