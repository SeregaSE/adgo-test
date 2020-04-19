import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

const TableHeader = ({ groupBy }) => {
    const columns = [
        {
            id: groupBy,
            label: groupBy == 'operatingSystem' ? 'Operating System' : groupBy,
            minWidth: 170,
            textTransform: 'capitalize',
            align: 'left'
        },
        {
            id: 'imressions',
            label: 'Impressions',
            minWidth: 100,
            textTransform: 'capitalize',
            align: 'right'
        },
        {
            id: 'clicks',
            label: 'Conversions',
            minWidth: 170,
            textTransform: 'capitalize',
            align: 'right'
        },
        {
            id: 'money',
            label: 'Money',
            minWidth: 170,
            textTransform: 'capitalize',
            align: 'right'
        }
    ];

    return (
        <TableHead>
            <TableRow>
                {columns.map((column, i) => (
                    <TableCell
                        key={i}
                        align={column.align}
                        style={{
                            minWidth: column.minWidth,
                            textTransform: column.textTransform
                        }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
