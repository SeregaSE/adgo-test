import { handleActions } from "redux-actions";

import {
  getPlatformsSuccess,
  fetchingPlatforms,
  getPlatformsError
} from "../actions/platforms";

const initialState = {
  loading: false,
  error: false,
  data: null
};

const reducer = handleActions(
  {
    [getPlatformsSuccess.toString()]: (state, action) => {
      return {
        loading: false,
        error: false,
        data: action.payload
      };
    },
    [getPlatformsError.toString()]: (state, action) => {
      return {
        loading: false,
        error: true,
        data: null
      };
    },
    [fetchingPlatforms.toString()]: (state, action) => {
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
