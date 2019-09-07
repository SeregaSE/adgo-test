import React from 'react';
import FilterContainer from './FilterContainer';
import DateContainer from './DateContainer';
import Table from './Table';
import axios from 'axios';

class TableForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      groupBy: 'day',
      groupName: 'Day',
      from: '2019-08-10',
      to: '2019-08-19',
      limit: 25,
      offset: 0,
      platform: '',
      browsers: '',
      operatingSystems: '',
      errorMessage: '',
    };

     this.handleChange = this.handleChange.bind(this);
     this.getApiData = this.getApiData.bind(this);
     this.getUrl = this.getUrl.bind(this);
  }

  componentDidMount() {
    const url = '/v1/statistics?groupBy=' + this.state.groupBy + '&from="2019-08-10"&to="2019-08-19"';
    this.getApiData(url);
  }

  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const groupName = e.target[index].text
    
    this.setState({[name]: value, groupName}, ()=>{
      const url = this.getUrl();
      this.getApiData(url);
    });
  }

  getUrl(){
    const {groupBy, from, to, platform, browsers, operatingSystems} = this.state;
    let url = '/v1/statistics?groupBy=' + groupBy + '&from=' + from + '&to=' + to;
    if (platform !== '') 
      url += '&platform=' + platform;
    if (browsers !== '') 
      url += '&browsers=' + browsers;
    if (operatingSystems !== '') 
      url += '&operatingSystems=' + operatingSystems;
    return url;
  }

  getApiData(url){
    axios.get(url).then(res => {
      this.setState({ tableData: res.data.rows});
    }).catch(err => {
      this.setState({ errorMessage: err.toString()});
    });
  }

  render(){
    const {errorMessage, from, to, groupBy, groupName, tableData} = this.state;
    if (errorMessage !== '') 
      return (
        <div className="alert alert-primary" role="alert">
          { errorMessage }
        </div>);
    return (
        <form /*onSubmit={this.handleSubmit}*/ className="form-group" >
            <div className="filters">
              <div className="form-group form-row">
                <DateContainer label="From" date={from} />
                <DateContainer label="To" date={to} />
              </div>
              <div className="form-group form-row">
                <FilterContainer  url="/v1/groups" 
                                  label="Groups" 
                                  handleChange={this.handleChange} 
                                  name="groupBy"  />
                <FilterContainer  url="/v1/platforms" 
                                  label="Platform" 
                                  handleChange={this.handleChange} 
                                  name="platform" />
                <FilterContainer  url="/v1/operating-systems" 
                                  label="Operating systems" 
                                  handleChange={this.handleChange} 
                                  name="operatingSystems"/>
                <FilterContainer  url="/v1/browsers" 
                                  label="Browsers" 
                                  handleChange={this.handleChange}
                                  name="browsers" />
              </div>
            </div>
            <div className="table">
              <Table data={tableData} groupBy={groupBy} groupName={groupName} />
            </div>
        </form>
    );
  }
}

export default TableForm;
