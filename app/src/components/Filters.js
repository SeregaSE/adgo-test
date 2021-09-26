import {connect} from "react-redux";
import {useState} from "react";


const Filters = (props) => {
    const [viewOperatingSystem, changeViewOperatingSystem] = useState(false);
    const [viewBrowsers, changeViewsBrowsers] = useState(false);

    const onChangeViewOperatingSystem = () => {
        if(!viewOperatingSystem) {
            changeViewOperatingSystem(true);
        }
    }

    const onChangeViewsBrowsers = () => {
        if(!viewBrowsers) {
            changeViewsBrowsers(true)
        }
    }

    const closeOperatingSystemBrowsers = (e) => {
        let el = document.getElementsByClassName("drop-down-list")
        if(viewOperatingSystem) {
            if(!el[0].contains(e.target)) {
                changeViewOperatingSystem(false);
            }
        } else if(viewBrowsers) {
            if(!el[1].contains(e.target)) {
                changeViewsBrowsers(false);
            }
        }
    }

    return (
        <form onClick={closeOperatingSystemBrowsers}>
            <div className="row">
                <div className="col-md mt-10">
                    <label>From</label>
                    <input
                        type="date"
                        className="form-control"
                        value={props.currentValueFilters.from}
                        max={props.currentValueFilters.to}
                    />
                </div>
                <div className="col-md  mt-10">
                    <label>To</label>
                    <input
                        type="date"
                        className="form-control"
                        value={props.currentValueFilters.to}
                        min={props.currentValueFilters.from}
                    />
                </div>
                <div className="col-md mt-10">
                    <label>Group by</label>
                    <select className="form-control" value={props.currentValueFilters.groups.value}>
                        {props.dataFilters.groups.map(item => {
                            return <option
                                key={item.value}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        })}
                    </select>
                </div>
            </div>
            <div className="row mt-20">
                <div className="col-md mt-10">
                    <label>Platform</label>
                    <select className="form-control" value={props.currentValueFilters.platforms.value}>
                        {props.dataFilters.platforms.map(item => {
                            return <option
                                key={item.value}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        })}
                    </select>
                </div>
                <div className="col-md mt-10">
                    <label>Operating system</label>
                    <div onClick={onChangeViewOperatingSystem} className="form-control drop-down-list-container" id="operating-system">
                        Choose operating system
                        <div
                            style={{display: viewOperatingSystem ? "block" : "none"}}
                        className="drop-down-list form-control">
                            {props.dataFilters.operatingSystems.map(item => {
                                return (
                                    <div className="form-check" key={item.value}>
                                        <input className="form-check-input" type="checkbox" value={item.value} id={item.label} />
                                        <label className="form-check-label" htmlFor={item.label}>
                                            {item.label}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-md mt-10">
                    <label>Browsers</label>
                    <div onClick={onChangeViewsBrowsers} className="form-control drop-down-list-container" id="operating-system">
                        Choose browsers
                        <div
                            style={{display: viewBrowsers ? "block" : "none"}}
                            className="drop-down-list form-control">
                            {props.dataFilters.browsers.map(item => {
                                return (
                                    <div className="form-check" key={item.value}>
                                        <input className="form-check-input" type="checkbox" value={item.value} id={item.label} />
                                        <label className="form-check-label" htmlFor={item.label}>
                                            {item.label}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default connect(
    state => ({
        currentValueFilters: state.filters.currentValueFilters,
        dataFilters: state.filters.dataFilters
    }),
    dispatch => ({
        // onAjaxGetDataForFilters: () => {
        //     dispatch(ajaxGetDataForFilters());
        // },
    })
)(Filters);
