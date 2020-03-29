import React from 'react';

const TableHeader = ({ rows, groupBy }) => {

  return (
    <div className="row">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{groupBy}</th>
            <th scope="col">Impressions</th>
            <th scope="col">Conversions</th>
            <th scope="col">Money</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default TableHeader;