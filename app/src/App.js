import React from 'react';
import moment from 'moment';
import { notification } from 'antd';

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
      statistics: [],
      loading: false,
      limit: 20,
      offset: 0,
    }
  }

  onChangeRangePicker = (date) => {
    this.setState({
      from: date[0],
      to: date[1],
    }, this.onLoad)
  }

  onChangeSelect = (type, value) => {
    this.setState({
      [type]: value,
    }, this.onLoad)
  }

  onLoad = () => {
    const {
      from, 
      to, 
      groups, 
      browsers, 
      platforms,
      limit,
      offset,
    } = this.state
    
    if(!groups) return

    this.setState({loading: true})
    let url = `${baseUrl}/statistics`
    url += `?groupBy=${groups}`
    url += `&from=${from.format('YYYY-MM-DD')}`
    url += `&to=${to.format('YYYY-MM-DD')}`
    url += `&limit=${limit}`
    url += `&offset${offset}`

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
        statistics => this.setState({statistics}), 
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
      </div>
    );
  }
}
