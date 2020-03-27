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
    const { browsers, browsersData, groupBy } = this.props;
    return (
      <>
        <label>Browsers</label>
        <div className="multiSelectWrapper">
          <MultiSelect
            disabled={groupBy !== "browser" ? true : false}
            overrideStrings={multiSelectBrowsers}
            options={browsersData}
            selected={groupBy === "browser" ? browsers : []}
            onSelectedChanged={this.setDataFrom}
          />
        </div>
      </>
    );
  }
}
