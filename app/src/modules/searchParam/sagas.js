import { takeEvery, call, put } from 'redux-saga/effects';

import * as AT from './actions-type';
import * as api from '../../api';
import * as urls from '../../api/urls';
import * as actions from './actions';

function* getOptions({
  payload: {
    type,
  }
}) {
  try {
    const response = yield call(api.get, {
      url: urls[type],
    });

    yield put(actions.getOptionsSuccess({ type, options: response }));

  } catch (err) {
    yield put(actions.getOptionsFail({ type, errorMessage: err.toString() }));
  }
}

function* watchGetOptions() {
  yield takeEvery(AT.GET_OPTIONS, getOptions);
}

export default [
  watchGetOptions,
]
