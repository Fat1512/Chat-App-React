import { createSlice, current } from "@reduxjs/toolkit";
import { VIDEOCALL_STATUS } from "../utils/constants";

const initialState = {
  caller: false,
  signal: null,
  currentChatRoomId: null,
  remoteCallerInfo: {},
  status: VIDEOCALL_STATUS.RINGING,
};

const videoCall = createSlice({
  name: "call",
  initialState: initialState,
  reducers: {
    setCaller(state, action) {
      state.caller = action.payload;
    },
    setSignal(state, action) {
      state.signal = action.payload;
    },
    setRequestSignal(state, action) {
      //Prevent the caller from consuming its call request to other users
      if (state.caller) return;
      state.signal = action.payload;
    },
    setCurrentChatRoomId(state, action) {
      state.currentChatRoomId = action.payload;
    },
    setRemoteCallerInfo(state, action) {
      state.remoteCallerInfo.name = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const videoCallActions = videoCall.actions;

export default videoCall.reducer;
