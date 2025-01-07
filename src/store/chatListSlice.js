import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  chatList: [],
};

const chatList = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    setChatList(state, action) {
      return {
        ...state,
        isLoading: false,
        chatList: action.payload,
      };
    },
  },
});

export const chatListActions = chatList.actions;

export default chatList.reducer;
