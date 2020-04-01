import React, { Component } from 'react';
import axios from '../utils/axios';
import { differenceWith } from 'lodash';
import dateToString from '../utils/dateToString';
import stringToDate from '../utils/stringToDate';
import DatePicker from 'react-datepicker';
import { Table, DropdownButton, Dropdown } from 'react-bootstrap';
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
    }
  }

  componentDidMount() {
    axios.get('/groups').then(res => {
      this.setState({ groupsList: res.data }); 
      this.setState({ currentGroup: this.state.groupsList[0] }); 
      axios.get(`/statistics?groupBy=${this.state.currentGroup.value}&from=${this.state.from}&to=${this.state.to}`)
      .then(res => this.setState({ currentList: res.data.rows }));
    });
  }

  componentDidUpdate() {
    axios.get(`/statistics?groupBy=${this.state.currentGroup.value}&from=${this.state.from}&to=${this.state.to}`)
      .then(res => {
        if (differenceWith(this.state.currentList, res.data.rows, _.isEqual).length) {
          this.setState({ currentList: res.data.rows }); 
        }  
        console.log(res.data);
      });
  }
  render() {
    const { currentList, groupsList, currentGroup, from, to } = this.state; 
    return(
      <div>
        <div className="menu">
          <DatePicker 
            maxDate={stringToDate(to)} 
            selected={stringToDate(from)} 
            onChange={date => {
              this.setState({from: dateToString(date)});
              console.log(date);
            }}
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
      </div>
    )
  }
}

export default App;