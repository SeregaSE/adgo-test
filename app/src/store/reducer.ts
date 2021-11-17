import { AnyAction } from 'redux';
import {
  GET_BROWSERS,
  GET_GROUPS,
  GET_OPERATING_SYSTEMS,
  GET_PLATFORMS,
  GET_STATISTICS,
  SAVE_FORM_DATA,
} from './actions';
import {
  BrowserDataType,
  GroupDataType,
  OperatingSystemsDataType,
  PlatformDataType,
  RequestFormType,
  StatisticsResponseDataType,
} from './store.types';

export type STATE_TYPE = {
  platforms: PlatformDataType[];
  browsers: BrowserDataType[];
  operatingSystems: OperatingSystemsDataType[];
  groups: GroupDataType[];
  form: RequestFormType;
  statistics: StatisticsResponseDataType;
};

const timezoneOffset = new Date().getTimezoneOffset() * 60000;
const TODAY = new Date(Date.now() - timezoneOffset).toISOString().split('T')[0];

export const INITIAL_STATE: STATE_TYPE = {
  platforms: [],
  browsers: [],
  operatingSystems: [],
  groups: [],
  form: {
    from: TODAY,
    to: TODAY,
    limit: 10,
    offset: 0,
    groupBy: 'day',
    platforms: [],
    browsers: [],
    operatingSystems: [],
  },
  statistics: {
    count: 0,
    rows: [],
    total: {
      impressions: 0,
      clicks: 0,
      money: 0,
    },
  },
};

export const reducer = (state = INITIAL_STATE, action: AnyAction): STATE_TYPE => {
  switch (action.type) {
    case GET_PLATFORMS:
      return { ...state, platforms: action.platforms };

    case GET_BROWSERS:
      return { ...state, browsers: action.browsers };

    case GET_OPERATING_SYSTEMS:
      return { ...state, operatingSystems: action.operatingSystems };

    case GET_GROUPS:
      return { ...state, groups: action.groups };

    case GET_STATISTICS:
      return { ...state, statistics: action.statistics };

    case SAVE_FORM_DATA:
      return { ...state, form: action.form };

    default:
      return state;
  }
};
