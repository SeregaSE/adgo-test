import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';

export default function DateContainer(props) {
  return (
    <div className="filter col">
      <div className="filter__label">
        { props.label }
      </div>
      <div className="filter__input">
        <DayPickerInput />
      </div>
    </div>);
}