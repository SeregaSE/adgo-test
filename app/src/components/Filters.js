import {connect} from "react-redux";

const Filters = (props) => {
    console.log(props)
    return (
        <form>
            <div className="row">
                <div className="col-md mt-10">
                    <label>From</label>
                    <input type="date" className="form-control" />
                </div>
                <div className="col-md  mt-10">
                    <label>To</label>
                    <input
                        type="date"
                        className="form-control"
                        value={props.currentValueFilters.to}
                    />
                </div>
                <div className="col-md  mt-10">
                    <label>Group by</label>
                    <select className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
            </div>
            <div className="row mt-20">
                <div className="col-md mt-10">
                    <label>Platform</label>
                    <select className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="col-md mt-10">
                    <label>Operating system</label>
                    <div className="form-control drop-down-list-container" id="operating-system">
                        Choose operating system
                        <div className="drop-down-list form-control">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Checked checkbox
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md mt-10">
                    <label>Browser</label>
                    <select className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
            </div>
        </form>
    )
}

export default connect(
    state => ({
        currentValueFilters: state.filters.currentValueFilters
    }),
    dispatch => ({
        // onAjaxGetDataForFilters: () => {
        //     dispatch(ajaxGetDataForFilters());
        // },
    })
)(Filters);
