
const FilterBrowsers = (props) => {
    return (
        <div className="col-md mt-10">
            <label>Browsers</label>
            <div onClick={props.onChangeViewsBrowsers} className="form-control drop-down-list-container" id="operating-system">
                Choose browsers
                <div
                    style={{display: props.viewBrowsers ? "block" : "none"}}
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
    )
}

export default FilterBrowsers;