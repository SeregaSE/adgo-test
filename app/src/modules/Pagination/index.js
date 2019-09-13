import { connect } from 'react-redux';

import Pagination from './component';
import * as actions from '../table/actions';

const mapStateToProps = store => ({
  pageCount: store.table.pageCount,
});

const mapDispatchToProps = {
  setCurrentPage: actions.setCurrentPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
