import React, { Component } from "react";
import { TableRow } from "./";
import { ucFirst } from "../../utils/";

import "./Table.css";

export class Table extends Component {
  render() {
    const firstColumnName = ucFirst(this.props.firstColVal);
    if (!this.props.statistics) {
      return (
        <table className="table" border="1px" bordercolor="#ccc">
          <thead className="table__header" bgcolor="#dedede">
            <tr>
              <th className="table__head-cell">{firstColumnName}</th>
              <th className="table__head-cell">Impressions</th>
              <th className="table__head-cell">Conversions</th>
              <th className="table__head-cell">Money</th>
            </tr>
          </thead>
          <tfoot></tfoot>
          <tbody className="table-body">
            <tr className="table-body__row">
              <td className="table-body__cell">-</td>
              <td className="table-body__cell">-</td>
              <td className="table-body__cell">-</td>
              <td className="table-body__cell">-</td>
            </tr>
          </tbody>
        </table>
      );
    }
    const {
      statistics: {
        rows,
        total: { impressions, clicks, money }
      }
    } = this.props;

    return (
      <table className="table" border="1px" bordercolor="#ccc">
        <thead className="table__header" bgcolor="#dedede">
          <tr>
            <th className="table__head-cell">{firstColumnName}</th>
            <th className="table__head-cell">Impressions</th>
            <th className="table__head-cell">Conversions</th>
            <th className="table__head-cell">Money</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td className="table-body__total">Total</td>
            <td className="table-body__total">{impressions}</td>
            <td className="table-body__total">{clicks}</td>
            <td className="table-body__total">{money.toFixed(5)}</td>
          </tr>
        </tfoot>
        <tbody className="table-body">
          {this.props.statistics &&
            rows.map((row, index) => {
              return (
                <TableRow
                  rowObj={row}
                  firstColVal={this.props.firstColVal}
                  key={`row-key-${index}${row.money}`}
                />
              );
            })}
        </tbody>
      </table>
    );
  }
}
