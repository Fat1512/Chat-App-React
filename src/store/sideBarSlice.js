import { createSlice, current } from "@reduxjs/toolkit";
import { SIDEBAR } from "../utils/constants";

/**
 * SETTING, CONTACT, CHATLIST(default)
 */
const initialState = {
  currentActive: SIDEBAR.CHATLIST,
};

const sidebar = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setCurrentSidebar(state, action) {
      state.currentActive = action.payload;
    },
    resetState(state, action) {
      state.currentActive = SIDEBAR.CHATLIST;
    },
  },
});

export const sidebarActions = sidebar.actions;

export default sidebar.reducer;
