import { AdminActions } from "../actions/admin.action";
import { Reducer } from "redux";
const initialState = {
  data: [],
};
const userReducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AdminActions.ADMIN_SIGN_UP:
    case AdminActions.ADMIN_GET_USER:
    case AdminActions.ADMIN_EDIT_USER_ROLE:
    case AdminActions.ADMIN_DELETE_USER:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};
export default userReducer;
