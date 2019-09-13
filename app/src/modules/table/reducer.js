import * as AT from './actions-type';

import { CHANGE_SEARCH_PARAM } from '../searchParam/actions-type';

const initialState = {
  isFetching: false,
  statistics: null,
  errorMessage: null,
  pageCount: null,
  currentPage: 0,
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

    case AT.SET_PAGE_COUNT:
      return {
        ...state,
        pageCount: actions.payload.pageCount,
      }
    case AT.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: actions.payload.currentPage,
      }

    case CHANGE_SEARCH_PARAM: 
      return {
        ...state,
        currentPage: 0,
      }
    default:
      return {
        ...state,
      }
  }
}
