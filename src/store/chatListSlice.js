import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];

const chatList = createSlice({
  name: "chatList",
  initialState,
  reducers: {},
});

export const chatListActions = chatList.actions;

export default chatList.reducer;
