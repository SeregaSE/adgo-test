
const FilterBrowsers = (props) => {

    let listBrowsers = props.currentValueFilters.browsers;

    if (listBrowsers.length > 0) {
        let newListBrowsers = listBrowsers.filter(item => {
            return item.platform === props.currentValueFilters.platforms.value
        })
        if (newListBrowsers.length > 0) {
            listBrowsers = newListBrowsers;
        }
    }


    const onChangeFilterFrom = (e) => {
        props.onFiltersChange("browsers", e.currentTarget.value)
    }

    return (
        <div className="col-md mt-10">
            <label>Browsers</label>
            <div onClick={props.onChangeViewsBrowsers} className="form-control drop-down-list-container" id="operating-system">
                Choose browsers
                <div
                    style={{display: props.viewBrowsers ? "block" : "none"}}
                    className="drop-down-list form-control">
                    {listBrowsers.map(item => {
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

export default FilterBrowsers;