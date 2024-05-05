import { all } from "redux-saga/effects";
import { authSaga } from "./auth.sagas";
import { blogSaga } from "./blog.sagas";
import { userSaga } from "./user.sagas";
import { engagementSaga } from "./engagement.sagas";

export default function* globalRootSagas() {
  yield all([authSaga(), blogSaga(), userSaga(), engagementSaga()]);
}
