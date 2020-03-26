import React from "react";

export const TableRow = ({ filterValue, impressions, clicks, money }) => {
  return (
    <>
      <tr>
        <td>{filterValue}</td>
        <td>{impressions}</td>
        <td>{clicks}</td>
        <td>{money}</td>
      </tr>
    </>
  );
};
