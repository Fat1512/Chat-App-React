import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  age: 6,
};

const test = createSlice({
  name: "test",
  initialState,
  reducers: {
    increaseId(state, action) {
      state.age = state.age + 1;
    },
  },
});

export const testActions = test.actions;

export default test.reducer;
