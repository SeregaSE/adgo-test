import React, { Component } from "react";
import "./App.scss";
import { PlatformsContainer } from "./components/platforms/PlatformsContainer";
import { OsContainer } from "./components/operating-systems/OsContainer";
import { BrowsersContainer } from "./components/browsers/BrowserContainer";
import { GroupsContainer } from "./components/groups/GroupsContainer";
import { Table } from "./components/table/Table";
import { getStatistic } from "./apiAxios/apiAxios";
import { constructQueryString } from "./utils/utils";
import { Pagination } from "./components/pagination/Pagination";
import { DateInputs } from "./components/dates/DateInputs";
import { PaginationLimits } from "./components/paginationLimits/PaginationLimits";
export class App extends Component {
  state = {
    filters: {
      groupBy: "",
      from: "",
      to: "",
      platform: "",
      browsers: [],
      operatingSystems: [],
      limit: 25,
      offset: 0
    },
    count: null,
    currentPage: 1,
    rows: [],
    total: []
  };

  setTableCurrentPage = page => {
    this.setState({
      currentPage: Number(page),
      offset: this.state.currentPage - 1
    });
  };
  clearStateRows = () => {
    this.setState({
      rows: [],
      total: []
    });
  };
  getData = async (key, value) => {
    await this.setState({
      filters: { ...this.state.filters, [key]: value }
    });
    const { filters } = this.state;

    if (!filters.from || !filters.to || !filters.groupBy) return;

    const resultQueryString = constructQueryString(filters);
    this.clearStateRows();
    const response = await getStatistic(resultQueryString);
    const {
      data: { rows, total, count }
    } = response;

    this.setState({ rows, total, count });
  };

  render() {
    const {
      rows,
      currentPage,
      total,
      count,
      filters: { groupBy, operatingSystems, browsers, limit }
    } = this.state;
    return (
      <div className="App">
        <div className="container">
          <h1>Statistic</h1>
          <div className="table">
            <div className="tableFilters">
              <div className="tableRow1">
                <div className="tableElem">
                  <DateInputs getData={this.getData} />
                </div>
                <div className="tableElem required">
                  <GroupsContainer
                    getData={this.getData}
                    clearStateRows={this.clearStateRows}
                  />
                </div>
              </div>
              <div className="tableRow2">
                <div className="tableElem">
                  <PlatformsContainer
                    getData={this.getData}
                    groupBy={groupBy}
                  />
                </div>
                <div className="tableElem">
                  <OsContainer
                    getData={this.getData}
                    operatingSystems={operatingSystems}
                    groupBy={groupBy}
                  />
                </div>
                <div className="tableElem">
                  <BrowsersContainer
                    getData={this.getData}
                    browsers={browsers}
                    groupBy={groupBy}
                  />
                </div>
              </div>
            </div>
            <div className="tableData">
              <Table rows={rows} total={total} groupBy={groupBy} />
            </div>
          </div>
          <div className="paginationWrapper">
            <Pagination
              rows={rows}
              count={count}
              limit={limit}
              currentPage={currentPage}
              setTableCurrentPage={this.setTableCurrentPage}
              getData={this.getData}
            />
            <div className="paginationLimits">
              <PaginationLimits getData={this.getData} limit={limit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
