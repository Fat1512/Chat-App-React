import { createSlice, current } from "@reduxjs/toolkit";
import { MODAL } from "../utils/constants";

const initialState = {
  currentModal: null,
  isActive: false,
  position: {}, //x = ...   y = ...
};

const modal = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setCurrentModal(state, action) {
      state.currentModal = action.payload;
      state.position = {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      };
    },
    setIsActive(state, action) {
      state.isActive = action.payload;
    },
    setPosition(state, action) {
      state.position = action.payload;
    },
    resetState(state, action) {
      state.currentModal = null;
      state.isActive = false;
      state.position = null;
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
