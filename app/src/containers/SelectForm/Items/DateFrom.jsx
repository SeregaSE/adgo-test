import React, { Component } from "react";

export class DateFrom extends Component {
  handleDateFrom = ({ target: { value } }) => {};

  render() {
    return (
      <label className="select-label" htmlFor="date-from">
        Date From
        <input
          className="date-picker"
          min="2016-01-01"
          type="date"
          onChange={this.handleDateFrom}
        />
      </label>
    );
  }
}
