import React from 'react';

const SeatchOptions = ({ type, options, isFetching, getOptions }) => {
  if (options[type][0].value === 'Loading...' && isFetching[type] === false ) getOptions({ type });

  return (
    <select>
      {options[type].map((item, index) => (
        <option key={index} value={item.value}>{item.label}</option>
      ))}
    </select>
  )
};

export default SeatchOptions;
