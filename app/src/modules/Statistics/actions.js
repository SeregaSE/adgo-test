import { createAction } from "redux-actions";

export const paramsRequest = createAction("PARAMS_REQUEST");
export const paramsSuccess = createAction("PARAMS_SUCCESS");
export const paramsFailure = createAction("PARAMS_FAILURE");

export const statisticsRequest = createAction("STATISTICS_REQUEST");
export const statisticsSuccess = createAction("STATISTICS_SUCCESS");
export const statisticsFailure = createAction("STATISTICS_FAILURE");

export const statisticsFilterChanged = createAction(
  "STATISTICS_FILTER_CHANGED"
);
