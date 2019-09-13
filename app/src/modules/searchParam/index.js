import { connect } from 'react-redux';

import GroupBy from './component';
import * as actions from './actions';

const mapStateToProps = store => ({
  options: store.searchParam.options,
  searchParam: store.searchParam.searchParam,
});

const mapDispatchToProps = {
  getOptions: actions.getOptions,
  changeSearchParam: actions.changeSearchParam,
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupBy);
