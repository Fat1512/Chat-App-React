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
    setNewChatListFromAddedContact(state, action) {
      if (state.chatList[action.payload.chatRoomId]) return;
      state.chatList[action.payload.chatRoomId] = action.payload;
    },
    setCurrentChatRoomId(state, action) {
      state.currentChatItemId = action.payload;
    },
    setMode(state, action) {
      state.chatList[action.payload.chatRoomId].roomInfo.mode =
        action.payload.mode;
    },
    setOnlineStatus(state, action) {
      state.chatList[action.payload.chatRoomId].roomInfo.status =
        action.payload.status;
    },
    setLatestMessage(state, action) {
      state.chatList[action.payload.chatRoomId].lastestMessage =
        action.payload.latestMessage;
    },
    increaseUnreadMessageCount(state, action) {
      state.chatList[action.payload.chatRoomId].totalUnreadMessages += 1;
    },
    resetUnreadMessageCount(state, action) {
      state.chatList[action.payload.chatRoomId].totalUnreadMessages = 0;
    },
  },
});

export const chatListActions = chatList.actions;

export default chatList.reducer;
