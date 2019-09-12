import * as AT from './actions-type';

export const getStatistics = ({ groupBy, dateRange, platform, browser, operatingSystem }) => ({
  type: AT.GET_STATISTICS,
  payload: {
    groupBy,
    dateRange,
    platform,
    browser,
    operatingSystem,
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