const FilterSelect = (props) => {

    const onChangeFilter = (e) => {
        props.onFiltersChange(props.type, e.currentTarget.value)
    }

    return (
        <div className="col-md mt-10">
            <label>{props.label}</label>
            <select
                className="form-control"
                value={props.value}
                onChange={onChangeFilter}
            >
                {props.data.map(item => {
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

export default FilterSelect;