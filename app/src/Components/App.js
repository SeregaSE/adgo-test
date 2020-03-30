import React, { Component } from 'react';
import Table from './Table';
import Filters from './Filters';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dateFrom:'2019-08-09',
      dateTo: '2019-08-10',
      groupBy: 'day',
      platform:'',
      OS:[],
      browser:[]
    }
  }
  changeFrom = (value) => {
    this.setState({
      dateFrom:value
    })
  }
  changeTo = (value) => {
    this.setState({
      dateTo:value
    })
  }
  changeGroupBy = (value) =>{
    this.setState({
      groupBy:value
    })
  }
  changePlatform = (value) => {
    this.setState({
      platform:value
    })
  }
  changeOS = (value) => {
    let { OS } = this.state;

    if(OS.includes(value)){
      this.setState({
        OS:OS.filter(el => el!==value)
      })
    }else{
      this.setState({
        OS:[...this.state.OS, value]
      })
    }
  }
  changeBrowser = (value) =>{
    let { browser } = this.state;

    if(browser.includes(value)){
      this.setState({
        browser:browser.filter(el => el!==value)
      })
    }else{
      this.setState({
        browser:[...this.state.browser, value]
      })
    }
  }
  render() {
    const { dateFrom, dateTo, groupBy, platform, OS, browser} = this.state
    return (
      <div className="card main-conteiner">
        <Filters 
          changeFrom={this.changeFrom} 
          changeTo={this.changeTo} 
          changeGroupBy={this.changeGroupBy} 
          changePlatform={this.changePlatform} 
          changeOS={this.changeOS} 
          changeBrowser={this.changeBrowser}
          />
        <Table dateFrom={dateFrom} dateTo={dateTo} groupBy={groupBy} platform={platform} OS={OS} browser={browser} />
        
      </div>
    )
  }
}

export default App;

