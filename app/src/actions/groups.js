import { createActions } from "redux-actions";

const { getGroupsSuccess, fetchingGroups, getGroupsError } = createActions(
  "GET_GROUPS_SUCCESS",
  "FETCHING_GROUPS",
  "GET_GROUPS_ERROR"
);

const fetchGroups = () => dispatch => {
  dispatch(fetchingGroups);
  fetch("/api/v1/groups")
    .then(data => data.json())
    .then(res => dispatch(getGroupsSuccess(res)))
    .catch(e => dispatch(getGroupsError()));
};

export { getGroupsSuccess, fetchingGroups, getGroupsError, fetchGroups };
