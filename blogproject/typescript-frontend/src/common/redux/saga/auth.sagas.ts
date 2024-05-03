import { call, takeLatest } from "redux-saga/effects";
import { AuthActions } from "../actions/auth.action";
import {
  userSignInAPI,
  userSignUpAPI,
  userForgetPasswordAPI,
  userResetPasswordAPI,
  userVerifyEmailAPI,
} from "../service/auth.service";


import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function* userSignIn(action: any): Generator<any, void, any> {
  try {
    const data = yield call(userSignInAPI, action.payload);
    toast.success(data.message);

    localStorage.setItem("Access Token", data.token);
    localStorage.setItem("User Image", data.profilePic);

    const decodeToken: any = jwtDecode(data.token);
    const userID = decodeToken.userID;

    localStorage.setItem("userID", userID);
    
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

function* userSignUp(action: any): Generator<any, void, any> {
  try {
    const data = yield call(userSignUpAPI, action.payload);
    toast.success(data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

function* userForgetPassword(action: any): Generator<any, void, any> {
  try {
    const data = yield call(userForgetPasswordAPI, action.payload);
    toast.info(data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

function* userResetPassword(action: any): Generator<any, void, any> {
  try {
    const data = yield call(userResetPasswordAPI, action.payload);
    toast.info(data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

function* userVerifyEmail(action: any): Generator<any, void, any> {
  try {
    const data = yield call(userVerifyEmailAPI, action.payload);
    toast.info(data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

export function* authSaga() {
  yield takeLatest(AuthActions.USER_SIGN_IN, userSignIn);
  yield takeLatest(AuthActions.USER_SIGN_UP, userSignUp);
  yield takeLatest(AuthActions.USER_FORGET_PASSWORD, userForgetPassword);
  yield takeLatest(AuthActions.USER_RESET_PASSWORD, userResetPassword);
  yield takeLatest(AuthActions.USER_VERIFY_EMAIL, userVerifyEmail);
}
