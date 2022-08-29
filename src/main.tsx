import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, Middleware } from "redux";

import thunk from "redux-thunk";
import { Provider, useDispatch } from "react-redux";
import reducers from "./reducers";
import logger from "redux-logger";

let middleware: Middleware[] = [thunk];
if (true) {
  // middleware.push(logger);
}
// export let navigate = useNavigate();
export const store = createStore(reducers, applyMiddleware(...middleware));
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<any>();
