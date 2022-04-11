import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import informationReducer from "./information";
import providerReducer from "./provider";

const store = configureStore({
  reducer: {
    information: informationReducer,
    provider: providerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export default store;
