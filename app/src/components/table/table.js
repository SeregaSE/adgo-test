import React from 'react';
import TableRow from './table-row'

const Table = (props) => {
    let key = 1
    
    function tableHeadСontentCreate(col) {
        if (!props.rows.length) {
            return ''
        }
        let colHeader = Object.keys(props.rows[0])[col].toUpperCase()
        if (colHeader === 'OPERATINGSYSTEM') {
            colHeader = 'OPERATING SYSTEM'
        }
        return colHeader
    }

    function rowCreate(rowsObj) {
        let row
        return row = rowsObj.length ? 
        (
            rowsObj.map(item => {
                return <TableRow 
                    row={item}
                    key={key++}
                />
            })
        ) : (
            <tr><th>No data</th></tr>
        )
    }
    
    return (
        <div className="wrapper__table">
            <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{tableHeadСontentCreate(0)}</th>
                    <th scope="col">{tableHeadСontentCreate(1)}</th>
                    <th scope="col">{tableHeadСontentCreate(2)}</th>
                    <th scope="col">{tableHeadСontentCreate(3)}</th>
                  </tr>
                </thead>
                <tbody>
                    {rowCreate(props.rows)}
                </tbody>
            </table>
        </div>
    )
}

export default Table