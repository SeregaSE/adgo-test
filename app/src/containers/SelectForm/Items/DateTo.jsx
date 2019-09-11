import React, { Component } from "react";

export class DateTo extends Component {
  handleDateFrom = ({ target: { value } }) => {};

  render() {
    return (
      <label className="select-label" htmlFor="date-from">
        Date To
        <input
          className="date-picker"
          min={this.getToday()}
          type="date"
          onChange={this.props.handleDateTo}
        />
      </label>
    );
  }
}
