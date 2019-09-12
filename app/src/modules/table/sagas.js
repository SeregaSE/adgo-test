import { takeLatest, call, put } from 'redux-saga/effects';

import * as AT from './actions-type';
import * as api from '../../api';
import * as urls from '../../api/urls';
import * as actions from './actions';

function* getStatistics({
  payload: {
    groupBy,
    from,
    to,
    platform,
    browser,
    operatingSystem,
  }
}) {
  try {
    const statistics = yield call(api.get, {
      url: urls.statUrl({ 
        groupBy, 
        from, 
        to,
        platform,
        browser,
        operatingSystem,
      }),
    });
    
    yield put(actions.getStatisticsSuccess({ statistics }));
 
  } catch (errorMessage) {
    yield put(actions.getStatisticsFail({ errorMessage: errorMessage.toString() }));
  }
}

function* watchGetStatistics() {
  yield takeLatest(AT.GET_STATISTICS, getStatistics);
}

const tableSagas = [
  watchGetStatistics,
];

export default tableSagas;
