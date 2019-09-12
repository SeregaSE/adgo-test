import * as AT from './actions-type';

export const getOptions = ({ type }) => ({
  type: AT.GET_OPTIONS,
  payload: {
    type,
  }
});

export const getOptionsSuccess = ({ type, options }) => ({
  type: AT.GET_OPTIONS_SUCCESS,
  payload: {
    type,
    options,
  }
});

export const getOptionsFail = ({ type, errorMessage }) => ({
  type: AT.GET_OPTIONS_FAIL,
  payload: {
    type,
    errorMessage,
  }
});

export const changeSearchParam = ({ type, param }) => ({
  type: AT.CHANGE_SEARCH_PARAM,
  payload: {
    type,
    param,
  }
})
 