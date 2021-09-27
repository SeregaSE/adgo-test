import React from 'react';

const SelectorOne = ({name, list, setItem}) => {

    const changeValue = (e) => {
        setItem(e.target.value);
    }
    return (
        <select name={name} onChange={changeValue}>
            {name !== "groupBy" && <option value={0}>No choice</option>}
            {list.map(item => {
                return <option key={item.value} value={item.value}>{item.label}</option>
            })}
        </select>
    );
};

export default SelectorOne;