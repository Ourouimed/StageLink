import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name : 'auth' ,
    initialState : {
        test : 10
    }
})

export default authSlice.reducer