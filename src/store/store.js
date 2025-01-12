import { configureStore } from "@reduxjs/toolkit";
import chatListReducer from "./chatListSlice";
import chatReducer from "./chatSlice";
import contactReducer from "./contactSlice";
import profileReducer from "./profileSlice";
import sideBarReducer from "./sideBarSlice";
import testReducer from "./testSlice";

const store = configureStore({
  reducer: {
    chatListReducer,
    chatReducer,
    contactReducer,
    profileReducer,
    sideBarReducer,
    testReducer
  },
});

export default store;
