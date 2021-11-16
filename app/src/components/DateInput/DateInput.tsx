import { ChangeEventHandler, FC } from 'react';
import { RequestFormType } from '../../store/store.types';

import './DateInput.css';

export type DateInputProps = {
  name: keyof RequestFormType;
  value: string;
  onChange: ChangeEventHandler;
  required?: boolean;
};

export const DateInput: FC<DateInputProps> = ({ name, value, onChange, required = false }) => {
  return (
    <input
      name={name}
      className="DateInput"
      type="date"
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};
