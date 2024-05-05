import { call, put, takeLatest } from "redux-saga/effects";
import { engagementActionCreator } from "../actions/engagement.action";
import {
  addCommentAPI,
  getBlogAllCommentAPI,
} from "../service/engagement.service";
import { toast } from "react-toastify";
import { EngagementActions } from "../actions/engagement.action";

function* addComment(action: any): Generator<any, void, any> {
  console.log("SAGA ACTION==>", action);
  try {
    const data = yield call(addCommentAPI, action.payload);
    toast.success(data.message);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

function* getBlogAllComment(action: any): Generator<any, void, any> {
  try {
    const { setBlogComment } = action;
    const data = yield call(getBlogAllCommentAPI, action.payload);
    setBlogComment(data);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

export function* engagementSaga() {
  yield takeLatest(EngagementActions.ADD_COMMENT, addComment);
  yield takeLatest(EngagementActions.GET_BLOG_ALL_COMMENT, getBlogAllComment);
}
