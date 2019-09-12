import React from 'react';

import Table from '../table';
import SearchParam from '../searchParam';
import DateRangePicker from '../dateRangePicker';

const App = () => {
  return (
    <div>
      <DateRangePicker />
      <SearchParam type='groups'/>
      <SearchParam type='platforms'/>
      <SearchParam type='browsers'/>
      <SearchParam type='operatingSystems'/>
      <Table />
    </div>
  )
}

export default App;