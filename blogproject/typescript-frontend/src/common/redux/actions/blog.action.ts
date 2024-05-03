export enum BlogActions {
  GET_BLOG_BY_ID = "GET_BLOG_BY_ID",
  GET_BLOG = "GET_BLOG",
  POST_BLOG = "POST_BLOG",
  DELETE_BLOG_BY_ID = "DELETE_BLOG_BY_ID",
  EDIT_BLOG_BY_ID = "EDIT_BLOG_BY_ID",
}

export const blogActionCreator = {
  getBlog: (data: any, setIsLoading: any, setBlogData: any) => ({
    type: BlogActions.GET_BLOG,
    payload: data,
    setIsLoading,
    setBlogData,
  }),

  getBlogByID: (data: any, setBlogData: any) => ({
    type: BlogActions.GET_BLOG_BY_ID,
    payload: data,
    setBlogData,
  }),

  deleteBlogByID: (data: any) => ({
    type: BlogActions.DELETE_BLOG_BY_ID,
    payload: data,
  }),
  editBlog: (data: any) => ({
    type: BlogActions.EDIT_BLOG_BY_ID,
    payload: data,
  }),
};
