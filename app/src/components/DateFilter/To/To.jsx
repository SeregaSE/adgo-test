import React from 'react';
import styles from "../From/From.module.css";

const To = props => {
    return (
        <>
            <label htmlFor="ToFilter">To</label>
            <input id="ToFilter" type="date" value={props.to} required onChange={e => {
                props.setTo(e.target.value);
            }} />
        </>
    )
};



export default To;