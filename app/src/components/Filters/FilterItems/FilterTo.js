
const FilterTo = (props) => {
    const onChangeFilterFrom = (e) => {
        props.onFiltersChange("to", e.currentTarget.value)
    }
    return (
        <div className="col-md  mt-10">
            <label>To</label>
            <input
                onInput={onChangeFilterFrom}
                type="date"
                className="form-control"
                value={props.currentValueFilters.to}
                min={props.currentValueFilters.from}
            />
        </div>
    )
}

export default FilterTo;