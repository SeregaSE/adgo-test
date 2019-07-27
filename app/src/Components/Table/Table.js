import React from 'react';
import './Table.css'

const Table = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Day</th>
            <th scope="col">Impressions</th>
            <th scope="col">Clicks</th>
            <th scope="col">Money</th>
          </tr>
        </thead>
      </table>

    );
  }
  
  export default Table;