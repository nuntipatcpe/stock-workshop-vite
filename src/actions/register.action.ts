// import { useHistory } from "react-router-dom";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  OK,
  REGISTER_FAILED,
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
  server,
} from "../Constants";
import { User } from "../types/user.type";
import httpClient from "../utils/httpClient";
// rxaction
export const setReisterFetchingToState = () => ({
  type: REGISTER_FETCHING,
});

export const setRegisterSuccessToState = (payload: any) => ({
  type: REGISTER_SUCCESS,
  payload,
});
export const setRegisterFailedToState = () => ({
  type: REGISTER_FAILED,
});

//Asynchronous with  redux thunk
export const register = (user: User, navigate: NavigateFunction) => {
  return async (dispath: any) => {
    try {
      //begin connecting...
      dispath(setReisterFetchingToState());
      const result = await httpClient.post(server.REGISTER_URL, user);
      console.log("user", result.data.result);
      if (result.data.result === OK) {
        dispath(setRegisterSuccessToState(result.data));
        alert("Register success");
        navigate("/login");
      } else {
        dispath(setRegisterFailedToState());
      }
      //connecting...
    } catch (err) {
      dispath(setRegisterFailedToState());
    }
  };
};
