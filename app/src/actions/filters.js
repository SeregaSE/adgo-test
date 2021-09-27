
export const initDataFilters = (data) => ({ type: 'INIT_DATA_FILTERS', data});
export const initCurrentValueFilters = (data) => ({ type: 'INIT_CURRENT_VALUE_FILTERS', data});
export const changeFilterFrom = (data) => ({ type: 'CHANGE_FILTER_FROM', data});
export const changeFilterTo = (data) => ({ type: 'CHANGE_FILTER_TO', data});
export const changeFilterGroups = (data) => ({ type: 'CHANGE_GROUPS', data});
export const changeFilterPlatform = (data) => ({ type: 'CHANGE_PLATFORM', data});
export const changeOS = (data) => ({ type: 'CHANGE_OS', data});
export const changeBrowsers = (data) => ({ type: 'CHANGE_BROWSERS', data});