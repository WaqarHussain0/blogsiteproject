import { EngagementActions } from "../actions/engagement.action";
import { Reducer } from "redux";
const initialState = {
  data: [],
};
const engagementReducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case EngagementActions.ADD_COMMENT:
    case EngagementActions.LIKE_BLOG:
    case EngagementActions.LIKE_COMMENT:
    case EngagementActions.GET_BLOG_ALL_COMMENT:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};
export default engagementReducer;
