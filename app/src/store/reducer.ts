import { AnyAction } from 'redux';
import { GET_BROWSERS, GET_GROUPS, GET_OPERATING_SYSTEMS, GET_PLATFORMS } from './actions';
import {
  BrowserDataType,
  GroupDataType,
  OperatingSystemsDataType,
  PlatformDataType,
} from './store.types';

export type STATE_TYPE = {
  platforms: PlatformDataType[];
  browsers: BrowserDataType[];
  operatingSystems: OperatingSystemsDataType[];
  groups: GroupDataType[];
};

export const INITIAL_STATE: STATE_TYPE = {
  platforms: [],
  browsers: [],
  operatingSystems: [],
  groups: [],
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

    default:
      return state;
  }
};
