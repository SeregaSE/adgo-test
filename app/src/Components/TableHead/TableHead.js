import React from 'react';
import './TableHead.css'

const TableHead = ({data}) => {
    return (
      <thead>
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Impressions</th>
          <th scope="col">Clicks</th>
          <th scope="col">Money</th>
        </tr>
    </thead>
    );
  }
  
  export default TableHead;