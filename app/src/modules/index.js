import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import statistics, { sagas as statisticsSagas } from "./Statistics";

export default combineReducers({ statistics });

export function* rootSaga() {
  yield fork(statisticsSagas);
}
