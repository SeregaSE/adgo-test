import React from 'react';
import uniqid from 'uniqid';
import './SelectForm.css'



const SelectForm = ({option, handleSelectChange, values}) => {
    return (
        <select className="custom-select" name={option.param} onChange={handleSelectChange} multiple={option.multiple} value={values[option.param]}>
          <option value={0}>{`Select ${option.name}`}</option>
          {option.options.map(newOption =>{
            return (
              <option 
                value={newOption.value} 
                key={uniqid.time()}
              >{newOption.label}</option>
            )
          })}
        </select>
    );
  }
  
  export default SelectForm;