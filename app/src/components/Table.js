import {connect} from "react-redux";

const Table = (props) => {
    return (
        <div className="table-responsive mt-30">
            <div className="info">
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">{props.currentValueFilters.groups.label}</th>
                    <th scope="col">Impressions</th>
                    <th scope="col">Conversions</th>
                    <th scope="col">Money</th>
                </tr>
                </thead>
                <tbody>
                {props.data.length > 0 ?
                    props.data.map(item => {
                        return (
                            <tr>
                                <td>{item[props.currentValueFilters.groups.value]}</td>
                                <td>{item.impressions}</td>
                                <td>{item.clicks}</td>
                                <td>{item.money}</td>
                            </tr>
                        )
                    })
                    : ""
                }
                </tbody>
            </table>
        </div>
    )
}

export default connect(
    state => ({
        currentValueFilters: state.filters.currentValueFilters,
        data: state.table.data
    }),
    dispatch => ({
        // onAjaxGetDataForFilters: () => {
        //     dispatch(ajaxGetDataForFilters());
        // },
    })
)(Table);
