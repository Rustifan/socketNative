import { LoginResponse } from "../../types/user";

export const SET_USER = "SET_USER";
export interface SetUser{
    type: typeof SET_USER;
    payload: LoginResponse | null;
}

export const SET_LOADING = "SET_LOADING";
export interface SetLoading{
    type: typeof SET_LOADING;
    payload: boolean;
}


export type UserDispatcherType = SetUser | SetLoading;