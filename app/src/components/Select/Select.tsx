import { ChangeEventHandler, FC, useEffect, useRef } from 'react';

import classNames from 'classnames';

import './Select.css';

export type OptionType = {
  label: string;
  value: number | string;
  platform?: number;
};

export type SelectProps = {
  options: OptionType[];
  onChange?: ChangeEventHandler;
  onBlur?: () => void;
  multiple?: boolean;
  hidden?: boolean;
};

export const Select: FC<SelectProps> = ({
  options,
  onChange,
  onBlur,
  multiple = false,
  hidden = false,
}) => {
  const select = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (select.current) {
      select.current.focus();
    }
  }, [hidden]);

  const selectClasses = classNames('Select', { hidden: hidden });

  return (
    <select
      className={selectClasses}
      multiple={multiple}
      onChange={onChange}
      onBlur={onBlur}
      size={multiple ? 4 : 1}
      ref={select}
    >
      {multiple ? null : (
        <option key="empty-option" value="">
          Choose...
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
