import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Slices/todoSlice";
import searchReducer from "./Slices/searchSlice"
export const Store=configureStore({
    reducer: {
        todo: todoReducer,
        search: searchReducer
      }

})