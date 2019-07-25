import {
  fetchingStatistics,
  getStatisticsSuccess,
  getStatisticsError
} from "../actions";
import { handleActions } from "redux-actions";

const initialState = {
  data: null,
  error: false,
  loading: false
};

const reducer = handleActions(
  {
    [fetchingStatistics.toString()]: (state, action) => {
      return {
        data: false,
        loading: true,
        error: null
      };
    },
    [getStatisticsSuccess.toString()]: (state, action) => {
      return {
        data: action.payload,
        loading: false,
        error: false
      };
    },
    [getStatisticsError.toString()]: (state, action) => {
      return {
        data: false,
        loading: false,
        error: true
      };
    }
  },
  initialState
);

export default reducer;
