import React, { Component } from "react";
import { getStatisticFilterData } from "../../apiAxios/apiAxios";
import { Platforms } from "./Platforms";

export class PlatformsContainer extends Component {
  state = {
    platformData: []
  };
  componentDidMount() {
    getStatisticFilterData("platforms").then(platformData => {
      this.setState({ platformData });
    });
  }

  render() {
    const { platformData } = this.state;
    const { getData } = this.props;
    return <Platforms platformData={platformData} getData={getData} />;
  }
}
