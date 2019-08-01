import React from 'react';
import styles from './Next.module.css';

const Next = props => {
    let isDisabled = props.currentPage === props.lastEl;

    return (
        <button className={isDisabled
                    ? `${styles.item} ${styles.isDisable}`
                    : styles.item}
                disabled={isDisabled}
                onClick={() => {props.onPageChanged(props.currentPage + 1);}
        }>>></button>
    )
};

export default Next;