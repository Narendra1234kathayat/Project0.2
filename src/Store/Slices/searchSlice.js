import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: ""
  },
  reducers: {
    setSearchData(state, action) {
      state.data = action.payload;
    },
    clearSearch(state) {
      state.data = "";
    }
  }
});

export const { setSearchData, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
