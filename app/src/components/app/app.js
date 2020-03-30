import React, { Component } from "react";
import "./app.scss";
import Table from "../table";
import FiltersField from "../filters-field";
import Pagination from "../pagination";
import withAPIService from "../hoc/with-APIService";

class App extends Component {
  state = {
    groupBy: "Day",
    groups: [],
    operatingSystems: [],
    browsers: [],
    platforms: [],

    selectedDateFrom: null,
    selectedDateTo: new Date(),

    offset: 0,
    totalItems: 0,

    currentFilter: null,
  };

  onSelectHandler = e => {
    // console.log("hello", e.target.value);
    // this.setState({
    //   currentFilter: e.target.value
      
    // })
    console.log(e, "eeee")
    if (!e) return null
    const arrayOfLabels = e.map((item) => {
      return item.label
    })
    this.setState({
      currentFilter: arrayOfLabels
    })
  };

  componentDidMount() {
    this.updateItem();
  }

  updateItem() {
    const {
      getGroups,
      getOperatingSystems,
      getBrowsers,
      getPlatforms
    } = this.props;

    getGroups().then(item => {
      this.setState({
        groups: item
      });
    });

    getBrowsers().then(item => {
      this.setState({
        browsers: item
      });
    });

    getOperatingSystems().then(item => {
      this.setState({
        operatingSystems: item
      });
    });

    getPlatforms().then(item => {
      this.setState({
        platforms: item
      });
    });
  }

  onGroupBySelector = e => {
    const value = e.target.value;
    this.setState({
      groupBy: value
    });
  };

  changeDateFrom = date => {
    this.setState({
      selectedDateFrom: date
    });
  };

  changeDateTo = date => {
    this.setState({
      selectedDateTo: date
    });
  };

  changeOffset = (operation) => {
    if (operation === "+") {
      this.setState({
        offset: this.state.offset + 1,
      })
    }
    if (operation === "-") {
      this.setState({
        offset: this.state.offset - 1,
      })
    } else {
      this.setState({
        offset: operation
      })
    }
  }

  changeTotalItems = (total) => {
    this.setState({
      totalItems: total
    })
  }

  render() {
    const {
      platforms,
      browsers,
      operatingSystems,
      groups,
      selectedDateFrom,
      selectedDateTo,
      groupBy,
      offset,
      totalItems,
      currentFilter
    } = this.state;
    return (
      <>
        <div className="container">
          <FiltersField
            onSelectHandler={this.onSelectHandler}
            onGroupBy={this.onGroupBySelector}
            platforms={platforms}
            browsers={browsers}
            operatingSystems={operatingSystems}
            groups={groups}
            changeDateFrom={this.changeDateFrom}
            changeDateTo={this.changeDateTo}
            selectedDateFrom={selectedDateFrom}
            selectedDateTo={selectedDateTo}
            testFunc={this.testFunc}
            groupBy={groupBy}
          />
          <Table
            groupBy={groupBy}
            groups={groups}
            dateFrom={selectedDateFrom}
            dateTo={selectedDateTo}
            offset={offset}
            changeTotalItems={this.changeTotalItems}
            currentFilter={currentFilter}
          />
          <Pagination
            changeOffset={this.changeOffset}
            total={totalItems}
          />
        </div>
      </>
    );
  }
}

const mapMethodsToProps = ({
  getStatistics,
  getGroups,
  getOperatingSystems,
  getBrowsers,
  getPlatforms
}) => {
  return {
    getStatistics,
    getGroups,
    getOperatingSystems,
    getBrowsers,
    getPlatforms
  };
};

export default withAPIService(mapMethodsToProps)(App);
