import { configureStore } from "@reduxjs/toolkit";
import chatListReducer from "./chatListSlice";
import chatReducer from "./chatSlice";
import contactReducer from "./contactSlice";
import profileReducer from "./profileSlice";
import sideBarReducer from "./sideBarSlice";
import testReducer from "./testSlice";
import videoCallReducer from "./videoCallSlice";
import modalReducer from "./modalSlide";

const store = configureStore({
  reducer: {
    chatListReducer,
    chatReducer,
    contactReducer,
    profileReducer,
    sideBarReducer,
    videoCallReducer,
    testReducer,
    modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
