import React, { Component } from 'react';

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import uniqid from 'uniqid';


import './App.css'

import AppHeader from '../AppHeader'
import ControlPanel from '../ControlPanel'
import Table from '../Table'

import handleSelectChange from '../../Scripts/handleSelectChange'
import getDataFromApi from '../../Scripts/getDataFromApi'


const urls = [
  {name: 'groups', url:`http://127.0.0.1:3000/api/v1/groups`, param: 'groupBy', multiple: false},
  {name: 'platform', url:`http://127.0.0.1:3000/api/v1/platforms`, param: 'platform', multiple: false},
  {name: 'operating systems', url:`http://127.0.0.1:3000/api/v1/operating-systems`, param: 'operatingSystems', multiple: true},
  {name: 'browsers', url:`http://127.0.0.1:3000/api/v1/browsers`, param: 'browsers', multiple: true},
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options:[],
      data:{},
      from:'',
      to: '',
    }
    this.handleSelectChange = handleSelectChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getDataFromApi = getDataFromApi.bind(this)
  }


  componentDidMount() {
    urls.forEach(url => {
      fetch(url.url)
      .then((response) => response.json())
      .then((response) => {
        const newOptions = Array.from(this.state.options);
        newOptions.push({name: url.name, param: url.param, options: response, multiple: url.multiple})
        this.setState({
          options: newOptions,
        })
      })
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.from === this.state.from && prevState.to === this.state.to && prevState.groupBy === this.state.groupBy) {
      return
    }
    if (this.state.from && this.state.to && this.state.groupBy) {
      this.getDataFromApi();
    }
  }

  handleDateChange = (name) => (date) => {
    this.setState({
      [name]: date,
    })
   }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>  
        <div className='statistic-app'>
          <AppHeader />
          <ControlPanel > 
            <DatePicker label="From" name="from" value={this.state.from? this.state.from : Date.now()} format="yyyy/MM/dd" onChange={this.handleDateChange('from')}/>
            <DatePicker label="To" name="to" value={this.state.to? this.state.from : Date.now()} format="yyyy/MM/dd" onChange={this.handleDateChange('to')}/>
            {this.state.options.map(option => {
              return (
                <select className="custom-select" key={uniqid.time()} name={option.param} onChange={this.handleSelectChange} multiple={option.multiple} value={this.state[option.param]}>
                  <option value={0}>{`Select ${option.name}`}</option>
                  {option.options.map(newOption =>{
                    return (
                      <option 
                        value={newOption.value} 
                        key={uniqid.time()}
                      >{newOption.label}</option>
                    )
                  })}
                </select>
              )
            })}
          </ControlPanel>
          <Table data={this.state.data}/>
        </div>
      </MuiPickersUtilsProvider>  
    );
  }
}

export default App;
