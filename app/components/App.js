import React, { Component } from 'react';
import axios from '../utils/axios';
import { differenceWith } from 'lodash';
import dateToString from '../utils/dateToString';
import stringToDate from '../utils/stringToDate';
import getPaginationArray from '../utils/getPaginationArray';
import DatePicker from 'react-datepicker';
import { Table, DropdownButton, Dropdown, Pagination } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: [],
      from: '2019-07-01',
      to: '2019-08-01',
      currentGroup: {},
      groupsList: [],
      browsersList: [], 
      currentBrowser: {}, 
      operatingSystemsList: [],
      currentOperatingSystem: {},
      platformsList: [],
      currentPlatform: {},
      limit: 10,
      offset: 0,
      total: {},
      array: [],
    }
  }

  componentDidMount() {
    axios.get('/groups').then(res => {
      this.setState({ groupsList: res.data }); 
      this.setState({ currentGroup: this.state.groupsList[0] }); 
      axios.get(`/statistics?groupBy=${this.state.currentGroup.value}&from=${this.state.from}&to=${this.state.to}&limit=${this.state.limit}`)
      .then(res => {
        this.setState({ currentList: res.data.rows });
        this.setState({ array: getPaginationArray(res.data.count, this.state.limit) });
        this.setState({ total: res.data.total });
      });
    });
    axios.get('/platforms').then(res => this.setState({ platformsList: res.data }));
    axios.get('/browsers').then(res => this.setState({ browsersList: res.data }));
    axios.get('/operating-systems').then(res => this.setState({ operatingSystemsList: res.data }));
  }

  componentDidUpdate() {
    const params = {
      groupBy: this.state.currentGroup.value,
      from: this.state.from,
      to: this.state.to,
      platform: this.state.currentPlatform.value,
      'browsers[]': this.state.currentBrowser.value,
      'operatingSystems[]': this.state.currentOperatingSystem.value,
      limit: this.state.limit,
      offset: this.state.offset,
    }

    Object.keys(params).forEach(name => {
      if (params[name] === undefined) delete params[name];
    })
    axios.get('/statistics', { params }).then(res => {
        if (differenceWith(this.state.currentList, res.data.rows, _.isEqual).length) {
          this.setState({ currentList: res.data.rows });
          this.setState({ array: getPaginationArray(res.data.count, this.state.limit) });
          this.setState({ total: res.data.total });
        }  
      });
  }
  render() {
    const { currentList, groupsList, currentGroup, from, to, platformsList, currentPlatform, total,
      browsersList, currentBrowser, operatingSystemsList, currentOperatingSystem, array } = this.state; 
    return(
      <div>
        <div className="menu">
          <DatePicker 
            maxDate={stringToDate(to)} 
            selected={stringToDate(from)} 
            onChange={date => this.setState({from: dateToString(date)})}
          />
          <DatePicker 
            minDate={stringToDate(from)} 
            selected={stringToDate(to)}
            onChange={date => this.setState({to: dateToString(date)})} 
          />
          <DropdownButton id="group" title={currentGroup.label}>
            {groupsList.map(group => {
              return (
                <Dropdown.Item onSelect={() => {
                  this.setState({ currentGroup: group });
                }}>{group.label}</Dropdown.Item>
              )
            })}
          </DropdownButton>
          <DropdownButton id="platform" title={currentPlatform.label || 'choose platform'}>
            {platformsList.map(platform => {
              return (
                <Dropdown.Item onSelect={() => {
                  this.setState({ currentPlatform: platform });
                  this.setState({ currentBrowser: {} });
                  this.setState({ currentOperatingSystem: {} });
                }}>{platform.label}</Dropdown.Item>
              )
            })}
          </DropdownButton>
          <DropdownButton id="browser" title={currentBrowser.label || 'choose browser'}>
            {browsersList.map(browser => {
              if (currentPlatform.value) {
                if (browser.platform === currentPlatform.value) {
                  return (
                    <Dropdown.Item onSelect={() => {
                      this.setState({ currentBrowser: browser });
                    }}>{browser.label}</Dropdown.Item>
                  )
                }
              } else return (
                <Dropdown.Item onSelect={() => {
                  this.setState({ currentBrowser: browser });
                }}>{browser.label}</Dropdown.Item>
              )
            })}
          </DropdownButton>
          <DropdownButton id="operatingSystem" title={currentOperatingSystem.label || 'choose operatingSystem'}>
            {operatingSystemsList.map(system => {
              if (currentPlatform.value) {
                if (system.platform === currentPlatform.value) {
                  return (
                    <Dropdown.Item onSelect={() => {
                      this.setState({ currentOperatingSystem: system });
                    }}>{system.label}</Dropdown.Item>
                  )
                }
              } else return (
                <Dropdown.Item onSelect={() => {
                  this.setState({ currentOperatingSystem: system });
                }}>{system.label}</Dropdown.Item>
              )
            })}
          </DropdownButton>
        </div>

        <div className="total">
          <h5>Summary:</h5>
          <div className="data">
            {Object.keys(total).map(elem => {
              return (
              <div>
                <strong>{elem}</strong> : {total[elem]}
              </div>
            )})}
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{this.state.currentGroup.label}</th>
              <th>Impressions</th>
              <th>Conversions</th>
              <th>Money</th>
            </tr>
          </thead>
          <tbody>
            {currentList.map(row => {
              return (
              <tr>
                <td>{row[this.state.currentGroup.value]}</td>
                <td>{row.impressions}</td>
                <td>{row.clicks}</td>
                <td>{row.money}</td>
              </tr>)
            })}
          </tbody>
        </Table>
        <Pagination>
          {array.map(item => {
            return (
              <Pagination.Item onClick={() => this.setState({ offset: item })} active={item === this.state.offset}>
                {item+1}
              </Pagination.Item> 
            )
          })}
        </Pagination>
      </div>
    )
  }
}

export default App;