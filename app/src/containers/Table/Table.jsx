import React, { Component } from "react";
import { TableRow } from "./";

import "./Table.css";

export class Table extends Component {
  render() {
    console.log("PROPS", this.props);
    const {
      statistics: { rows, total }
    } = this.props;
    return (
      <table className="table" border="1px" bordercolor="#ccc">
        <thead className="table__header" bgcolor="#dedede">
          <tr>
            <th className="table__head-cell">Day</th>
            <th className="table__head-cell">Impressions</th>
            <th className="table__head-cell">Conversions</th>
            <th className="table__head-cell">Money</th>
          </tr>
        </thead>
        <tfoot></tfoot>
        <tbody className="table-body">
          {rows.map((row, index) => {
            return (
              <TableRow rowObj={row} key={`row-key-${index}-${row.money}`} />
            );
          })}
        </tbody>
      </table>
    );
  }
}
