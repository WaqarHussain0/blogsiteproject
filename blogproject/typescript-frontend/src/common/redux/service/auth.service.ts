import instance from "../../utils/axios";

import * as apis from "../../utils/constants/api.constants";
export function userSignInAPI(payload: any) {
  return instance
    .post(apis.USER_SIGNIN_API, payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}
export function userSignUpAPI(payload: any) {
  return instance
    .post(apis.USER_SIGNUP_API, payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function userForgetPasswordAPI(payload: any) {
  return instance
    .post(apis.FORGET_PASSWORD_API, payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function userResetPasswordAPI(payload: any) {
  return instance
    .post(apis.RESET_PASSWORD_API(payload.token), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function userVerifyEmailAPI(payload: any) {
  return instance
    .patch(apis.VERIFY_EMAIL_API(payload.userID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}


export default instance;
