import { ChangeEventHandler, FC, useEffect, useRef } from 'react';

import classNames from 'classnames';

import './Select.css';
import { RequestFormType } from '../../store/store.types';

export type OptionType = {
  label: string;
  value: number | string;
  platform?: number;
};

export type SelectProps = {
  options: OptionType[];
  value?: string;
  name?: keyof RequestFormType;
  onChange?: ChangeEventHandler;
  onBlur?: () => void;
  required?: boolean;
  multiple?: boolean;
  hidden?: boolean;
  values?: number[];
  platforms?: number[];
};

export const Select: FC<SelectProps> = ({
  options,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  multiple = false,
  hidden = false,
  values,
  platforms,
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
      name={name}
      className={selectClasses}
      multiple={multiple}
      onChange={onChange}
      onBlur={onBlur}
      size={multiple ? 4 : 1}
      ref={select}
      required={required}
      value={value}
    >
      {multiple ? null : (
        <option key="empty-option" value="">
          Choose...
        </option>
      )}
      {options
        .filter(
          (el) =>
            !el.platform || !platforms || platforms.length === 0 || platforms?.includes(el.platform)
        )
        .map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={values?.includes(Number(option.value))}
          >
            {option.label}
          </option>
        ))}
    </select>
  );
};
