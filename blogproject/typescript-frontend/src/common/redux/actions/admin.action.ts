export enum AdminActions {
  ADMIN_SIGN_UP = "ADMIN_SIGN_UP",
  ADMIN_GET_USER = "ADMIN_GET_USER",
  ADMIN_DELETE_USER = "ADMIN_DELETE_USER",
  ADMIN_EDIT_USER_ROLE = "ADMIN_EDIT_USER_ROLE",
}

export const adminActionCreator = {
  
  adminSignUp: (data: any) => ({
    type: AdminActions.ADMIN_SIGN_UP,
    payload: data,
  }),
  adminGetUser: (data: any) => ({
    type: AdminActions.ADMIN_GET_USER,
    payload: data,
  }),
  adminDeleteUser: (data: any) => ({
    type: AdminActions.ADMIN_DELETE_USER,
    payload: data,
  }),
  adminEditUserRole: (data: any) => ({
    type: AdminActions.ADMIN_EDIT_USER_ROLE,
    payload: data,
  }),
};
