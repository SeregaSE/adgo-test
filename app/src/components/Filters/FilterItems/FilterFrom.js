import filters from "../../../reducers/filters";


const FilterFrom = (props) => {

    const onChangeFilterFrom = (e) => {
        props.onFiltersChange("from", e.currentTarget.value)
    }

    return (
        <div className="col-md mt-10">
            <label>From</label>
            <input
                onInput={onChangeFilterFrom}
                type="date"
                className="form-control"
                value={props.currentValueFilters.from}
                max={props.currentValueFilters.to}
            />
        </div>
    )
}

export default FilterFrom;