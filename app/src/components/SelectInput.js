import React, { useState, useEffect, useContext } from 'react';
import SingleSelect from './SingleSelect';
import MultipleSelect from './MultipleSelect';
import ApiServiceContext from '../context/index';

const SelectInput = props => {
  const {type} = props;
  const apiService = useContext(ApiServiceContext);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (type !== undefined) {
      apiService.getData(type).then(data => setOptions(data));
    }
  }, []);

  return props.single ? 
    <SingleSelect {...props} options={options}/> : 
    <MultipleSelect {...props} options={options}/>
};

export default SelectInput;