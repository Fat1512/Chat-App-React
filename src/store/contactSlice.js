import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const contactActions = contact.actions;

export default contact.reducer;
