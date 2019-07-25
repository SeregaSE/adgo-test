import { createActions } from "redux-actions";

const {
  getBrowsersSuccess,
  fetchingBrowsers,
  getBrowsersError
} = createActions(
  "GET_BROWSERS_SUCCESS",
  "FETCHING_BROWSERS",
  "GET_BROWSERS_ERROR"
);

const fetchBrowsers = () => dispatch => {
  dispatch(fetchingBrowsers);
  fetch("/api/v1/browsers")
    .then(data => data.json())
    .then(res => dispatch(getBrowsersSuccess(res)))
    .catch(e => dispatch(getBrowsersError()));
};

export {
  getBrowsersSuccess,
  fetchingBrowsers,
  getBrowsersError,
  fetchBrowsers
};
