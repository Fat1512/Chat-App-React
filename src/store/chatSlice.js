import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
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
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    updateMessageHistory(state, { payload }) {
      const currentState = current(state);

      //Check whether corresponding chatHistory has been loaded previously
      if (!currentState.chatHistory[payload.chatRoomId]) return;

      //Check if today message obj has been created
      const currentHistory = currentState.chatHistory[
        payload.chatRoomId
      ].messageHistory.find((msgHistory) => msgHistory.day == payload.today);
      if (currentHistory) {
        state.chatHistory[payload.chatRoomId].messageHistory
          .find((msgHistory) => msgHistory.day == payload.today)
          .messages.push(payload.message);
      } else {
        state.chatHistory[payload.chatRoomId].messageHistory.push({
          day: payload.today,
          messages: [payload.message],
        });
      }
    },
  },
});

export const chatActions = chat.actions;

export default chat.reducer;
