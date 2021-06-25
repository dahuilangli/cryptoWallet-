import { all, fork } from "redux-saga/effects";

import tokenSaga from "sagas/wallet";

export function* sagas() {
  // yield all([fork(tokenSaga)]);
}