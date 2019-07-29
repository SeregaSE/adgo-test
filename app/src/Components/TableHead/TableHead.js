import React from 'react';
import './TableHead.css'

const TableHead = ( {groupBy} ) => {
    return (
      <thead>
        <tr>
          <th scope="col">{groupBy.toUpperCase()}</th>
          <th scope="col">IMPRESSIONS</th>
          <th scope="col">CLICKS</th>
          <th scope="col">MONEY</th>
        </tr>
    </thead>
    );
  }
  
  export default TableHead;