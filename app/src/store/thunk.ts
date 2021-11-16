import { Dispatch } from 'redux';
import { GET_BROWSERS, GET_GROUPS, GET_OPERATING_SYSTEMS, GET_PLATFORMS } from './actions';

export const getPlatforms = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/platforms');
      const platforms = await response.json();

      dispatch({ type: GET_PLATFORMS, platforms });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getBrowsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/browsers');
      const browsers = await response.json();

      dispatch({ type: GET_BROWSERS, browsers });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOperatingSystems = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/operating-systems');
      const operatingSystems = await response.json();

      dispatch({ type: GET_OPERATING_SYSTEMS, operatingSystems });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getGroups = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/groups');
      const groups = await response.json();

      dispatch({ type: GET_GROUPS, groups });
    } catch (err) {
      console.log(err);
    }
  };
};
