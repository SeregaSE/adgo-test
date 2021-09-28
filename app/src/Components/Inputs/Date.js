import React from 'react';

const Date = ({label, handler, value}) => {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input type="date" name={label} onChange={handler} value={value}/>
        </>
    );
};

export default Date;