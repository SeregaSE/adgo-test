import React, { FC, useState } from 'react';

import { OptionType, Select } from '../Select/Select';

import './MultipleSelect.css';

export type MultipleSelectProps = {
  options: OptionType[];
};

export type InputValue = number[];
const INITIAL_INPUT_VALUE: InputValue = [];
//.map((option) => options[Number(option.value) - 1].label).join(', ')

export const MultipleSelect: FC<MultipleSelectProps> = ({ options }) => {
  const [hidden, setHidden] = useState(true);
  const [value, setValue] = useState(INITIAL_INPUT_VALUE);
  console.log(options);

  const handleFocus = (event: any) => {
    setHidden(false);
  };

  const handleBlur = () => {
    setHidden(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(Array.from(event.currentTarget.selectedOptions));
    setValue(Array.from(event.currentTarget.selectedOptions).map((option) => Number(option.value)));
  };

  const printInputValues = () => value.map((index) => options[index - 1].label).join(', ');

  return (
    <div>
      <input
        className="MultipleSelect"
        onFocus={handleFocus}
        placeholder="Choose..."
        value={printInputValues()}
        readOnly
      />
      <Select
        options={options}
        hidden={hidden}
        multiple={true}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};
