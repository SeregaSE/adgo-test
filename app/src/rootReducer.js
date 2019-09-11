import { combineReducers } from 'redux';

import table from './modules/table/reducer';
import searchParam from './modules/searchParam/reducer';

export default combineReducers({
  table,
  searchParam,
});
