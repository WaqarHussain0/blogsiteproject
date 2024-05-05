import instance from "../../utils/axios";
import * as apis from "../../utils/constants/api.constants";

export function addCommentAPI(payload: any) {
  return instance
    .post(apis.ADD_COMMENT_API(payload.blogID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}

export function getBlogAllCommentAPI(payload: any) {
  return instance
    .get(apis.GET_BLOG_ALL_COMMENT_API(payload.blogID), payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}
export default instance;
