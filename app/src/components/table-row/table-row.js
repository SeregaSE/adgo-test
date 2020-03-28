import React from "react";

const TableRow = ({ day, impressions, clicks, money, platform, operatingSystem, browser }) => {
  return (
    <tr>
      <th scope="row">{day} {platform} {operatingSystem} {browser}</th>
      <td>{impressions}</td>
      <td>{clicks}</td>
      <td>{money}</td>
    </tr>
  );
};

export default TableRow;
