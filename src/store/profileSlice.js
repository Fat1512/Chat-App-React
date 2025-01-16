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
    setMode(state, action) {
      if (!state.profile[action.payload.chatRoomId]) return;
      state.profile[action.payload.chatRoomId].mode = action.payload.mode;
    },
  },
});

export const profileActions = profile.actions;

export default profile.reducer;
