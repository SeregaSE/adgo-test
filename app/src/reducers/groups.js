import { handleActions } from "redux-actions";

import {
  getGroupsSuccess,
  fetchingGroups,
  getGroupsError
} from "../actions/groups";

const initialState = {
  loading: false,
  error: false,
  data: null
};

const reducer = handleActions(
  {
    [getGroupsSuccess.toString()]: (state, action) => {
      return {
        loading: false,
        error: false,
        data: action.payload
      };
    },
    [getGroupsError.toString()]: (state, action) => {
      return {
        loading: false,
        error: true,
        data: null
      };
    },
    [fetchingGroups.toString()]: (state, action) => {
      return {
        loading: true,
        error: false,
        data: null
      };
    }
  },
  initialState
);

export default reducer;
