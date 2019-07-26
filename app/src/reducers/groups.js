import { handleActions } from "redux-actions";

import {
  getGroupsSuccess,
  fetchingGroups,
  getGroupsError,
  changeGroups
} from "../actions/groups";

const initialState = {
  loading: false,
  error: false,
  data: null,
  group: null
};

const reducer = handleActions(
  {
    [getGroupsSuccess.toString()]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload
      };
    },
    [getGroupsError.toString()]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
        data: null
      };
    },
    [fetchingGroups.toString()]: (state, action) => {
      return {
        ...state,
        loading: true,
        error: false,
        data: null
      };
    },
    [changeGroups.toString()]: (state, action) => {
      return {
        ...state,
        group: action.payload
      };
    }
  },
  initialState
);

export default reducer;
