import { AuthActions } from "../actions/auth.action";
import { Reducer } from "redux";
const initialState = {
  data: [],
};
const authReducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActions.USER_SIGN_IN:
    case AuthActions.USER_SIGN_UP:
    case AuthActions.USER_FORGET_PASSWORD:
    case AuthActions.USER_RESET_PASSWORD:
    case AuthActions.USER_VERIFY_EMAIL:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};
export default authReducer;
