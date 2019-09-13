import React from 'react';

import Table from '../table';
import SearchParam from '../searchParam';
import DateRangePicker from '../dateRangePicker';
import Pagination from '../Pagination';

const App = () => {
  return (
    <div>
      <DateRangePicker />
      <div>
        <div>Group by</div>
        <SearchParam type='groups'/>
      </div>
      <div>
        <div>Platform</div>
        <SearchParam type='platforms'/>
      </div>
      <div>
        <div>Browser</div>
        <SearchParam type='browsers'/>
      </div>
      <div>
        <div>Operating system</div>
        <SearchParam type='operatingSystems'/>
      </div>
      <Table />
      <Pagination />
    </div>
  )
}

export default App;