import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import toastReducer from "./features/toast/toastSlice";
import popupReducer from "./features/popup/popupSlice";
import entrepriseReducer from './features/entreprise/entrepriseSlice'

import etudiantReducer from './features/etudiant/etudiantSlice'

export const store = configureStore({
    reducer : {
        auth : authReducer,
        toast : toastReducer ,
        popup : popupReducer ,
        entreprise : entrepriseReducer , 
        etudiant : etudiantReducer
    }
})