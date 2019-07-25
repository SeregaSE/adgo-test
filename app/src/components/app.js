import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchBrowsers,
  fetchGroups,
  fetchOperatingSystems,
  fetchPlatforms,
  fetchStatistics
} from "../actions";

class App extends Component {
  componentDidMount() {
    const {
      fetchBrowsers,
      fetchGroups,
      fetchOperatingSystems,
      fetchPlatforms,
      fetchStatistics
    } = this.props;
    fetchBrowsers();
    fetchGroups();
    fetchOperatingSystems();
    fetchPlatforms();
    fetchStatistics({
      groupBy: "day",
      from: "2019-07-01",
      to: "2019-07-07"
    });
  }

  render() {
    return <div />;
  }
}
const mapStateToProps = (state, ownProps) => ({
  state: state
});

const mapDispatchToProps = {
  fetchBrowsers,
  fetchGroups,
  fetchOperatingSystems,
  fetchPlatforms,
  fetchStatistics
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
