import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DatePicker, Select, Table } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'

import { AppState } from './store/types'
import { StatisticsService } from './api/v1/statistics'
import { SearchParams } from './api/v1/statistics/interfaces'
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
   dispatch: Dispatch
}

class App extends Component<Props> {
    private statisticsService = new StatisticsService()

    private async fetchStatistics(offset: number = this.props.query.offset) {
        const statistics = await this.statisticsService.getStatistics({ ...this.props.query, offset })
        this.props.dispatch(setStatisticsData(statistics))
    }

    private changeDate(key: keyof Pick<SearchParams, 'from' | 'to'>) {
        return async (date: moment.Moment) => {
            await this.props.dispatch(changeQuery({ [key]: date.format('YYYY-MM-DD') }))
            await this.fetchStatistics()
        }
    }

    private changeFilter(key: keyof SearchParams) {
        return async (value: string) => {
            await this.props.dispatch(changeQuery({ [key]: value }))
            await this.fetchStatistics()
        }
    }

    componentDidMount(): void {
        const { dispatch } = this.props
        Promise
            .all([
                this.statisticsService.getGroupsList(),
                this.statisticsService.getPlatformsList(),
                this.statisticsService.getOperatingSystemsList(),
                this.statisticsService.getBrowsersList(),
                this.fetchStatistics()
            ])
            .then(([ groups, platforms, operatingSystems, browsers ]) => {
                dispatch(setFilterList(groups, 'groups'))
                dispatch(setFilterList(platforms, 'platforms'))
                dispatch(setFilterList(operatingSystems, 'operatingSystems'))
                dispatch(setFilterList(browsers, 'browsers'))
            })
    }

    render(): React.ReactNode {
        const { query, groups, platforms, operatingSystems, browsers, data } = this.props
        return (
            <>
                <div className={styles.filtersRow}>
                    <DatePicker
                        defaultValue={moment(new Date(query.from))}
                        onChange={this.changeDate('from')}
                    />
                    <DatePicker
                        defaultValue={moment(new Date(query.to))}
                        onChange={this.changeDate('to')}
                    />
                    {!!groups.length &&
                        <Select
                            className={styles.wideSelect}
                            defaultValue={groups[0].value}
                            options={groups}
                            onChange={this.changeFilter('groupBy')}
                        />
                    }
                </div>
                <div className={styles.filtersRow}>
                    {!!platforms.length &&
                        <Select
                            className={styles.wideSelect}
                            defaultValue={platforms[0].value}
                            options={platforms}
                            onChange={this.changeFilter('platform')}
                        />
                    }
                    {!!operatingSystems.length &&
                        <Select
                            className={styles.wideSelect}
                            defaultValue={operatingSystems[0].value}
                            options={operatingSystems}
                            onChange={this.changeFilter('operatingSystems')}
                        />
                    }
                    {!!browsers.length &&
                        <Select
                            className={styles.wideSelect}
                            defaultValue={browsers[0].value}
                            options={browsers}
                            onChange={this.changeFilter('browsers')}
                        />
                    }
                </div>
                {!!data &&
                    <Table
                        columns={columns}
                        pagination={{
                            total: data.count,
                            onChange: (page, size) => {
                                this.fetchStatistics(page * size)
                            }
                        }}
                        dataSource={data.rows.map((row, i) => ({ key: i, ...row }))}
                    />
                }
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
