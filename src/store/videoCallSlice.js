import { createSlice, current } from "@reduxjs/toolkit";
import { VIDEOCALL_STATUS } from "../utils/constants";

const initialState = {
  caller: false,
  signal: null,
  currentChatRoomId: null,
  remoteCallerInfo: {},
  currentRequestCaller: null, //To get current request caller for latter setting peer connection
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
    setCurrentChatRoomId(state, action) {
      state.currentChatRoomId = action.payload;
    },
    setRemoteCallerInfo(state, action) {
      state.remoteCallerInfo[action.payload.callerId] = action.payload;
    },
    removePeerConnecton(state, action) {
      delete state.remoteCallerInfo[action.payload];
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCurrentRequestCaller(state, action) {
      state.currentRequestCaller = action.payload;
    },
    setRequestCaller(state, action) {
      if (state.caller == action.payload.callerId) return;
      state.signal = action.payload.rtcSignal;
      state.remoteCallerInfo[action.payload.callerId] = action.payload;
      state.currentRequestCaller = action.payload.callerId;
      state.currentChatRoomId = action.payload.chatRoomId;
    },
    resetState(state, action) {
      state.caller = false;
      state.signal = null;
      state.currentChatRoomId = null;
      state.remoteCallerInfo = {};
      state.currentRequestCaller = null;
      state.status = VIDEOCALL_STATUS.RINGING;
    },
    removeAllPeerConnection(state, action) {
      state.remoteCallerInfo = {};
    },
  },
});

export const videoCallActions = videoCall.actions;

export default videoCall.reducer;
