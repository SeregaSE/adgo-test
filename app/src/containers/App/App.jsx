import React, { Component } from "react";
import { Table } from "../../components/table";

import "./App.css";

export class App extends Component {
  state = {
    platforms: null,
    browsers: null,
    operatingSystems: null,
    groups: null,
    statistics: null
  };

  async componentDidMount() {
    await this.fetchAndSetState("/api/v1/platforms", "platforms");
    await this.fetchAndSetState("/api/v1/browsers", "browsers");
    await this.fetchAndSetState("/api/v1/operating-systems", "OS");
    await this.fetchAndSetState("/api/v1/groups", "groups");
    await this.fetchAndSetState("/api/v1/browsers", "browsers");
    await this.fetchAndSetState(
      "/api/v1/statistics?groupBy=day&from=2019-07-01&to=2019-09-07",
      "statistics"
    );
    console.log("STATE", this.state);
  }

  async fetchAndSetState(url, stateKey) {
    try {
      const response = await fetch(url);
      const result = await response.json();
      this.setState({ [stateKey]: result });
    } catch (error) {
      console.error(error);
    }
  }

  fetchStatistics = async (
    groupBy,
    from,
    to,
    platform = null,
    browsers = null,
    operatingSystems = null
  ) => {
    try {
      let url = `/api/v1/statistics?groupBy=${groupBy}&from=${from}&to=${to}`;

      if (platform) {
        url += `&platform=${platform}`;
      }
      if (browsers) {
        url += `&browsers=${browsers}`;
      }
      if (operatingSystems) {
        url += `&operatingSystems=${operatingSystems}`;
      }

      console.log(url);

      const response = await fetch(url);
      const result = await response.json();
      this.setState({ statistics: result });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = () => {
    console.log("Handle change!");
  };

  render() {
    if (!this.state.statistics) return null;
    const {
      platforms,
      browsers,
      operatingSystems,
      groups,
      statistics
    } = this.state;
    return <div className="app"></div>;
  }
}
