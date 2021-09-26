
const FilterTo = (props) => {
    return (
        <div className="col-md  mt-10">
            <label>To</label>
            <input
                type="date"
                className="form-control"
                value={props.currentValueFilters.to}
                min={props.currentValueFilters.from}
            />
        </div>
    )
}

export default FilterTo;