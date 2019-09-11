import { connect } from 'react-redux';

import Table from './component';
import * as actions from './actions';

const mapStateToProps = state => ({
    statistics: state.table.statistics,
})

const mapDispatchToProps = {
    getStatistics: actions.getStatistics,
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
