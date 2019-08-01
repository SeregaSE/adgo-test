import React from 'react';
import styles from './Option.module.css';

const Option = props => {
    return (
        <option className={styles.option}
                value={props.value}
                selected={props.selected}>
            {props.label}
        </option>
    )
};

export default Option;