import React from 'react';
import uniqid from 'uniqid';
import './Table.css'

import TableHead from '../TableHead'

const Table = ({data, groupBy}) => {
    if (!data.rows) {
      return (
        <table className="table">
          <TableHead groupBy={`day`}/>
        </table>
      )
    }

    return (
      <table className="table">
        <TableHead groupBy={groupBy}/>
        <tbody>
          {data.rows.map(row => {
            return (
              <tr key={uniqid.time()}>
                <td>{row[groupBy]}</td>
                <td>{row.impressions}</td>
                <td>{row.clicks}</td>
                <td>{row.money}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

    );
  }
  
  export default Table;