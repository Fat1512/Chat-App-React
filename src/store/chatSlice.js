import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  chatHistory: {}, //cache fetched messages, key = chatRoomId
  currentChatId: null,
  visible: false,
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setVisible(state, action) {
      state.visible = action.payload;
    },
    setCurrentChatId(state, action) {
      state.currentChatId = action.payload;
    },
    setChatHistory(state, action) {
      state.chatHistory[action.payload.chatRoomId] = action.payload;
    },
  },
});

export const chatActions = chat.actions;

export default chat.reducer;
