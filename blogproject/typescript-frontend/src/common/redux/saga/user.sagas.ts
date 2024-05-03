import { call, takeEvery, takeLatest } from "redux-saga/effects";
import { UserActions } from "../actions/user.action";
import {
  getUserBasicInfoAPI,
  getAllCategoriesAPI,
  viewUserPageAPI,
  // viewUserAllBlogAPI,
  viewNotificationAPI,
  followUserAPI,
  addBlogAPI,
  likeBlogAPI,
  viewUserOwnDetailAPI,
  editUserOwnDetailAPI,
  deleteUserOwnAccountAPI
} from "../service/user.service";
import { toast } from "react-toastify";

function* getAllUserBasicInfo(action: any): Generator<any, void, any> {
  try {
    const { setUserBasicData, setIsLoading } = action;
    const data = yield call(getUserBasicInfoAPI, action.payload);
    setUserBasicData(data);
    setIsLoading(false);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

function* getAllCategories(action: any): Generator<any, void, any> {
  try {
    const { setCategoriesData, setIsLoading } = action;
    const data = yield call(getAllCategoriesAPI, action.payload);
    setCategoriesData(data);
    setIsLoading(false);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

function* viewUserPage(action: any): Generator<any, void, any> {
  try {
    const { setUserPageData, setIsLoading } = action;
    const data = yield call(viewUserPageAPI, action.payload);
    setUserPageData(data);
    setIsLoading(false);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

// function* viewAuthorAllBlog(action: any): Generator<any, void, any> {
//   try {
//     const { setUserBlogsData, setIsLoading } = action;
//     const data = yield call(viewUserAllBlogAPI, action.payload);
//     setUserBlogsData(data);
//     setIsLoading(false);
//   } catch (error: any) {
//     console.log(error.response.data.message);
//   }
// }

function* viewNotification(action: any): Generator<any, void, any> {
  try {
    const { setNotificationData, setIsLoading } = action;
    const data = yield call(viewNotificationAPI, action.payload);
    setNotificationData(data);
    setIsLoading(false);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

function* followUser(action: any): Generator<any, void, any> {
  try {
    yield call(followUserAPI, action.payload);
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

function* addBlog(action: any): Generator<any, void, any> {
  try {
    const data = yield call(addBlogAPI, action.payload);
    toast.success(data.message);
  } catch (error: any) {
    toast.error(error.response.data);
  }
}

function* likeBlog(action: any): Generator<any, void, any> {
  try {
    const data = yield call(likeBlogAPI, action.payload);
    toast.success(data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

function* getUserOwnDetail(action: any): Generator<any, void, any> {
  try {
    const { setUserOwnDetails } = action;
    const data = yield call(viewUserOwnDetailAPI, action.payload);
    setUserOwnDetails(data);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

function* editUserOwnDetail(action: any): Generator<any, void, any> {
  try {
    // const {setUserOwnDetails} = action;
    yield call(editUserOwnDetailAPI, action.payload);
    // setUserOwnDetails(data)
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}


function* deleteUserOwnAccount(action: any): Generator<any, void, any> {
  try {
    // const {setUserOwnDetails} = action;
    yield call(deleteUserOwnAccountAPI, action.payload);
    // setUserOwnDetails(data)
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

export function* userSaga() {
  yield takeLatest(UserActions.GET_ALL_USER__BASIC_INFO, getAllUserBasicInfo);
  yield takeLatest(UserActions.GET_ALL_CATEGORIES, getAllCategories);
  yield takeLatest(UserActions.VIEW_USER_PAGE, viewUserPage);
  // yield takeLatest(UserActions.GET_AUTHOR_ALL_BLOG, viewAuthorAllBlog);
  yield takeLatest(UserActions.GET_NOTIFICATION, viewNotification);
  yield takeLatest(UserActions.FOLLOW_USER, followUser);
  yield takeLatest(UserActions.ADD_BLOG, addBlog);
  yield takeLatest(UserActions.LIKE_BLOG, likeBlog);
  yield takeLatest(UserActions.GET_USER_OWN_DETAIL, getUserOwnDetail);
  yield takeLatest(UserActions.EDIT_USER_OWN_DETAIL, editUserOwnDetail);
  yield takeLatest(UserActions.DELETE_ACCOUNT, deleteUserOwnAccount);
}
