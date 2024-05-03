import instance from "../../utils/axios";

import * as apis from "../../utils/constants/api.constants";
export function getAllBlogsAPI(payload: any) {
  return instance
    .get(apis.GET_ALL_BLOG_API, payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}
export function getBlogbyIDAPI(payload: any) {
  return instance
    .get(apis.GET_BLOG_BY_ID_API(payload.blogID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function updateBlogbyIDAPI(payload: any) {
  return instance
    .put(apis.UPDATE_BLOG_BY_ID_API(payload.blogID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function deleteBlogbyIDAPI(payload: any) {

  console.log("PAYLOAD",payload)
  return instance
    .delete(apis.DELETE_BLOG_BY_ID_API(payload.blogID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

// export function getAllBlogofAuthorAPI(payload: any) {
//   return instance
//     .get(apis.ALL_BLOG_OF_AUTHOR, payload)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// }

// export function addBlogAPI(payload: any) {
//   return instance
//     .post(apis.ADD_BLOG_API, payload)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// }
// export function searchQueryBlogAPI(payload: any) {
//   return instance
//     .get(apis.BLOG_SEARCH_QUERY_API, payload)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// }
export default instance;
