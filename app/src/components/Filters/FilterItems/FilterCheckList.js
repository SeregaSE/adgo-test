

const FilterCheckList = (props) => {

    let list = props.data;

    if (list.length > 0) {
        let newList = list.filter(item => {
            return item.platform === props.platform
        })
        if (newList.length > 0) {
            list = newList;
        }
    }

    const onChangeFilter= (e) => {
        props.onFiltersChange("os", e.currentTarget.value)
    }

    return (
        <div className="col-md mt-10">
            <label>{props.label}</label>
            <div onClick={props.onChangeView} className="form-control drop-down-list-container"
                >
                {props.labelButton}
                <div
                    style={{display: props.view ? "block" : "none"}}
                    className="drop-down-list form-control">
                    {list.map(item => {
                        return (
                            <div className="form-check" key={item.value}>
                                <input className="form-check-input" type="checkbox" value={item.value} id={item.label}
                                       checked={item.check} onChange={onChangeFilter}/>
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

export default FilterCheckList;
