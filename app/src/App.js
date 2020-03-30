import React from 'react';
import moment from 'moment';
import { notification, Table } from 'antd';

import 'antd/dist/antd.css';
import './app.scss'; 

import { DatePicker, Select } from './components'
import { baseUrl } from './config'

export class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      from: moment().subtract(1, 'days'),
      to: moment(),
      groups: undefined,
      browsers: undefined,
      'operating-systems': undefined,
      platforms: undefined,
      statistics: undefined,
      loading: false,
      limit: 20,
      currentPage: 1,
      total: 0,
      columns: [
        {
          title: 'Day',
          dataIndex: 'day',
          key: 'day',
        },
        {
          title: 'Impressions',
          dataIndex: 'impressions',
          key: 'impressions',
        },
        {
          title: 'Conversions',
          dataIndex: 'conversions',
          key: 'conversions',
        },
        {
          title: 'Money',
          dataIndex: 'money',
          key: 'money',
        },
      ],
    }
  }

  onChangeRangePicker = (date) => {
    this.setState({
      from: date[0],
      to: date[1],
      currentPage: 1,
    }, this.onLoad)
  }

  onChangeSelect = (type, option) => {
    this.setState(state => {
      state[type] = option.value
      state.currentPage = 1

      if(type === 'groups'){
        state.columns[0].title = option.label || option.children
        state.columns[0].dataIndex = option.value
        state.columns[0].key = option.value
      }

      if (type === 'platforms') {
        state.browsers = undefined
        state['operating-systems'] = undefined
      }

      return state
    }, this.onLoad)
  }

  onChangePagination = (currentPage) => {
    this.setState({currentPage}, this.onLoad)
  }

  onLoad = () => {
    const {
      from, 
      to, 
      groups, 
      browsers, 
      platforms,
      limit,
      currentPage,
    } = this.state
    
    if(!groups) return

    this.setState({
      loading: true,
      statistics: undefined,
    })

    let url = `${baseUrl}/statistics`
    url += `?groupBy=${groups}`
    url += `&from=${from.format('YYYY-MM-DD')}`
    url += `&to=${to.format('YYYY-MM-DD')}`
    url += `&limit=${limit}`
    url += `&offset=${currentPage - 1}`

    if(browsers)
      url += `&browsers[]=${browsers}`

    if(platforms)
      url += `&platform=${platforms}`

    if(this.state['operating-systems'])
      url += `&operatingSystems[]=${this.state['operating-systems']}`


    fetch(url)
      .then((response) => {
        this.setState({loading: false})

        if(response.status === 200)
          return response.json()
          
        throw new Error('')
      })
      .then(
        response => {
          const group = this.state.groups
          const statistics = response.rows.map((item, index) => {
            return {
              key: index,
              [group]: item[group],
              impressions: item.impressions,
              conversions: item.clicks,
              money: item.money.toFixed(2),
            }
          })
          this.setState({
            statistics,
            total: response.count,
          })
        }, 
        () => {
          notification.error({
            message: 'Error',
            description: `Statistics not found`,
            duration: 3,
          })
        }
      )
  }

  render() {
    return (
      <div className="app">
        
        <div className="filter">
          <div className="filter-row">
            <DatePicker 
              from={this.state.from}
              to={this.state.to} 
              onChange={this.onChangeRangePicker}
            />

            <Select 
              title='Group by' 
              type='groups' 
              unClear={true}
              required={true}
              value={this.state.groups}
              onChange={this.onChangeSelect}
            />
          </div>

          <div className="filter-row">
            <Select 
              title='Platform' 
              type='platforms' 
              value={this.state.platforms}
              onChange={this.onChangeSelect}
            />

            <Select 
              multy={true}
              title='Operating System' 
              type='operating-systems' 
              platforms={this.state.platforms}
              value={this.state['operating-systems']}
              onChange={this.onChangeSelect}
            />

            <Select 
              multy={true}
              title='Browser' 
              type='browsers' 
              platforms={this.state.platforms}
              value={this.state.browsers}
              onChange={this.onChangeSelect}
            />
          </div>
        </div>

        <div className="content">
          <Table 
            dataSource={this.state.statistics} 
            columns={this.state.columns} 
            loading={this.state.loading}
            pagination={{
              defaultPageSize: this.state.limit,
              current: this.state.currentPage,
              total: this.state.total,
              onChange: this.onChangePagination,
            }}
          />
        </div>
      </div>
    );
  }
}
