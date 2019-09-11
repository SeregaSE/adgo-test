import * as AT from './actions-type';

const initialState = {
  isFetching: false,
  statistics: null,
  errorMessage: null,
}

export default (state = { ...initialState }, actions) => {
  switch(actions.type) {
    case AT.GET_STATISTICS:
      return {
        ...state,
        isFetching: true,
      }
    case AT.GET_STATISTICS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        statistics: actions.payload.statistics,
      }
    case AT.GET_STATISTICS_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: actions.payload.errorMessage,
      }
    default:
      return {
        ...state,
      }
  }
}
