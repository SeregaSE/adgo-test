import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchBrowsers,
  fetchGroups,
  fetchOperatingSystems,
  fetchPlatforms,
  fetchStatistics
} from "../actions";
import Form from "./form";
import Table from "./table";
class App extends Component {
  componentDidMount() {
    const {
      fetchBrowsers,
      fetchGroups,
      fetchOperatingSystems,
      fetchPlatforms
    } = this.props;
    fetchBrowsers();
    fetchGroups();
    fetchOperatingSystems();
    fetchPlatforms();
  }

  render() {
    return (
      <>
        <Form />
        <Table />
      </>
    );
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
