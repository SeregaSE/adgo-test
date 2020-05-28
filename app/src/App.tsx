import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DatePicker, Select, Table } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'

import { Action, AppState } from './store/types'
import { StatisticsService } from './api/v1/statistics'
import { SearchParams } from './api/v1/statistics/interfaces'
import { setFilterList, changeQuery, setStatisticsData, FilterKey } from './store/actions'
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
   dispatch: Dispatch
}

class App extends Component<Props> {
    private statisticsService = new StatisticsService()

    private changeDate(key: keyof Pick<SearchParams, 'from' | 'to'>) {
        return (date: moment.Moment) => {
            this.props.dispatch(changeQuery({ [key]: date.format('YYYY-MM-DD') }))
        }
    }

    private changeFilter(key: keyof SearchParams) {
        return (value: string) => {
            this.props.dispatch(changeQuery({ [key]: value }))
        }
    }

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
                this.props.dispatch(setFilterList(groups, 'groups'))
                this.props.dispatch(setFilterList(platforms, 'platforms'))
                this.props.dispatch(setFilterList(operatingSystems, 'operatingSystems'))
                this.props.dispatch(setFilterList(browsers, 'browsers'))
                this.props.dispatch(setStatisticsData(statistics.rows))
            })
    }

    render(): React.ReactNode {
        return (
            <>
                <div className={styles.filtersRow}>
                    <DatePicker
                        defaultValue={moment(new Date(this.props.query.from))}
                        onChange={this.changeDate('from')}
                    />
                    <DatePicker
                        defaultValue={moment(new Date(this.props.query.to))}
                        onChange={this.changeDate('to')}
                    />
                    <Select
                        className={styles.wideSelect}
                        defaultValue={this.props.query.groupBy}
                        options={this.props.groups}
                        onChange={this.changeFilter('groupBy')}
                    />
                </div>
                <div className={styles.filtersRow}>
                    <Select
                        className={styles.wideSelect}
                        defaultValue={this.props.query.platform}
                        options={this.props.platforms}
                        onChange={this.changeFilter('platform')}
                    />
                    <Select
                        className={styles.wideSelect}
                        defaultValue={this.props.query.operatingSystems}
                        options={this.props.operatingSystems}
                        onChange={this.changeFilter('operatingSystems')}
                    />
                    <Select
                        className={styles.wideSelect}
                        defaultValue={this.props.query.browsers}
                        options={this.props.browsers}
                        onChange={this.changeFilter('browsers')}
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

export default connect(mapStateToProps)(App)
