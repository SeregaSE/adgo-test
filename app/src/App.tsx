import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DatePicker, Select, Table } from 'antd'
import 'antd/dist/antd.css'

import { Action, AppState } from './store/types'
import { StatisticsService } from './api/v1/statistics'
import { setFilterList, changeQuery, setStatisticsData } from './store/actions'
import styles from './App.css'

const columns = [
  {
    title: 'Day',
    dataIndex: 'day'
  },
  {
    title: 'Impressions',
    dataIndex: 'impressions'
  },
  {
    title: 'Conversions',
    dataIndex: 'clicks'
  },
  {
    title: 'Money',
    dataIndex: 'money'
  }
]

interface Props extends AppState {
    loadFilterList: (action: Action) => void
    loadStatistics: (action: Action) => void
}

class App extends Component<Props> {
    private statisticsService = new StatisticsService()

    componentDidMount(): void {
        console.log(this.props, 'props')
        Promise
            .all([
                this.statisticsService.getGroupsList(),
                this.statisticsService.getPlatformsList(),
                this.statisticsService.getOperatingSystemsList(),
                this.statisticsService.getBrowsersList(),
                this.statisticsService.getStatistics(this.props.query)
            ])
            .then(([ groups, platforms, operatingSystems, browsers, statistics ]) => {
                this.props.loadFilterList(setFilterList(groups, 'groups'))
                this.props.loadFilterList(setFilterList(platforms, 'platforms'))
                this.props.loadFilterList(setFilterList(operatingSystems, 'operatingSystems'))
                this.props.loadFilterList(setFilterList(browsers, 'browsers'))
                this.props.loadStatistics(setStatisticsData(statistics.rows))
            })
    }

    render(): React.ReactNode {
        return (
            <>
                <div className={styles.filtersRow}>
                    <DatePicker />
                    <DatePicker />
                    <Select
                        className={styles.wideSelect}
                        defaultValue={this.props.query.groupBy}
                        options={this.props.groups}
                    />
                </div>
                <div className={styles.filtersRow}>
                    <Select
                        className={styles.wideSelect}
                        defaultValue={this.props.query.platform}
                        options={this.props.platforms}
                    />
                    <Select
                        className={styles.wideSelect}
                        defaultValue={this.props.query.operatingSystems}
                        options={this.props.operatingSystems}
                    />
                    <Select
                        className={styles.wideSelect}
                        defaultValue={this.props.query.browsers}
                        options={this.props.browsers}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={this.props.data}
                />
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    console.log(state, 'state')
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch: Dispatch)  => ({
    loadFilterList: (action: Action) => dispatch(action),
    loadStatistics: (action: Action) => dispatch(action)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
