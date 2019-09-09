import React from 'react';

function Filter(props){
    return (
        <div className="filter col-md-3 col-xs-12">
            <div className="filter__label"> {props.label} </div>
            <select multiple={props.isMultiple} className="filter__select custom-select" onChange={props.handleChange} name={props.name}>
                {props.data.map(info => 
                    <option className="filter__option" key={info.value} value={info.value}>
                        {info.label}
                    </option>)}
            </select>
        </div>
    );
}

export default Filter;
