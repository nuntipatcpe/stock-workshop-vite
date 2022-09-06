import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, Middleware } from "redux";
import thunk from "redux-thunk";

import { Provider, useDispatch } from "react-redux";
import { store } from "./Redux/reducers";

// import { store } from "./Redux/store";
// import reducers from "./Redux/reducers";
// import logger from "redux-logger";
// let middleware: Middleware[] = [thunk];
// if (import.meta.env.VITE_IS_PRODUCTION === "0") {
//   console.log(import.meta.env.VITE_IS_PRODUCTION);
//   middleware.push(logger);
// }
// export const store = createStore(reducers, applyMiddleware(...middleware));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
