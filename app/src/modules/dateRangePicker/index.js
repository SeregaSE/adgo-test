import { connect } from 'react-redux';

import DateRangePicker from './component';
import { changeSearchParam } from '../searchParam/actions';

const mapStateToProps = store => ({
  dateRange: store.searchParam.searchParam.dateRange,
});

const mapDispatchToProps = {
  changeSearchParam,
}

export default connect(mapStateToProps, mapDispatchToProps)(DateRangePicker);
