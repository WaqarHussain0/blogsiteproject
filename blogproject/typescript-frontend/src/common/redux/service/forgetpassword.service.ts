import instance from "../../utils/axios";
import * as apis from "../../utils/constants/api.constants";
export function forgetPasswordAPI (payload: any) {
  return instance
    .post(apis.FORGET_PASSWORD_API, payload)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
}
export default instance;
