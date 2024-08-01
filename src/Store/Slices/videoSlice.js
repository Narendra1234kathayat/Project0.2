import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearSearch } from "./searchSlice";
import Cookies from "js-cookie";


export const Status = Object.freeze({
  idle: "IDLE",
  loading: "LOADING",
  error: "ERROR",
});

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    data: [],
    status: Status.idle,
  },
  reducers: {
    addVideos(state, action) {
      state.data = action.payload; // Set the entire videos array
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { addVideos, setStatus } = videoSlice.actions;
export default videoSlice.reducer;

// Thunks
export function fetchVideos() {
  return async function fetchVideosThunk(dispatch, getState) {
    console.log("aaa", Cookies.get('accessToken'));
    console.log(Cookies);
    try {

      dispatch(setStatus(Status.loading));
      const searchData = getState().search.data; // Correctly access search data
      //console.log(searchData);
      const requestOptions = {
        method: "GET",
        url: "https://backend-5h59.onrender.com/api/v1/videos",
        params: { query: searchData },
        withCredentials: true,
        headers: {
          Authorization: Cookies.get('accessToken')
        }
      };
      
      const res = await axios(requestOptions);
      // const res = await axios.get(`https://backend-5h59.onrender.com/api/v1/videos`, {
      //   params: { query: searchData },
      //   withCredentials: true,
      // });
      if (res.status === 200) {
        console.log('jhgfxd');
        console.log(res.data.data);
        const videos = res.data.data;
        dispatch(addVideos(videos));
        dispatch(setStatus(Status.idle));
      }
    } catch (error) {
      dispatch(setStatus(Status.error));
      console.log(error);
    }
  };
}
