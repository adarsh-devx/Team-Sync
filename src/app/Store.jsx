import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth/AuthSlice";
import { ThemeSlice } from "../shared/state/ThemeSlice";

export let store = configureStore({
    reducer:{
        auth: authReducer ,
        theme: ThemeSlice.reducer,
    }
})