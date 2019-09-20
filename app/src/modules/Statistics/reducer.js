import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  paramsRequest,
  paramsSuccess,
  paramsFailure,
  statisticsRequest,
  statisticsSuccess,
  statisticsFailure,
  statisticsFilterChanged
} from "./actions";

import { createSelector } from "reselect";

const data = handleActions(
  {
    [statisticsRequest]: state => state,
    [statisticsSuccess]: (state, action) => action.payload,
    [statisticsFailure]: state => null,
    [statisticsFilterChanged]: state => null
  },
  null
);

const params = handleActions(
  {
    [paramsRequest]: state => state,
    [paramsSuccess]: (state, action) => action.payload,
    [paramsFailure]: state => state
  },
  { platforms: null, browsers: null, OS: null, groups: null }
);

const filter = handleActions(
  {
    [statisticsFilterChanged]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    }
  },
  {
    groupBy: "day",
    fromDate: "2019-06-01",
    toDate: "2019-06-30",
    limit: 10,
    offset: 0,
    platforms: 1,
    browsers: [1],
    operatingSystems: [1]
  }
);

export const getStatistics = createSelector(
  state => state.statistics.data,
  data => data
);

export const getParams = createSelector(
  state => state.statistics.params,
  params => params
);

export const getFilter = createSelector(
  state => state.statistics.filter,
  filter => filter
);

export default combineReducers({
  data,
  params,
  filter
});
