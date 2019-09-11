import { connect } from 'react-redux';

import GroupBy from './component';
import * as actions from './actions';

const mapStateToProps = store => ({
  options: store.searchParam.options,
  isFetching: store.searchParam.isFetching,
});

const mapDispatchToProps = {
  getOptions: actions.getOptions,
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupBy);
