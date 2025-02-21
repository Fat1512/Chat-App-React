import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  contactList: {},
};

const contact = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactList(state, action) {
      action.payload.forEach((contactItem) => {
        state.contactList[contactItem.chatRoomId] = {
          ...contactItem,
        };
      });
      state.isLoading = false;
    },
    setContact(state, action) {
      state.contactList[action.payload.chatRoomId] = action.payload;
    },
    removeContact(state, action) {
      const { chatRoomId } = action.payload;
      const currentState = current(state);
      if (currentState.contactList[chatRoomId]) {
        const newContactList = { ...currentState.contactList };
        delete newContactList[chatRoomId];
        state.contactList = newContactList;
      }
    },
    resetState(state, action) {
      state.isLoading = true;
      state.contactList = {};
    },
  },
});

export const contactActions = contact.actions;

export default contact.reducer;
