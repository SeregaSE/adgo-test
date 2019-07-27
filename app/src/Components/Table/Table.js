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
              null
            )
          })}
        </tbody>
      </table>

    );
  }
  
  export default Table;