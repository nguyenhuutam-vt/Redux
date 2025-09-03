import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import userSlice from "./user/userSlice";
import appSlice from "./app/appSlice";
//redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice,
    app: appSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
