import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Slices/todoSlice";
import searchReducer from "./Slices/searchSlice";
import videosReducer from "./Slices/videoSlice";
import userReducer from "./Slices/userSlice";
export const Store=configureStore({
    reducer: {
        todo: todoReducer,
        search: searchReducer,
        videos:videosReducer,
        user:userReducer
      }

})