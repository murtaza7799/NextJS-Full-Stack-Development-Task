import { types_user_signup } from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { user_signup } from "./authApi";

const data = {
    MessageCode:"",
    MessageDescription:""
};

const initialState = {
  data: data,
  isSignUp: false,
  loading: false,
  error: null,
};

export const user_signupAuth = createAsyncThunk(
  "auth/user_signup",
  async (userData: types_user_signup) => {
      const response = await user_signup(userData);
      console.log("response", response);
      return response;
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(user_signupAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(user_signupAuth.fulfilled, (state, action) => {
        state.loading = false;
        //leaving for now for the backend api 
        state.data.MessageCode = action.payload.data.MessageCode;
        state.data.MessageDescription = action.payload.data.MessageDescription;
        state.isSignUp = true
        state.error = null;
      })
      .addCase(user_signupAuth.rejected, (state, action) => {
        state.loading = false;
        // state.data.MessageCode = action.payload.data.MessageCode;
        // state.data.MessageDescription = action.payload.data.MessageDescription;
      });
  },
});


export default AuthSlice.reducer;