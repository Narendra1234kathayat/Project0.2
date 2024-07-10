import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchuser: (state, action) => {
      state.data = action.payload; // Replace the data array with the new search result
    }
  }
});

export const { searchuser } = searchSlice.actions;
export default searchSlice.reducer;
