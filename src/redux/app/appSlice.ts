import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
const initialState = {
  mode: "light",
};

export const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changMode(state, action) {
      state.mode = action.payload;
    },
  }, //thuc hien 1 funtion
});

// Action creators are generated for each case reducer function
export const { changMode } = appSlice.actions;

export default appSlice.reducer;
