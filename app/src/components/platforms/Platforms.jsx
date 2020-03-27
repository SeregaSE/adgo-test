import React from "react";

export const Platforms = ({ platformData, getData, groupBy }) => {
  const onSelectPlatform = e => {
    if (e.target.value === 0) return;
    getData("platform", e.target.value);
  };

  return (
    <>
      <label>Platform</label>
      <select
        disabled={groupBy !== "platform" ? true : false}
        onChange={onSelectPlatform}
      >
        <option value="0">Choose platform</option>
        {platformData.map(item => (
          <option
            data={item.label}
            key={`${item.value}${item.label}`}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};
