import { UserActions } from "../actions/user.action";
import { Reducer } from "redux";
const initialState = {
  data: [],
};
const userReducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UserActions.GET_USER_OWN_DETAIL:
    case UserActions.EDIT_USER_OWN_DETAIL:
    case UserActions.DELETE_ACCOUNT:
    case UserActions.GET_ALL_USER__BASIC_INFO:
    case UserActions.VIEW_USER_PAGE:
    case UserActions.GET_ALL_CATEGORIES:
    case UserActions.GET_AUTHOR_ALL_BLOG:
    case UserActions.GET_NOTIFICATION:
    case UserActions.FOLLOW_USER:
    case UserActions.ADD_BLOG:
    case UserActions.LIKE_BLOG:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};
export default userReducer;
