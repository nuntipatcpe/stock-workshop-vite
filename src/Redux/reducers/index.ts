import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import loginReducer, { LoginState } from "./login.reducer";
import stockReducer, { StockState } from "./stock.reducer";
import stockEditReducer, { StockEditState } from "./stock.edit.reducer";

import logger from "redux-logger";
import { createStore, applyMiddleware, Middleware } from "redux";
import thunk from "redux-thunk";
import { useDispatch } from "react-redux";

export interface RootReducers {
  registerReducer: RegisterState;
  loginReducer: LoginState;
  stockReducer: StockState;
  stockEditReducer: StockEditState;
}

let middleware: Middleware[] = [thunk];
if (import.meta.env.VITE_IS_PRODUCTION === "0") {
  // console.log(import.meta.env.VITE_IS_PRODUCTION);
  // middleware.push(logger);
}

export const store = createStore(
  combineReducers({
    registerReducer,
    loginReducer,
    stockReducer,
    stockEditReducer,
  }),
  applyMiddleware(...middleware)
);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
