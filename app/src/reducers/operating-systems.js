import { handleActions } from "redux-actions";

import {
  getOperatingSystemsSuccess,
  fetchingOperatingSystems,
  getOperatingSystemsError
} from "../actions/operating-systems";

const initialState = {
  loading: false,
  error: false,
  data: null
};

const reducer = handleActions(
  {
    [getOperatingSystemsSuccess.toString()]: (state, action) => {
      return {
        loading: false,
        error: false,
        data: action.payload
      };
    },
    [getOperatingSystemsError.toString()]: (state, action) => {
      return {
        loading: false,
        error: true,
        data: null
      };
    },
    [fetchingOperatingSystems.toString()]: (state, action) => {
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
