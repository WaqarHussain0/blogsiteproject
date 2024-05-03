// import { call, put, takeLatest } from "redux-saga/effects";
// import { forgetPasswordActionCreator } from "../actions/forgetPassword.action";
// import * as types from "../actionType";
// import { forgetPasswordAPI } from "../service/forgetpassword.service";
// import { toast } from "react-toastify";

// function* forgetPassword(action: any): Generator<any, void, any> {
//   try {
//     const data = yield call(forgetPasswordAPI, action.payload);
//     toast.success(data.message);
//   } catch (error: any) {
//     yield put(forgetPasswordActionCreator.forgetPasswordFail(error));
//     toast.error(error.response.data.message);
//   }
// }
// export function* forgetPasswordSaga() {
//   yield takeLatest(types.FORGET_PASSWORD, forgetPassword);
// }


export {}