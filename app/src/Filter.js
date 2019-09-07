import React from 'react';

function Filter(props){
    return (
        <div className="filter col">
            <div className="filter__label"> {props.label} </div>
            <select className="filter__select custom-select" onChange={props.handleChange} name={props.name}>
                {props.data.map(info => 
                    <option className="filter__option" key={info.value} value={info.value}>
                        {info.label}
                    </option>)}
            </select>
        </div>
    );
}

export default Filter;
