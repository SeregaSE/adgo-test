
const FilterDate = (props) => {

    const onChangeFilter = (e) => {
        props.onFiltersChange(props.type, e.currentTarget.value)
    }

    return (
        <div className="col-md mt-10">
            <label>{props.label}</label>
            <input
                onInput={onChangeFilter}
                type="date"
                className="form-control"
                value={props.value}
                {...(props.max ? {max: props.max}:{min: props.min})}
            />
        </div>
    )
}

export default FilterDate;