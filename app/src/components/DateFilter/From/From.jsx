import React from 'react';
import styles from './From.module.css';

const From = props => {
    return (
        <>
            <label htmlFor="FromFilter">From</label>
            <input id="FromFilter"
                   value={props.from}
                   type="date"
                   required
                   onChange={e => {props.setFrom(e.target.value)}}
            />
        </>
    )
};

export default From;