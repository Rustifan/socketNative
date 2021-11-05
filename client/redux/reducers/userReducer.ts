import { LoginResponse } from "../../types/user";
import {
  SET_LOADING,
  SET_USER,
  UserDispatcherType,
} from "../actions/userActionTypes";

interface DefaultState {
  user: LoginResponse | null;
  loading: boolean;
}

const defaultState: DefaultState = {
  user: null,
  loading: false,
};

const userReducer = (
  state: DefaultState = defaultState,
  action: UserDispatcherType
) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
