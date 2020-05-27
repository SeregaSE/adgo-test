import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DatePicker, Select, Table } from 'antd'
import 'antd/dist/antd.css'

import { AppState } from './store/types'
import { StatisticsService } from './api/v1/statistics'
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

interface Props extends AppState {

}

class App extends Component<Props> {
    private statisticsService = new StatisticsService()

    componentDidMount(): void {
        Promise
            .all([
                this.statisticsService.getGroupsList(),
                this.statisticsService.getPlatformsList(),
                this.statisticsService.getOperatingSystemsList(),
                this.statisticsService.getStatistics(this.props.query)
            ])
            .then(data => console.log(data))

    }

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

const mapStateToProps = (state: AppState) => ({
    query: state.query
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps)(App)
