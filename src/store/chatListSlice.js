import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  chatList: [],
  currentChatItemId: null, //chatRoomId
};

const chatList = createSlice({
  name: "chatList",
  initialState: initialState,
  reducers: {
    setChatList(state, action) {
      state.chatList = action.payload;
      state.isLoading = false;
    },
    setCurrentChatRoomId(state, action) {
      state.currentChatItemId = action.payload;
    },
  },
});

export const chatListActions = chatList.actions;

export default chatList.reducer;
