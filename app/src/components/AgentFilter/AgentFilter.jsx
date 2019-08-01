import React from 'react';
import styles from './AgentFilter.module.css';
import PlatformContainer from "./Platform/PlatformContainer";
import OSContainer from "./OS/OSContainer";
import BrowserContainer from "./Browser/BrowserContainer";

const AgentFilter = () => {
    return (
        <>
            <div className={styles.item}><PlatformContainer/></div>
            <div className={styles.item}><OSContainer/></div>
            <div className={styles.item}><BrowserContainer/></div>
        </>
    )
};

export default AgentFilter;