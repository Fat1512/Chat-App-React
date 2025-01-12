import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  profile: {},
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setVisible(state, action) {
      state.visible = action.payload;
    },
  },
});

export const profileActions = profile.actions;

export default profile.reducer;
