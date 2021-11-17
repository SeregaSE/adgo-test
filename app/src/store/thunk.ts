import { Dispatch } from 'redux';
import {
  getBrowsersSuccess,
  getGroupsSuccess,
  getOperatingSystemsSuccess,
  getPlatformsSuccess,
  getStatisticsSuccess,
  saveFormData,
} from './actions';
import { RequestFormType } from './store.types';

export const getPlatforms = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/platforms');
      const platforms = await response.json();

      dispatch(getPlatformsSuccess(platforms));
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

      dispatch(getBrowsersSuccess(browsers));
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

      dispatch(getOperatingSystemsSuccess(operatingSystems));
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

      dispatch(getGroupsSuccess(groups));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getStatistics = (form: RequestFormType) => {
  const isFormKey = (key: string): key is keyof RequestFormType => form.hasOwnProperty(key);
  const keyList = Object.keys(form).filter(isFormKey);

  return async (dispatch: Dispatch) => {
    dispatch(saveFormData(form));

    const parameters: string[] = [];

    keyList.forEach((key) => {
      const value = form[key];

      if (!value || (Array.isArray(value) && value.length === 0)) {
        return;
      }

      switch (key) {
        case 'platforms':
        case 'browsers':
        case 'operatingSystems':
          if (Array.isArray(value)) {
            value.forEach((el) => {
              parameters.push(`${key}[]=${el}`);
            });
          } else {
            console.log(key + ' wrong data type');
          }
          break;
        default:
          parameters.push(`${key}=${value}`);
          break;
      }
    });

    console.log(parameters);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/statistics?${parameters.join('&')}`
      );
      const statistics = await response.json();

      console.log(statistics);

      dispatch(getStatisticsSuccess(statistics));
    } catch (err) {
      console.log(err);
    }
  };
};
