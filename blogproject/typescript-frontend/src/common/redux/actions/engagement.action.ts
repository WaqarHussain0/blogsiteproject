export enum EngagementActions {
  LIKE_COMMENT = "LIKE_COMMENT",
  LIKE_BLOG = "LIKE_BLOG",
  ADD_COMMENT = "ADD_COMMENT",
  GET_BLOG_ALL_COMMENT = "GET_BLOG_ALL_COMMENT",
}

export const engagementActionCreator = {
  addComment: (data: any) => ({
    type: EngagementActions.ADD_COMMENT,
    payload: data,
  }),
  getBlogAllComment: (data: any, setBlogComment: any) => ({
    type: EngagementActions.GET_BLOG_ALL_COMMENT,
    payload: data,
    setBlogComment,
  }),
  likeBlog: (data: any) => ({
    type: EngagementActions.LIKE_BLOG,
    payload: data,
  }),
  likeComment: (data: any) => ({
    type: EngagementActions.LIKE_COMMENT,
    payload: data,
  }),
};
