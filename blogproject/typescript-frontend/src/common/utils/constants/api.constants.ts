export const USER_SIGNIN_API = "/pg/login";
export const USER_SIGNUP_API = "/pg/register";
export const FORGET_PASSWORD_API = "/pg/forget";
export const RESET_PASSWORD_API = (token: string) => `/pg/forget/${token}`;
export const VERIFY_EMAIL_API = (userID: string) => `/pg/verifyemail/${userID}`;

// All APIs for BLOGS
export const GET_BLOG_BY_ID_API = (blogID: string) => `/pg/blog/${blogID}`;
export const GET_ALL_BLOG_API = "/pg/blog";
export const ADD_BLOG_API = "/pg/blog";
export const BLOG_SEARCH_QUERY_API = "/pg/blog/search/bytag/";

// All APIs for Users
export const ALL_BLOG_OF_AUTHOR_API = (authorID: string) =>
  `/pg/blog/${authorID}/all`;

export const GET_USER_BASIC_INFO = "/pg/user/getalluserinfo/all";
export const VIEW_USER_PAGE_API = (userID: string) =>
  `/pg/user/profileview/${userID}`;

// All APIs for Categories
export const GET_ALL_CATEGORIES = "/pg/category";

// API for Notification
export const GET_ALL_NOTIFICATIONS = (userID: string) =>
  `"/pg/notification/${userID}/all"`;

// API to Follow a User
export const FOLLOW_USER = (userId: string) => `/pg/user/${userId}/follow`;

// API to Add a Blog
export const ADD_BLOG = "/pg/blog";

// API to Like a Blog
export const LIKE_BLOG = (blogID: string) => `pg/like/blog/${blogID}`;

// API to Get the details of user / account owner
export const GET_USER_OWN_DETAIL = (userID: string) => `pg/user/${userID}`;

// API to Edit the details of user / account owner
export const Edit_USER_OWN_DETAIL = (userID: string) => `pg/user/${userID}`;

// API to Edit the blog of by owner
export const UPDATE_BLOG_BY_ID_API = (blogID: string) => `/pg/blog/${blogID}`;

// API to Delete the blog of by owner
export const DELETE_BLOG_BY_ID_API = (blogID: string) => `/pg/blog/${blogID}`;
export const DELETE_USER_BY_ID_API = (userID: string) => `/pg/user/${userID}`;

// API to Add Comment to a blog
export const ADD_COMMENT_API = (blogID: string) => `/pg/comment/${blogID}`;

// API to Get all Comment of a blog
export const GET_BLOG_ALL_COMMENT_API = (blogID: string) =>
  `/pg/comment/${blogID}`;
