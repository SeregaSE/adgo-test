import React, { Component } from "react";

export class TableRow extends Component {
  render() {
    const firstKey = this.props.firstColVal;
    const { impressions, clicks, money } = this.props.rowObj;
    return (
      <tr className="table-body__row">
        <td className="table-body__cell">{this.props.rowObj[firstKey]}</td>
        <td className="table-body__cell">{impressions}</td>
        <td className="table-body__cell">{clicks}</td>
        <td className="table-body__cell">{money.toFixed(5)}</td>
      </tr>
    );
  }
}
