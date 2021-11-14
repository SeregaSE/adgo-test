import React from "react";
import { useSelector } from "react-redux";
import { getGroupBy, getRows } from "../../store/slices/table";

import "./index.css";

export default function Table() {
  const rows = useSelector(getRows);
  const groupBy = useSelector(getGroupBy);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>{groupBy.label}</th>
          <th>Impressions</th>
          <th>Conversions</th>
          <th>Money</th>
        </tr>
      </thead>

      <tbody>
        {rows.length ? (
          rows.map((item, i) => {
            return item[groupBy.value] ? (
              <tr key={item[groupBy.value] + i}>
                <td>{item[groupBy.value]}</td>
                <td>{item.impressions}</td>
                <td>{item.clicks / item.impressions}</td>
                <td>{item.money}</td>
              </tr>
            ) : null;
          })
        ) : (
          <tr>
            <td colSpan="4" align="center">
              совпадений не найдено
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
