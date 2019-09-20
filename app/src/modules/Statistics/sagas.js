import {
  paramsRequest,
  paramsSuccess,
  paramsFailure,
  statisticsRequest,
  statisticsSuccess,
  statisticsFailure,
  statisticsFilterChanged
} from "./actions";
import { getFilter } from "./reducer";
import { fetchStatistics, fetchParams } from "./api.js";
import { takeLatest, put, call, select } from "redux-saga/effects";

function* fetchStatisticsWatcher(action) {
  yield takeLatest(statisticsRequest, fetchStatisticsFlow);
  yield takeLatest(paramsRequest, fetchParamsFlow);
  yield takeLatest(statisticsFilterChanged, fetchFilterFlow);
}

export function* fetchStatisticsFlow(action) {
  try {
    const result = yield call(fetchStatistics, action.payload);
    yield put(statisticsSuccess(result));
  } catch (error) {
    yield put(statisticsFailure(error.message));
  }
}

export function* fetchParamsFlow(action) {
  try {
    const result = yield call(fetchParams);
    yield put(paramsSuccess(result));
  } catch (error) {
    yield put(paramsFailure(error.message));
  }
}

export function* fetchFilterFlow(action) {
  try {
    const filter = yield select(getFilter);
    const result = yield call(fetchStatistics, filter);
    yield put(statisticsSuccess(result));
  } catch (error) {
    yield put(statisticsFailure(error.message));
  }
}

export default fetchStatisticsWatcher;
