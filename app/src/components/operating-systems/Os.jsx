import React, { Component } from "react";
import MultiSelect from "@khanacademy/react-multi-select";

const multiSelectOs = {
  selectSomeItems: "Choose OS"
};

export class Os extends Component {
  setDataFrom = selected => {
    this.props.getData("operatingSystems", selected);
  };

  render() {
    const { operatingSystems, osData, groupBy } = this.props;
    return (
      <>
        <label>Operating System</label>
        <div className="multiSelectWrapper">
          <MultiSelect
            disabled={groupBy !== "operatingSystem" ? true : false}
            overrideStrings={multiSelectOs}
            options={osData}
            selected={groupBy === "operatingSystem" ? operatingSystems : []}
            onSelectedChanged={this.setDataFrom}
          />
        </div>
      </>
    );
  }
}
