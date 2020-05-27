import React, { Component } from 'react'

import { DatePicker, Select } from 'antd'
import 'antd/dist/antd.css'

import styles from './App.css'


export class App extends Component<any, any> {
    render(): React.ReactNode {
        return (
            <>
                <div className={styles.row}>
                    <DatePicker />
                    <DatePicker />
                    <Select></Select>
                </div>
                <div className={styles.row}>
                    <Select></Select>
                    <Select></Select>
                    <Select></Select>
                </div>
            </>
        )
    }
}
