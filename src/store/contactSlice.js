import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  contactList: {},
  selectedContact: [],
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
    setSelectedContact(state, action) {
      const userId = action.payload;
      const currentState = current(state);
      const currentSelectedContact = currentState.selectedContact;
      state.selectedContact = currentSelectedContact.includes(userId)
        ? currentSelectedContact.filter((n) => n !== userId)
        : [...currentSelectedContact, userId];
    },
  },
});

export const contactActions = contact.actions;

export default contact.reducer;
