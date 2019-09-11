import React, { Component } from "react";

export class TableRow extends Component {
  render() {
    const { day, impressions, clicks, money } = this.props.rowObj;
    return (
      <tr className="table-body__row">
        <td className="table-body__cell">{day}</td>
        <td className="table-body__cell">{impressions}</td>
        <td className="table-body__cell">{clicks}</td>
        <td className="table-body__cell">{money}</td>
      </tr>
    );
  }
}
