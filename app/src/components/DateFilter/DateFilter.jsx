import React from 'react';
import styles from './DateFilter.module.css';
import GroupByContainer from "./GroupBy/GroupByContainer";
import FromContainer from "./From/FromContainer";
import ToContainer from "./To/ToContainer";

const DateFilter = () => {
    return <>
        <div className={styles.item}><FromContainer/></div>
        <div className={styles.item}><ToContainer/></div>
        <div className={styles.item}><GroupByContainer/></div>
    </>
};

export default DateFilter;