import { handleActions } from "redux-actions";

import { createActions } from "redux-actions";

import {
  getBrowsersSuccess,
  fetchingBrowsers,
  getBrowsersError
} from "../actions/browsers";

const initialState = {
  loading: false,
  error: false,
  data: null
};

const reducer = handleActions(
  {
    [getBrowsersSuccess.toString()]: (state, action) => {
      return {
        loading: false,
        error: false,
        data: action.payload
      };
    },
    [getBrowsersError.toString()]: (state, action) => {
      return {
        loading: false,
        error: true,
        data: null
      };
    },
    [fetchingBrowsers.toString()]: (state, action) => {
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
