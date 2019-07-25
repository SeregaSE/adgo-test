import { createActions } from "redux-actions";

const {
  getPlatformsSuccess,
  fetchingPlatforms,
  getPlatformsError
} = createActions(
  "GET_PLATFORMS_SUCCESS",
  "FETCHING_PLATFORMS",
  "GET_PLATFORMS_ERROR"
);

const fetchPlatforms = () => dispatch => {
  dispatch(fetchingPlatforms);
  fetch("/api/v1/platforms")
    .then(data => data.json())
    .then(res => dispatch(getPlatformsSuccess(res)))
    .catch(e => dispatch(getPlatformsError()));
};

export {
  getPlatformsSuccess,
  fetchingPlatforms,
  getPlatformsError,
  fetchPlatforms
};
