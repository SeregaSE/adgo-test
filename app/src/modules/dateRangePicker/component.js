import React, { useState, useEffect } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

export default ({ changeSearchParam }) => {
  const [dateRange, setDateRange] = useState([new Date(2019, 5), new Date(2019, 7)])

  useEffect(() => {
    changeSearchParam({ type: 'dateRange', param: dateRange})
  }, [dateRange, changeSearchParam]);

  return (
    <div>
      <DateRangePicker 
        onChange={date => setDateRange(date)}
        value={dateRange}
        format='y-MM-dd'
      />
    </div>
  )
}
