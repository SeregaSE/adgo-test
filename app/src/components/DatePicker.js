import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export const DatePickerComponent = (props) => {
  return (
    <div className="filter-row-element">
      <p>Date Period</p>
      <RangePicker 
        allowClear={false}
        defaultValue={[props.from, props.to]} 
        onChange={props.onChange}
      />
    </div>
  )
}