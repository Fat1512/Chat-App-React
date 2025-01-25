import { createSlice, current } from "@reduxjs/toolkit";
import { MODAL } from "../utils/constants";

const initialState = {
  currentModal: null,
  isActive: false,
};

const modal = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setCurrentModal(state, action) {
      state.currentModal = action.payload;
    },
    setIsActive(state, action) {
      state.isActive = action.payload;
    },
    resetState(state, action) {
      state.currentModal = null;
      state.isActive = false;
    },
  },
});

export const modalActions = modal.actions;

export default modal.reducer;

/**
 *
 * {
 *    caller: true or false
 *    localSignal:
 *    remoteSignal:
 * }
 *
 */
