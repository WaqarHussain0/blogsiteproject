import { BlogActions } from "../actions/blog.action";
import { Reducer } from "redux";
const initialState = {
  data: [],
};
const blogReducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BlogActions.GET_BLOG:
    case BlogActions.GET_BLOG_BY_ID:
    case BlogActions.POST_BLOG:
    case BlogActions.DELETE_BLOG_BY_ID:
    case BlogActions.EDIT_BLOG_BY_ID:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};
export default blogReducer;
