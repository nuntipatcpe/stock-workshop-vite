import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { OK, server, TOKEN } from "../../../Constants";
import { LoginResult } from "../../../types/authen.type";
import { User } from "../../../types/user.type";
import httpClient from "../../../utils/httpClient";

const initialState: LoginState = {
  isFetching: false,
  isError: false,
  result: null,
};

export interface LoginState {
  isFetching: boolean;
  isError: boolean;
  result: any;
}

export const setLoginAsync = createAsyncThunk(
  "counter1/setLoginAsync",
  async (user: User) => {
    try {
      const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
      console.log(result.data.token);
      if (result.data.result == OK) {
        localStorage.setItem(TOKEN, result.data.token!);
        alert("Login successfully");
        return result;
      } else {
        console.log("error");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  }
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(TOKEN);
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      setLoginAsync.fulfilled,
      (state: LoginState, { payload }) => {
        console.log(payload);
        state.isFetching = false;
        state.isError = false;
        state.result = payload;
      }
    );
    builder.addCase(
      setLoginAsync.rejected,
      (state: LoginState, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.result = payload;
      }
    );
    builder.addCase(setLoginAsync.pending, (state: LoginState, { payload }) => {
      state.isFetching = true;
      state.isError = false;
      state.result = payload;
    });
  },
});

export const { logout } = loginSlice.actions;
export const sliceSelect = (store: RootState) => store.loginReducer;
export default loginSlice.reducer;
