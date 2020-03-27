import React, { Component } from "react";
import { getStatisticFilterData } from "../../apiAxios/apiAxios";
import { Os } from "./Os";

export class OsContainer extends Component {
  state = {
    osData: []
  };
  componentDidMount() {
    getStatisticFilterData("operating-systems").then(osData => {
      this.setState({ osData });
    });
  }

  render() {
    const { osData } = this.state;
    const { getData, operatingSystems, groupBy } = this.props;
    return (
      <Os
        osData={osData.map(item => ({
          value: item.value,
          label: item.label
        }))}
        getData={getData}
        operatingSystems={operatingSystems}
        groupBy={groupBy}
      />
    );
  }
}
