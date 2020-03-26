import React, { Component } from "react";
import { getStatisticFilterData } from "../../apiAxios/apiAxios";
import { Browsers } from "./Browsers";

export class BrowsersContainer extends Component {
  state = {
    browsersData: []
  };
  componentDidMount() {
    getStatisticFilterData("browsers").then(browsersData => {
      this.setState({ browsersData });
    });
  }

  render() {
    const { browsersData } = this.state;
    const { getData, browsers } = this.props;
    return (
      <Browsers
        browsersData={browsersData}
        getData={getData}
        browsers={browsers}
      />
    );
  }
}
