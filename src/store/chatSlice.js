import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

export const chatActions = chat.actions;

export default chat.reducer;
