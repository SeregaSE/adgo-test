import React, { Component } from "react";

export class TableRow extends Component {
  render() {
    const firstKey = this.props.firstColVal;
    const {
      ind,
      rowObj: { impressions, clicks, money }
    } = this.props;
    return (
      <tr className="table-body__row">
        <td className="table-body__cell">{ind}</td>
        <td className="table-body__cell">{this.props.rowObj[firstKey]}</td>
        <td className="table-body__cell">{impressions}</td>
        <td className="table-body__cell">{clicks}</td>
        <td className="table-body__cell">{money.toFixed(5)}</td>
      </tr>
    );
  }
}
