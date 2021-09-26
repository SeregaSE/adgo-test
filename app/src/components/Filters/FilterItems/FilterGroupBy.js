
const FilterGroupBy = (props) => {
    return (
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
    )
}

export default FilterGroupBy;