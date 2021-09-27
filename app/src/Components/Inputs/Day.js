import React from 'react';

const Day = ({setDay, name, day}) => {
    const changeDay = (e) => {
        setDay(e.target.value);
    }
    return (
        <input type="date" name={name} value={day} onChange={changeDay}/>
    );
};

export default Day;