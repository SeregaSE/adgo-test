import { createActions } from "redux-actions";
const base = "/api/v1/statistics?";
const {
  fetchingStatistics,
  getStatisticsSuccess,
  getStatisticsError,
  changeOffset,
  changeLimit
} = createActions(
  "FETCHING_STATISTICS",
  "GET_STATISTICS_SUCCESS",
  "GET_STATISTICS_ERROR",
  "CHANGE_OFFSET",
  "CHANGE_LIMIT"
);

const fetchStatistics = queryString => dispatch => {
  dispatch(fetchingStatistics());
  fetch(`${base}${queryString}`)
    .then(data => data.json())
    .then(res => dispatch(getStatisticsSuccess(res)))
    .catch(e => dispatch(getStatisticsError));
};

export {
  fetchingStatistics,
  getStatisticsSuccess,
  getStatisticsError,
  fetchStatistics,
  changeLimit,
  changeOffset
};
