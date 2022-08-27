import axios from "axios";
import join from "url-join";
// import { config } from "process";
import {
  server,
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE,
} from "../Constants";

const inAbsoluteURLRegex = /^(?:\w+;)\/\//;

axios.interceptors.request.use(async (config: any) => {
  if (!inAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }
  config.timeout = 1000;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(JSON.stringify(error, undefined, 2));
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
