import React from "react";
import "./PaginationLimits.scss";

export const PaginationLimits = ({ getData, limit }) => {
  const setLimit = e => {
    if (e.target.value === 0) return;
    getData("limit", e.target.value);
  };
  return (
    <>
      <label> Limit</label>
      <select defaultValue={limit} onChange={setLimit} className="limits">
        <option value="10">10</option>
        <option value="25">25</option>
      </select>
    </>
  );
};
