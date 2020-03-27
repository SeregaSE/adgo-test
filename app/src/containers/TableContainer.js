import {connect} from 'react-redux'

import {getData, getOptionsGroup, changeUrl, changePage} from '../actions/tableActions'

import Table from '../components/Table/Table'

const mapStateToProps = (state) => {
    return {
        sortData: state.table.sortData,
        defaultData: state.table.defaultData,
        optionsGroup: state.table.optionsGroup,
        urlState: state.table.urlState,
        paginate: state.table.paginate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (urlState) => {
            dispatch(getData(urlState))
        },
        getOptionsGroup: () => {
            dispatch(getOptionsGroup())
        },
        changeUrl: (type, value) => {
            dispatch(changeUrl(type, value))
        },
        changePage: (offset) => {
            console.log('page')
            dispatch(changePage(offset))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)