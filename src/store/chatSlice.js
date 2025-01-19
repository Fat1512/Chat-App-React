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
      console.log("current state", currentState);
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
    markAsReadMessages(state, action) {
      const chatRoomId = action.payload.chatRoomId;
      const senderId = action.payload.senderId;

      if (!state.chatHistory[chatRoomId]) return;

      state.chatHistory[chatRoomId].messageHistory = state.chatHistory[
        chatRoomId
      ]?.messageHistory.map((msgHistory) => ({
        ...msgHistory,
        messages: msgHistory.messages.map((msg) => ({
          ...msg,
          unreadMembersId: msg.unreadMembersId.filter((id) => id !== senderId),
          unreadMembersId: msg.undeliveredMembersId.filter(
            (id) => id !== senderId
          ),
          readStatus:
            msg.unreadMembersId.filter((id) => id !== senderId).length === 0,
          deliveredStatus:
            msg.undeliveredMembersId.filter((id) => id !== senderId).length ===
            0,
        })),
      }));
    },
    markAsDeliveredMessages(state, action) {
      const chatRoomId = action.payload.chatRoomId;
      const senderId = action.payload.senderId;

      if (!state.chatHistory[chatRoomId]) return;

      state.chatHistory[chatRoomId].messageHistory = state.chatHistory[
        chatRoomId
      ]?.messageHistory.map((msgHistory) => ({
        ...msgHistory,
        messages: msgHistory.messages.map((msg) => ({
          ...msg,
          unreadMembersId: msg.undeliveredMembersId.filter(
            (id) => id !== senderId
          ),
          deliveredStatus:
            msg.undeliveredMembersId.filter((id) => id !== senderId).length ===
            0,
        })),
      }));
    },
  },
});

export const chatActions = chat.actions;

export default chat.reducer;
