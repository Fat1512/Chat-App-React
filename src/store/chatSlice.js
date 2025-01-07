import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  chatHistory: {}, //cache fetched messages, key = chatRoomId
  currentChat: null,
  visible: false,
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setVisible(state, action) {
      state.visible = action.payload;
    },
    setCurrentChat(state, action) {
      state.currentChat = action.payload;
    },
    setChatHistory(state, action) {
      state.chatHistory[action.payload.chatRoomId] = action.payload;
    },
  },
});

export const chatActions = chat.actions;

export default chat.reducer;
