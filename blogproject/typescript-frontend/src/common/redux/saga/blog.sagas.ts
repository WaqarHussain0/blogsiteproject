import { call, takeLatest } from "redux-saga/effects";
// import * as types from "../actionType";
import { BlogActions } from "../actions/blog.action";
import {
  getAllBlogsAPI,
  getBlogbyIDAPI,
  updateBlogbyIDAPI,
  deleteBlogbyIDAPI,
} from "../service/blog.service";

function* getAllBlogs(action: any): Generator<any, void, any> {
  try {
    const { setIsLoading, setBlogData } = action;
    const data = yield call(getAllBlogsAPI, action.payload);
    localStorage.getItem("Access Token");
    setIsLoading(false);
    setBlogData(data.allblogs);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

function* getBlogByID(action: any): Generator<any, void, any> {
  try {
    const { setBlogData } = action;
    const data = yield call(getBlogbyIDAPI, action.payload);
    setBlogData(data);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

function* updateBlogByID(action: any): Generator<any, void, any> {
  try {
    yield call(updateBlogbyIDAPI, action.payload);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

function* deleteBlogByID(action: any): Generator<any, void, any> {
  try {
    yield call(deleteBlogbyIDAPI, action.payload);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

export function* blogSaga() {
  yield takeLatest(BlogActions.GET_BLOG, getAllBlogs);
  yield takeLatest(BlogActions.GET_BLOG_BY_ID, getBlogByID);
  yield takeLatest(BlogActions.EDIT_BLOG_BY_ID, updateBlogByID);
  yield takeLatest(BlogActions.DELETE_BLOG_BY_ID, deleteBlogByID);
}
