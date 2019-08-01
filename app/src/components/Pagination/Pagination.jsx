import React from 'react';
import styles from './Pagination.module.css';
import Prev from "./Prev/Prev";
import Next from "./Next/Next";

const Pagination = props => {
    let pagesCount = Math.ceil(props.total / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let lastEl = pages[pages.length - 1];

    let pagesEl = pages.map(p => {
        return <div onClick={() => {props.onPageChanged(p);}}
                    className={p === props.currentPage
                        ? `${styles.item} ${styles.currentPage}`
                        : styles.item}>{p}
        </div>;
    });

    return (
        <div className={styles.container}>
            <Prev currentPage={props.currentPage} onPageChanged={props.onPageChanged} />
            {pagesEl}
            <Next lastEl={lastEl} currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
        </div>
    )
};

export default Pagination;