import React from 'react';
import FilterContainer from './FilterContainer';
import DateContainer from './DateContainer';
import Table from './Table';
import axios from 'axios';
import Pagination from './Pagination';
import PageCount from './PageCount';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      groupBy: 'day',
      groupName: 'Day',
      from: '2019-08-01',
      to: '2019-08-19',
      limit: 10,
      offset: 0,
      platform: '',
      browsers: [],
      operatingSystems: [],
      errorMessage: '',
      pageCount: 0, 
      emptyData: false
    };
  }

  componentDidMount() {
    const url = this.getUrl();
    this.getApiData(url);
  }

  // Get new data on filter change.
  handleFilterChange = e => {
    const name = e.target.name;
    let groupName = this.state.groupName;
    let value = '';
    const options = e.target.options;
    let optionsArr = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        optionsArr.push(options[i].value);
      }
    }
    if (optionsArr.length === 1){
      value = optionsArr[0];
    } else {
      value = optionsArr;
    }
    
    
    if (name === 'groupBy'){
      const index = e.target.selectedIndex;
      groupName = e.target[index].text;
    }
    
    this.setState({[name]: value, groupName}, this.sendRequest);
  }

  // Concat url link from states.
  getUrl = () =>{
    const {groupBy, from, to, platform, browsers, operatingSystems, offset, limit} = this.state;
    let url = '/v1/statistics?groupBy=' + groupBy 
              + '&from=' + from 
              + '&to=' + to 
              + '&limit=' + limit 
              + '&offset=' + offset;

    if (platform !== '') 
      url += '&platform=' + platform;
    if (browsers !== []) {
      for (let i = 0, l = browsers.length; i < l; i++){
        url += '&browsers[]=' + browsers[i];
      }
    }
    if (operatingSystems !== []){
      for (let i = 0, l = operatingSystems.length; i < l; i++) {
        url += '&operatingSystems[]=' + operatingSystems[i];
      }
    }
    return url;
  }

  // Request data from api.
  getApiData = (url) => {
    axios.get(url).then(res => {
      if (res.data.count === 0) {
        this.setState({emptyData: true})
      } else {
        this.setState({ tableData: res.data.rows, 
                        emptyData: false, 
                        pageCount: res.data.count/this.state.limit});
      }
    }).catch(err => {
      this.handleError(err);
    });
  }

  handleError = (error) => {
    this.setState({ errorMessage: error.toString()});
  }

  // Set new date on date change and get new data.
  handleDateChange = (state, newDate) => {
    this.setState({[state]: newDate}, this.sendRequest);
  }

  sendRequest = () => {
    const url = this.getUrl();
    this.getApiData(url);
  }

  // Get new data on page change.
  handlePageClick = data => {
    let selected = data.selected;
    this.setState({ offset: selected }, this.sendRequest);
  };

  // Set limit per page for table.
  changePageCount = (e) => {
    e.preventDefault();
    let limit = parseInt(e.target.name);
    this.setState({limit}, this.sendRequest);
  }

  render(){
    const {errorMessage, from, to, groupBy, groupName, tableData, emptyData, limit} = this.state;
    let table, pagination;

    if (errorMessage !== '') 
      return (
        <div className="alert alert-primary" role="alert">
          { errorMessage }
        </div>);

    if (!emptyData) {
      table = <Table data={tableData} groupBy={groupBy} groupName={groupName} />;
      pagination = <Pagination pageCount={this.state.pageCount} handlePageClick={this.handlePageClick}/>;
    } else {
      table = <div className="table-no-data alert alert-primary">No Result Found</div>;
      pagination = null;
    }

    return (
        <form className="form-group" >
            <div className="filters">
              <div className="form-group form-row">
                <DateContainer from={from} to={to} setDate={this.handleDateChange}/>
                <PageCount limit={limit} handleClick={this.changePageCount} />
              </div>
              <div className="form-group form-row">
                <FilterContainer  url="/v1/groups" 
                                  label="Groups" 
                                  handleChange={this.handleFilterChange} 
                                  name="groupBy"
                                  isMultiple={false}
                                  handleError={this.handleError} />
                <FilterContainer  url="/v1/platforms" 
                                  label="Platform" 
                                  handleChange={this.handleFilterChange} 
                                  name="platform" 
                                  isMultiple={false}
                                  handleError={this.handleError} />
                <FilterContainer  url="/v1/operating-systems" 
                                  label="Operating systems" 
                                  handleChange={this.handleFilterChange} 
                                  name="operatingSystems"
                                  isMultiple={true}
                                  handleError={this.handleError} />
                <FilterContainer  url="/v1/browsers" 
                                  label="Browsers" 
                                  handleChange={this.handleFilterChange}
                                  name="browsers"
                                  isMultiple={true}
                                  handleError={this.handleError} />
              </div>
            </div>
            <div className="table">
              {table}
            </div>
            <div className="pagination">
              {pagination}
            </div>
        </form>
    );
  }
}

export default Form;
