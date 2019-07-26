import {
  fetchingStatistics,
  getStatisticsSuccess,
  getStatisticsError,
  changeLimit,
  changeOffset
} from "../actions";
import { handleActions } from "redux-actions";

const initialState = {
  data: null,
  error: false,
  loading: false,
  offset: 0,
  limit: 10
};

const reducer = handleActions(
  {
    [fetchingStatistics.toString()]: (state, action) => {
      return {
        ...state,
        data: false,
        loading: true,
        error: null
      };
    },
    [getStatisticsSuccess.toString()]: (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false
      };
    },
    [getStatisticsError.toString()]: (state, action) => {
      return {
        ...state,
        data: false,
        loading: false,
        error: true
      };
    },
    [changeLimit.toString()]: (state, action) => {
      return {
        ...state,
        limit: action.payload
      };
    },
    [changeOffset.toString()]: (state, action) => {
      return {
        ...state,
        offset: action.payload
      };
    }
  },
  initialState
);

export default reducer;
