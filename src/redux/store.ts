import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import userSlice from "./user/userSlice";
import appSlice from "./app/appSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import blogSlice from "./blog/blogSlice";
//redux persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["app"],
};

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userSlice,
  app: appSlice,
  blog: blogSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
//redux store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
