import React from 'react';
import styles from './Prev.module.css';

const Prev = props => {
    let isDisabled = props.currentPage === 1;

    return (
        <button className={isDisabled
                    ? `${styles.item} ${styles.isDisable}`
                    : styles.item}
                disabled={isDisabled}
                onClick={() => {props.onPageChanged(props.currentPage - 1);}
        }>{"<<"}</button>
    )
};

export default Prev;