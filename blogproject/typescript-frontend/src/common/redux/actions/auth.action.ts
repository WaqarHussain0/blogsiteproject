export enum AuthActions {
  USER_SIGN_IN = "USER_SIGN_IN",
  USER_SIGN_UP = "USER_SIGN_UP",
  USER_FORGET_PASSWORD = "USER_FORGET_PASSWORD",
  USER_RESET_PASSWORD = "USER_RESET_PASSWORD",
  USER_VERIFY_EMAIL = "USER_VERIFY_EMAIL",
}
export const authActionCreator = {
  userSignIn: (data: any) => ({
    type: AuthActions.USER_SIGN_IN,
    payload: data,
  }),

  userSignUp: (data: any) => ({
    type: AuthActions.USER_SIGN_UP,
    payload: data,
  }),

  userForgetPassword: (data: any) => ({
    type: AuthActions.USER_FORGET_PASSWORD,
    payload: data,
  }),

  userResetPassword: (data: any) => ({
    type: AuthActions.USER_RESET_PASSWORD,
    payload: data,
  }),
  userVerifyEmail: (data: any) => ({
    type: AuthActions.USER_VERIFY_EMAIL,
    payload: data,
  }),
};
