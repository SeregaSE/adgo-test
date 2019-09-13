import React, { useState, useEffect } from 'react';

const SeatchOptions = ({ 
  type, 
  options, 
  getOptions,
  changeSearchParam,
  searchParam,
}) => {

  const [ option, setOption ] = useState('');

  useEffect(() => {
    getOptions({ type });
  }, [getOptions, type]);

  const handleChange = (value = null) => {
    setOption(value);
    changeSearchParam({ type, param: value});
  }

  return (
    <select value={option} onChange={(e) => handleChange(e.target.value)}>
      {type !== 'groups' &&
        <option value=''>All</option>
      }
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
