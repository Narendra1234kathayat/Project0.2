import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: []
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    }
  }
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;

export function fetchUser(){
    return async function fetchuserThunk(dispatch,getState){
        try {
            const res = await axios.get(
                "https://backend-twff.onrender.com/api/v1/users/currentuser",
                { withCredentials: true }
              );
              if(res.status ===200){
                dispatch(setUser(res.data.data));
              }


            
        } catch (error) {
            console.log("Error fetching user details:", error.message);

            
        }

    }
}