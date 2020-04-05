import React from 'react';

const TableRow = (props) => {

    function tableRowСontentCreate(row) {
        return Object.values(props.row)[row]
    }

    return (        
        <tr>
            <th scope="row"> {tableRowСontentCreate(0)} </th>
            <th scope="row"> {tableRowСontentCreate(1)} </th>
            <th scope="row"> {tableRowСontentCreate(2)} </th>
            <th scope="row"> {tableRowСontentCreate(3)} </th>
        </tr>
    )
}

export default TableRow