import table from './modules/table/sagas';
import searchParam from './modules/searchParam/sagas';

export default [
  ...table,
  ...searchParam,
];
