import React from 'react';

import Table from '../table';
import SearchParam from '../searchParam';

const App = () => {
  return (
    <div>
      <SearchParam type='groups'/>
      <SearchParam type='platforms'/>
      <SearchParam type='browsers'/>
      <SearchParam type='operatingSystems'/>
      <Table />
    </div>
  )
}

export default App;