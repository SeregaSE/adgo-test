import { createActions } from "redux-actions";

const {
  getOperatingSystemsSuccess,
  fetchingOperatingSystems,
  getOperatingSystemsError
} = createActions(
  "GET_OPERATING_SYSTEMS_SUCCESS",
  "FETCHING_OPERATING_SYSTEMS",
  "GET_OPERATING_SYSTEMS_ERROR"
);

const fetchOperatingSystems = () => dispatch => {
  dispatch(fetchingOperatingSystems);
  fetch("/api/v1/operating-systems")
    .then(data => data.json())
    .then(res => dispatch(getOperatingSystemsSuccess(res)))
    .catch(e => dispatch(getOperatingSystemsError()));
};

export {
  getOperatingSystemsSuccess,
  fetchingOperatingSystems,
  getOperatingSystemsError,
  fetchOperatingSystems
};
