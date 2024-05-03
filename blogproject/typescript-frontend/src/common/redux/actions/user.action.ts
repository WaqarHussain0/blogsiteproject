export enum UserActions {
  GET_USER_OWN_DETAIL = "GET_USER_OWN_DETAIL",
  EDIT_USER_OWN_DETAIL = "EDIT_USER_OWN_DETAIL",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
  GET_ALL_USER__BASIC_INFO = "GET_ALL_USER__BASIC_INFO",
  GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES",
  VIEW_USER_PAGE = "VIEW_USER_PAGE",
  GET_AUTHOR_ALL_BLOG = "GET_AUTHOR_ALL_BLOG",
  GET_NOTIFICATION = "GET_NOTIFICATION",
  FOLLOW_USER = "FOLLOW_USER",
  ADD_BLOG = "ADD_BLOG",
  LIKE_BLOG = "LIKE_BLOG",
}

export const userActionCreator = {
  getBasicInfo: (data: any, setUserBasicData: any, setIsLoading: any) => ({
    type: UserActions.GET_ALL_USER__BASIC_INFO,
    payload: data,
    setUserBasicData,
    setIsLoading,
  }),
  getCategories: (data: any, setCategoriesData: any, setIsLoading: any) => ({
    type: UserActions.GET_ALL_CATEGORIES,
    payload: data,
    setCategoriesData,
    setIsLoading,
  }),

  viewUserPage: (data: any, setUserPageData: any, setIsLoading: any) => ({
    type: UserActions.VIEW_USER_PAGE,
    payload: data,
    setUserPageData,
    setIsLoading,
  }),

  // viewAuthorAllBlog: (data: any, setUserBlogsData: any, setIsLoading: any) => ({
  //   type: UserActions.GET_AUTHOR_ALL_BLOG,
  //   payload: data,
  //   setUserBlogsData,
  //   setIsLoading,
  // }),

  viewNotification: (
    data: any,
    setNotificationData: any,
    setIsLoading: any
  ) => ({
    type: UserActions.GET_NOTIFICATION,
    payload: data,
    setNotificationData,
    setIsLoading,
  }),

  followUser: (data: any) => ({
    type: UserActions.FOLLOW_USER,
    payload: data,
  }),

  addBlog: (data: any) => ({
    type: UserActions.ADD_BLOG,
    payload: data,
  }),

  likeBlog: (data: any) => ({
    type: UserActions.LIKE_BLOG,
    payload: data,
  }),

  getUserOwnDetail: (data: any, setUserOwnDetails: any) => ({
    type: UserActions.GET_USER_OWN_DETAIL,
    payload: data,
    setUserOwnDetails,
  }),
  editUserOwnDetail: (data: any) => ({
    type: UserActions.EDIT_USER_OWN_DETAIL,
    payload: data,
  }),
  deleteAccount: (data: any) => ({
    type: UserActions.DELETE_ACCOUNT,
    payload: data,
  }),
};
