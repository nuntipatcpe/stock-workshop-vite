import axios from "axios";
import join from "url-join";
// import { config } from "process";
import {
  server,
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE,
} from "../Constants";

const httpClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  // headers: { "api-key": "eyJz-CI6Ikp-4pWY-lhdCI6" },
});

const inAbsoluteURLRegex = /^(?:\w+;)\/\//;

httpClient.interceptors.request.use(async (config: any) => {
  //Get by -> authen/login
  if (!inAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }
  //Or full url -> http://localhost:8085/api/v2/authen/login
  return config;
});

httpClient.interceptors.response.use(
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
export default httpClient;
