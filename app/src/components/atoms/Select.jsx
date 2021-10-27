import React from "react";

export const Select = ({
  value,
  options = [],
  label,
  placeholder,
  ...props
}) => {
  return (
    <div className="select">
      {label && <div className="select__label">{label}</div>}
      <select className="select__pole" value={value} {...props}>
        {placeholder && (
          <option value="" disabled selected={value ? false : true} hidden>
            {placeholder}
          </option>
        )}
        {options.map(({ label, ...props }) => (
          <option key={label} {...props}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
