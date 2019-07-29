import React from 'react';
import './Table.css'

import TableHead from '../TableHead'

const Table = ({data}) => {
    if (!data.rows) {
      return (
        <table className="table">
          <TableHead />
        </table>
      )
    }

    return (
      <table className="table">
        <TableHead />
        <tbody>
          {data.rows.map(row => {
            return (
              <tr>
                <td>{row.day}</td>
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