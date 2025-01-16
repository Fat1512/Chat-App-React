import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  chatList: {},
  currentChatItemId: null, //chatRoomId
};

const chatList = createSlice({
  name: "chatList",
  initialState: initialState,
  reducers: {
    setChatList(state, action) {
      action.payload.forEach((chatItem) => {
        state.chatList[chatItem.chatRoomId] = chatItem;
      });
      state.isLoading = false;
    },
    setCurrentChatRoomId(state, action) {
      state.currentChatItemId = action.payload;
    },
    setMode(state, action) {
      state.chatList[action.payload.chatRoomId].userProfile.mode =
        action.payload.mode;
    },
  },
});

export const chatListActions = chatList.actions;

export default chatList.reducer;
