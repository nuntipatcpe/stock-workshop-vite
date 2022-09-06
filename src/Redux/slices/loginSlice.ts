import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = {};

const loginSlice = createSlice({
  name: "",
  initialState: initialState,
  reducers: {},
});

export const {} = loginSlice.actions;
export const sliceSelect = (store: RootState) => store.loginReducer;
export default loginSlice.reducer;
