
const FilterOS = (props) => {
    return (
        <div className="col-md mt-10">
            <label>Operating system</label>
            <div onClick={props.onChangeViewOperatingSystem} className="form-control drop-down-list-container" id="operating-system">
                Choose operating system
                <div
                    style={{display: props.viewOperatingSystem ? "block" : "none"}}
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
    )
}

export default FilterOS;