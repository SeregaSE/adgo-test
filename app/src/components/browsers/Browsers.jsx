import React, { Component } from "react";
import MultiSelect from "@khanacademy/react-multi-select";

const multiSelectBrowsers = {
  selectSomeItems: "Choose browsers"
};

export class Browsers extends Component {
  setDataFrom = selected => {
    this.props.getData("browsers", selected);
  };

  render() {
    const { browsers, browsersData } = this.props;
    return (
      <>
        <label>Browsers</label>
        <div className="multiSelectWrapper">
          <MultiSelect
            overrideStrings={multiSelectBrowsers}
            options={browsersData}
            selected={browsers}
            onSelectedChanged={this.setDataFrom}
          />
        </div>
      </>
    );
  }
}
