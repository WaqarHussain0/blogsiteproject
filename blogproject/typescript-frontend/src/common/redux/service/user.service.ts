import instance from "../../utils/axios";

import * as apis from "../../utils/constants/api.constants";

export function getUserBasicInfoAPI(payload: any) {
  return instance
    .get(apis.GET_USER_BASIC_INFO, payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function getAllCategoriesAPI(payload: any) {
  return instance
    .get(apis.GET_ALL_CATEGORIES, payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function viewUserPageAPI(payload: any) {
  return instance
    .get(apis.VIEW_USER_PAGE_API(payload.userID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

// export function viewUserAllBlogAPI(payload: any) {
//   return instance
//     .get(apis.ALL_BLOG_OF_AUTHOR_API(payload.userID), payload)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// }

export function viewNotificationAPI(payload: any) {
  return instance
    .get(apis.GET_ALL_NOTIFICATIONS(payload.userID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function followUserAPI(payload: any) {
  return instance
    .post(apis.FOLLOW_USER(payload.userId), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function addBlogAPI(payload: any) {
  return instance
    .post(apis.ADD_BLOG_API, payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function likeBlogAPI(payload: any) {
  console.log("=> SERVICE LIKE BLOG");
  return instance
    .put(apis.LIKE_BLOG(payload.blogID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function viewUserOwnDetailAPI(payload: any) {
  return instance
    .get(apis.GET_USER_OWN_DETAIL(payload.userID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function editUserOwnDetailAPI(payload: any) {
  return instance
    .put(apis.Edit_USER_OWN_DETAIL(payload.userID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}


export function deleteUserOwnAccountAPI(payload: any) {
  return instance
    .delete(apis.DELETE_USER_BY_ID_API(payload.userID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}
export default instance;
