import React, { Component } from 'react'
import { DatePicker, Select, Table } from 'antd'
import 'antd/dist/antd.css'

import styles from './App.css'


const { Option } = Select

const columns = [
  {
    title: 'Day',
    key: 'day'
  },
  {
    title: 'Impressions',
    key: 'impressions'
  },
  {
    title: 'Conversions',
    key: 'conversions'
  },
  {
    title: 'Money',
    key: 'money'
  }
]

export class App extends Component<any, any> {
    render(): React.ReactNode {
        return (
            <>
                <div className={styles.filtersRow}>
                    <DatePicker />
                    <DatePicker />
                    <Select></Select>
                </div>
                <div className={styles.filtersRow}>
                    <Select defaultValue={'test'} className={styles.wideSelect}>
                      <Option value={'test'}>Test</Option>
                    </Select>
                    <Select className={styles.wideSelect}></Select>
                    <Select className={styles.wideSelect}></Select>
                </div>
                <Table columns={columns} />
            </>
        )
    }
}
