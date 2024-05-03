import { combineReducers } from "redux";
import AdminReducer from "./admin.reducer";
import AuthReducer from "./auth.reducer";
import BlogReducer from "./blog.reducer";
import EngagementReducer from "./engagement.reducer";
import UserReducer from "./user.reducer";

const globalRootReducer = combineReducers({
  AdminReducer: AdminReducer,
  Auth: AuthReducer,
  BlogReducer: BlogReducer,
  EngagementReducer: EngagementReducer,
  UserReducer: UserReducer,
});
export default globalRootReducer;
