import { createActions } from "redux-actions";
const base = "/api/v1/statistics?";
const {
  fetchingStatistics,
  getStatisticsSuccess,
  getStatisticsError
} = createActions(
  "FETCHING_STATISTICS",
  "GET_STATISTICS_SUCCESS",
  "GET_STATISTICS_ERROR"
);

const fetchStatistics = params => dispatch => {
  if (!params.groupBy || !params.from || !params.to) return;
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
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
  fetchStatistics
};
