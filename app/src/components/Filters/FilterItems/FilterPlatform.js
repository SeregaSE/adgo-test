
const FilterPlatform = (props) => {

    const onChangeFilterFrom = (e) => {
        props.onFiltersChange("platform", e.currentTarget.value)
    }

    return (
        <div className="col-md mt-10">
            <label>Platform</label>
            <select
                className="form-control"
                value={props.currentValueFilters.platforms.value}
                onChange={onChangeFilterFrom}
            >
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
    )
}

export default FilterPlatform;