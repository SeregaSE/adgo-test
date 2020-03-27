import React from "react";

export const Groups = ({ groupsData, getData, clearStateRows }) => {
  const onSelectGroups = e => {
    if (e.target.value === "0") {
      return clearStateRows();
    }
    getData("groupBy", e.target.value);
  };
  return (
    <>
      <label>Group</label>
      <select onChange={onSelectGroups}>
        <option value="0">Choose group</option>
        {groupsData.map(item => (
          <option key={`${item.value}${item.label}`} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};
