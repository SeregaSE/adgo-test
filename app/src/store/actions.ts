import {
  BrowserDataType,
  GroupDataType,
  OperatingSystemsDataType,
  PartialRequestFormType,
  PlatformDataType,
  StatisticsResponseDataType,
} from './store.types';

export const GET_PLATFORMS = 'GET_PLATFORMS' as const;
export const GET_BROWSERS = 'GET_BROWSERS' as const;
export const GET_OPERATING_SYSTEMS = 'GET_OPERATING_SYSTEMS' as const;
export const GET_GROUPS = 'GET_GROUPS' as const;
export const GET_STATISTICS = 'GET_STATISTICS' as const;
export const SAVE_FORM_DATA = 'SAVE_FORM_DATA' as const;

export const getPlatformsSuccess = (platforms: PlatformDataType) => {
  return {
    type: GET_PLATFORMS,
    platforms,
  };
};

export const getBrowsersSuccess = (browsers: BrowserDataType) => {
  return { type: GET_BROWSERS, browsers };
};

export const getOperatingSystemsSuccess = (operatingSystems: OperatingSystemsDataType) => {
  return {
    type: GET_OPERATING_SYSTEMS,
    operatingSystems,
  };
};

export const getGroupsSuccess = (groups: GroupDataType) => {
  return { type: GET_GROUPS, groups };
};

export const getStatisticsSuccess = (statistics: StatisticsResponseDataType) => {
  return { type: GET_STATISTICS, statistics };
};

export const saveFormData = (form: PartialRequestFormType) => {
  return { type: SAVE_FORM_DATA, form };
};
