

const FilterOS = (props) => {

    let listOS = props.currentValueFilters.operatingSystems;

    if (listOS.length > 0) {
        let newListOS = listOS.filter(item => {
            return item.platform === props.currentValueFilters.platforms.value
        })
        if (newListOS.length > 0) {
            listOS = newListOS;
        }
    }

    const onChangeFilterFrom = (e) => {
        props.onFiltersChange("os", e.currentTarget.value)
    }

    return (
        <div className="col-md mt-10">
            <label>Operating system</label>
            <div onClick={props.onChangeViewOperatingSystem} className="form-control drop-down-list-container"
                 id="operating-system">
                Choose operating system
                <div
                    style={{display: props.viewOperatingSystem ? "block" : "none"}}
                    className="drop-down-list form-control">
                    {listOS.map(item => {
                        return (
                            <div className="form-check" key={item.value}>
                                <input className="form-check-input" type="checkbox" value={item.value} id={item.label}
                                       checked={item.check} onChange={onChangeFilterFrom}/>
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