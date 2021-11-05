import { Dispatch } from "redux";
import agent from "../../agent";
import { LoginResponse, UserLogin, UserRegistration } from "../../types/user";
import { SetLoading, SET_LOADING, UserDispatcherType } from "./userActionTypes";
import { SetUser, SET_USER } from "./userActionTypes";

export const setUser = (user: LoginResponse | null): SetUser => ({
  type: SET_USER,
  payload: user,
});

export const setUserLoading = (loading: boolean): SetLoading => ({
  type: SET_LOADING,
  payload: loading,
});

export const logout = (): SetUser => ({
    type: SET_USER,
    payload: null
})

export const login =
  (userLogin: UserLogin) => async (dispatch: Dispatch<UserDispatcherType>) => {
    dispatch(setUserLoading(true));
    try {
      const loginResponse = await agent.users.login(userLogin);
      dispatch(setUser(loginResponse));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setUserLoading(false));
    }
  };

export const register =
  (userRegister: UserRegistration) =>
  async (dispatch: Dispatch<UserDispatcherType>) => {
    dispatch(setUserLoading(true));
    try {
      const userResponse = await agent.users.register(userRegister);
      dispatch(setUser(userResponse));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setUserLoading(false));
    }
  };
