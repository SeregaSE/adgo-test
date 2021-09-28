import React from 'react';

const Filter = ({handler, list, name}) => {
    return (
        <>
            <label htmlFor={name}>{name}</label>
            <select onChange={handler}>
                {list.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}

            </select>
        </>
    );
};

export default Filter;