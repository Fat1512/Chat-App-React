import { configureStore } from "@reduxjs/toolkit";
import chatListReducer from "./chatListSlice";
import chatReducer from "./chatSlice";
import contactReducer from "./contactSlice";
import profileReducer from "./profileSlice";
import sideBarReducer from "./sideBarSlice";

const store = configureStore({
  reducer: {
    chatListReducer,
    chatReducer,
    contactReducer,
    profileReducer,
    sideBarReducer,
  },
});

export default store;
