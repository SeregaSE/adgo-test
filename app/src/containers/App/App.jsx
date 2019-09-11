import React, { Component } from "react";
import { SelectForm } from "../SelectForm";
import { Table } from "../Table";

import "./App.css";

export class App extends Component {
  state = {
    platforms: null,
    browsers: null,
    operatingSystems: null,
    groups: null,
    statistics: null,
    selects: {
      dateFrom: "",
      dateTo: "",
      groupBy: "day",
      platform: "",
      operatingSystem: "",
      browser: ""
    },
    isInputError: false
  };

  handleInput = type => ({ target: { value } }) => {
    this.setState({ selects: { ...this.state.selects, [type]: value } });
    setTimeout(() => console.log(this.state), 1000);
  };

  async componentDidMount() {
    await this.fetchAndSetState("/api/v1/platforms", "platforms");
    await this.fetchAndSetState("/api/v1/browsers", "browsers");
    await this.fetchAndSetState(
      "/api/v1/operating-systems",
      "operatingSystems"
    );
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

  fetchStatistics = async () => {
    const {
      dateFrom,
      dateTo,
      groupBy,
      platform,
      operatingSystem,
      browser
    } = this.state.selects;

    this.setState({ isInputError: false });

    try {
      if (!dateFrom && !dateTo) return alert("Enter correct date!");

      let url = `/api/v1/statistics?groupBy=${groupBy}&from=${dateFrom}&to=${dateTo}`;

      if (platform) {
        url += `&platform=${platform}`;
      }
      if (operatingSystem) {
        url += `&operatingSystems=${operatingSystem}`;
      }
      if (browser) {
        url += `&browsers=${browser}`;
      }

      console.log(url);

      const response = await fetch(url);
      const result = await response.json();
      this.setState({ statistics: result });
    } catch (error) {
      console.error(error);
    }
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
    return (
      <div className="app">
        <SelectForm
          platforms={platforms}
          browsers={browsers}
          operatingSystems={operatingSystems}
          groups={groups}
          handleInput={this.handleInput}
          onSubmit={this.fetchStatistics}
        />
        <Table statistics={statistics} />
      </div>
    );
  }
}
