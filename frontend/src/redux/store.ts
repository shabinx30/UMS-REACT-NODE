import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: { token: string | null; user: any } = {
  token: null,
  user: null,
};

const user = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action) => {
      (state.token = action.payload.token), (state.user = action.payload.user);
    },
    logout: (state) => {
      (state.token = null), (state.user = null);
    },
  },
});


// const middle = (store: any) => (next: any) => (action: any) => {
//   console.log(action, "it is action ");
//   return next(action)
// };

const store = configureStore({
  reducer: {
    auth: user.reducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(middle);
  // },
});

export type RootState = ReturnType<typeof store.getState>;

export const { login, logout } = user.actions;
export default store;
