import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const contact = createSlice({
  name: "contact",
  initialState,
  reducers: {},
});

export const contactActions = contact.actions;

export default contact.reducer;
