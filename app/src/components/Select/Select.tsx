import { ChangeEventHandler, Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

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
  platforms?: number[];
  clear?: boolean;
  setClear?: Dispatch<SetStateAction<boolean>>;
  absolute?: boolean;
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
  platforms,
  clear,
  setClear,
  absolute = false,
}) => {
  const select = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (select.current) {
      select.current.focus();
    }
  }, [hidden]);

  useEffect(() => {
    if (select.current && clear && setClear) {
      select.current.selectedIndex = -1;
      setClear(false);
    }
  }, [clear, setClear]);

  const selectClasses = classNames('Select', { hidden: hidden, Select_absolute: absolute });

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
      {options
        .filter(
          (el) =>
            !el.platform || !platforms || platforms.length === 0 || platforms?.includes(el.platform)
        )
        .map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};
