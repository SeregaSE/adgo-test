import * as AT from './actions-type';

export const getStatistics = ({ 
  groupBy, 
  dateRange, 
  platform, 
  browser, 
  operatingSystem,
  offset,
}) => ({
  type: AT.GET_STATISTICS,
  payload: {
    groupBy,
    dateRange,
    platform,
    browser,
    operatingSystem,
    offset,
  }
});

export const getStatisticsSuccess = ({ statistics }) => ({
  type: AT.GET_STATISTICS_SUCCESS,
  payload: {
    statistics,
  }
});

export const getStatisticsFail = ({ errorMessage }) => ({
  type: AT.GET_STATISTICS_FAIL,
  payload: {
    errorMessage,
  }
});

export const setPageCount= ({ pageCount }) => ({
  type: AT.SET_PAGE_COUNT,
  payload: {
    pageCount,
  }
});

export const setCurrentPage= ({ currentPage }) => ({
  type: AT.SET_CURRENT_PAGE,
  payload: {
    currentPage,
  }
});
