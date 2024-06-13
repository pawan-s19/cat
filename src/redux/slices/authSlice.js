import { createSlice } from "@reduxjs/toolkit";
import { getCookie, eraseCookie, setCookie } from "../../utils/cookie";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
      eraseCookie("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
