import React from "react";
import "./Table.scss";
import { TableRow } from "./TableRow/TableRow";

export const Table = ({ rows, total, groupBy }) => {
  debugger;
  return (
    <table>
      <thead>
        <tr>
          <th>{rows.length === 0 ? null : groupBy}</th>
          <th>Impressions</th>
          <th>Clicks</th>
          <th>Money</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(item => {
          return (
            <TableRow
              key={`${item.impressions}${item.money}${item.groupBy}`}
              filterValue={item[groupBy]}
              impressions={item.impressions}
              clicks={item.clicks}
              money={item.money}
            />
          );
        })}
        <tr>
          <td>Total</td>
          <td>{total.impressions}</td>
          <td>{total.clicks}</td>
          <td>{total.money}</td>
        </tr>
      </tbody>
    </table>
  );
};
