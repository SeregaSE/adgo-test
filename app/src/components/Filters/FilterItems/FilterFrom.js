
const FilterFrom = (props) => {
    return (
        <div className="col-md mt-10">
            <label>From</label>
            <input
                type="date"
                className="form-control"
                value={props.currentValueFilters.from}
                max={props.currentValueFilters.to}
            />
        </div>
    )
}

export default FilterFrom;