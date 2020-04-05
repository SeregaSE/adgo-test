import React from 'react';

const SelectInputs = (props) => {
    const option = props.option
    return (
        <option value={option.value}>{option.label}</option>
    )
}

export default SelectInputs