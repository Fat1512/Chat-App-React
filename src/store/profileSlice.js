import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  profile: {},
  currentProfileId: null,
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile[action.payload.chatRoomId] = action.payload.userProfile;
    },
    setVisible(state, action) {
      state.visible = action.payload;
    },
    setCurrentProfileId(state, action) {
      state.currentProfileId = action.payload;
    },
  },
});

export const profileActions = profile.actions;

export default profile.reducer;
