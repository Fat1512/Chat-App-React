import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});

export const profileActions = profile.actions;

export default profile.reducer;
