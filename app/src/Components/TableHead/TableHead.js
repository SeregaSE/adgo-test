import React from 'react';
import './TableHead.css'

const TableHead = ( {groupBy} ) => {
  let groupByName=groupBy.split(/(?=[A-Z])/);
  if (groupByName.length < 2) {
    groupByName = groupBy
  } else {
    groupByName = groupByName.join(' ')
  }

    return (
      <thead>
        <tr>
          <th scope="col">{groupByName.toUpperCase()}</th>
          <th scope="col">IMPRESSIONS</th>
          <th scope="col">CLICKS</th>
          <th scope="col">MONEY</th>
        </tr>
    </thead>
    );
  }
  
  export default TableHead;