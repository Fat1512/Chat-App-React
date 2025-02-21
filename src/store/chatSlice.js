import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
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
    setIsLast(state, action) {
      state.chatHistory[state.currentChatId].isLast = action.payload.isLast;
    },
    updatePaginationMessageHistory(state, action) {
      const currentState = current(state);
      const updateMessages = action.payload.content;
      state.chatHistory[currentState.currentChatId].last = action.payload.last;
      state.chatHistory[currentState.currentChatId].page = action.payload.page;

      for (let i = updateMessages.length - 1; i >= 0; i--) {
        const currentMessageHistory = currentState.chatHistory[
          currentState.currentChatId
        ].messageHistory.find(
          (msgHistory) => msgHistory.day == updateMessages[i].day
        );
        if (currentMessageHistory) {
          state.chatHistory[currentState.currentChatId].messageHistory
            .find((msgHistory) => msgHistory.day == updateMessages[i].day)
            .messages.unshift(...updateMessages[i].messages);
        } else {
          state.chatHistory[currentState.currentChatId].messageHistory.unshift({
            day: updateMessages[i].day,
            messages: updateMessages[i].messages,
          });
        }
      }
    },
    appendMessageHistory(state, { payload }) {
      const currentState = current(state);
      //Check whether corresponding chatHistory has been loaded previously
      if (!currentState.chatHistory[payload.chatRoomId]) return;

      state.chatHistory[payload.chatRoomId].paddingOffset += 1;
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
    resetState(state, action) {
      state.chatHistory = {};
      state.currentChatId = null;
      state.visible = false;
    },
  },
});

export const chatActions = chat.actions;

export default chat.reducer;
// {
//   currentPage, size, isLast, paddingOffset;
// }
