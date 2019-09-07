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
      groupByName: 'day',
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
  }

  componentDidMount() {
    const url = '/v1/statistics?groupBy=' + this.state.groupBy + '&from="2019-08-10"&to="2019-08-19"';
    this.getApiData(url);
  }

  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value});

    if(name === 'groupBy')
      this.setState({ groupByName: name});

    const url = '/v1/statistics?groupBy=' + value + '&from="2019-08-10"&to="2019-08-19"';
    this.getApiData(url);
  }

  getApiData(url){
    axios.get(url).then(res => {
      this.setState({ tableData: res.data.rows});
    }).catch(err => {
      this.setState({ errorMessage: err.toString()});
    });
  }

  render(){
    if (this.state.errorMessage !== '') 
      return (
        <div className="alert alert-primary" role="alert">
          { this.state.errorMessage }
        </div>);
    return (
        <form /*onSubmit={this.handleSubmit}*/ className="form-group" >
            <div className="filters">
              <div className="form-group form-row">
                <DateContainer label="From" />
                <DateContainer label="To" />
              </div>
              <div className="form-group form-row">
                <FilterContainer url="/v1/groups" label="Groups" handleChange={this.handleChange} name="groupBy"  />
                <FilterContainer url="/v1/platforms" label="Platform" handleChange={this.handleChange} name="platform" />
                <FilterContainer url="/v1/operating-systems" label="Operating systems" name="operatingSystems"/>
                <FilterContainer url="/v1/browsers" label="Browsers" name="browsers" />
              </div>
            </div>
            <div className="table">
              <Table data={this.state.tableData} groupBy={this.state.groupBy} />
            </div>
        </form>
    );
  }
}

export default TableForm;
