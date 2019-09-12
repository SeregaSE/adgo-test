import React, { useState, useEffect } from 'react';

const SeatchOptions = ({ 
  type, 
  options, 
  getOptions,
  changeSearchParam,
}) => {

  const [ option, setOption ] = useState(1);

  useEffect(() => {
    getOptions({ type });
  }, [getOptions, type]);

  const handleChange = (value = null) => {
    setOption(value);
    changeSearchParam({ type, param: value});
  }

  return (
    <select value={option} onChange={(e) => handleChange(e.target.value)}>
      {options[type].map((item, index) => (
        <option 
          key={index} 
          value={item.value}
          data-platform={item.platform && item.platform}
        >
          {item.label}
        </option>
      ))}
    </select>
  )
};

export default SeatchOptions;
