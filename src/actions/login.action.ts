// import { useHistory } from "react-router-dom";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  OK,
  LOGIN_FAILED,
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  server,
  TOKEN,
  LOGOUT,
} from "../Constants";
import { LoginResult } from "../types/authen.type";
import { User } from "../types/user.type";
import httpClient from "../utils/httpClient";
// rxaction createtor
export const setLoginFetchingToState = () => ({
  type: LOGIN_FETCHING,
});

export const setRegisterSuccessToState = (payload: LoginResult) => ({
  type: LOGIN_SUCCESS,
  payload,
});
export const setRegisterFailedToState = () => ({
  type: LOGIN_FAILED,
});
export const setLogoutToState = () => ({
  type: LOGOUT,
});

//Asynchronous with  redux thunk
export const login = (user: User, navigate: NavigateFunction) => {
  return async (dispath: any) => {
    try {
      //begin connecting...
      dispath(setLoginFetchingToState());

      const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
      // console.log("user", result.data.result);
      if (result.data.result === OK) {
        localStorage.setItem(TOKEN, result.data.token!);
        dispath(setRegisterSuccessToState(result.data));
        alert("Login successfully");
        navigate("/stock");
      } else {
        dispath(setRegisterFailedToState());
      }
      //connecting...
    } catch (err) {
      dispath(setRegisterFailedToState());
    }
  };
};

export const restoreLogin = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      dispatch(
        setRegisterSuccessToState({
          result: OK,
          token,
          message: "Login successfully",
        })
      );
    }
  };
};

export const logout = (navigate: NavigateFunction) => {
  return (dispatch: any) => {
    localStorage.removeItem(TOKEN);
    dispatch(setLogoutToState());
    alert("logout successfully");
    navigate("/login");
  };
};
