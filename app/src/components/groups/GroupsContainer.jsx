import React, { Component } from "react";
import { getStatisticFilterData } from "../../apiAxios/apiAxios";
import { Groups } from "./Groups";

export class GroupsContainer extends Component {
  state = {
    groupsData: []
  };
  componentDidMount() {
    getStatisticFilterData("groups").then(groupsData => {
      this.setState({ groupsData });
    });
  }

  render() {
    const { groupsData } = this.state;
    const { getData, clearStateRows } = this.props;
    return (
      <Groups
        groupsData={groupsData}
        getData={getData}
        clearStateRows={clearStateRows}
      />
    );
  }
}
