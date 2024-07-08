import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Slices/todoSlice";
export const Store=configureStore({
    reducer:todoReducer
})