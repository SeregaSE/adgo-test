import React from 'react';
import '../scss/App.scss';
import HTTP from "../common/http";
import Toolbar from './Toolbar';
import DataTable from './DataTable';
import Fab from '@material-ui/core/Fab';

class App extends React.Component {

  /*
  Главный компонент приложения 
  Все HTTP запросы идут отсюда
  Здесь реализованы state и методы его изменения, которые передаются в дочерние компоненты
  */

  state = {
    from: "2019-08-31",
    to: "2019-09-21",
    browsers: "",
    operatingSystems: "",
    platform: "",
    groupBy: "day",
    limit: "25",
    offset: "0",
    initialQueries: false,
    tableRequestHasStarted: false,
    tableRequestHasEnded: false,
    dataToTable: {}
  }

  constructor(){
    super();
    this.startInitialQueries();
  }

  componentDidMount(){
  }

  changeDate = (label, date) => {
    if (label === "From"){
      this.setState(() => {
        return {from: date};
      });
    } else {
      this.setState(() => {
        return {to: date};
      });
    }
  }

  changeBrowsers = (value) => {

    this.setState(() => ({
      browsers: value.join(",")
    }));
  }

  changeOperatingSystems = (value) => {
    this.setState(() => ({
      operatingSystems: value.join(",")
    }));
  }

  changePlatform = (value) => {
    this.setState(() => ({platform: String(value)}));
  }

  changeGroupBy = (value) => {
    this.setState(() => ({groupBy: value}));
  }

  changeLimit = async (value) => {
    await this.setState(() => ({limit: String(value)}));
    await this.setState(() => ({tableRequestHasEnded: false}));
    this.submit();
  }

  changeOffset = async (value) => {
    await this.setState(() => ({offset: String(value)}));
    await this.setState(() => ({tableRequestHasEnded: false}));
    this.submit();
  }

  //запрос для получения данных для селектов
  startInitialQueries = async () => {
    let browsersResponse = await HTTP.get("/api/v1/browsers").then(data => data.data);
    let platformsResponse = await HTTP.get("/api/v1/platforms").then(data => data.data);
    let OSResponse = await HTTP.get("/api/v1/operating-systems").then(data => data.data);
    let groupsResponse = await HTTP.get("/api/v1/groups").then(data => data.data);

    this.setState(() => ({initialQueries: {
      browsers: browsersResponse,
      platforms: platformsResponse,
      os: OSResponse,
      groups: groupsResponse
    }}));
  }

  submit = async () => {
    this.setState(() => ({tableRequestHasStarted: true}));
    await HTTP.get("/api/v1/statistics", {
      // здесь вытаскиваются параметры для запроса статистики из state
      params: Object.fromEntries(Object.entries(this.state).filter(( item )=>( item[1] !== "" && typeof item[1] === "string" )))
    })
      .then(data => this.setState(() => ({dataToTable: data.data})));
    this.setState(() => ({tableRequestHasEnded: true}));
  }


  render(){
    return (
      <div className="main">
        <h1>Statistics App</h1>
        <div className="panel">
        <Toolbar 
          changeDate={this.changeDate}
          changeBrowsers={this.changeBrowsers}
          changeOperatingSystems={this.changeOperatingSystems}
          changePlatform={this.changePlatform}
          changeGroupBy={this.changeGroupBy}
          platform={this.state.platform}
          groupBy={this.state.groupBy}
          initialQueries={this.state.initialQueries}
          submit={this.submit}
          />
          <Fab  
            className="submit-button" 
            color="secondary" 
            aria-label="add"
            onClick={this.submit}>
              FIND
          </Fab>
        </div>
        {
          this.state.tableRequestHasStarted ?
             <DataTable 
              limit={this.state.limit}
              changeLimit={this.changeLimit}
              offset={this.state.offset}
              changeOffset={this.changeOffset}
              data={this.state.dataToTable} 
              isLoad={this.state.tableRequestHasEnded}/>
             : <div></div>
        }
      </div>
    )
  }
}

export default App;
