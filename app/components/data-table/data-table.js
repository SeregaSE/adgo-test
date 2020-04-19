import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataTableHeader, DataTableBody, DataTableFooter } from '../';
import { Table, TableContainer, Paper } from '@material-ui/core';

const useStyles2 = makeStyles({
    table: {
        minWidth: 500
    }
});

const DataTable = ({ count, statistics, groupBy, handleStateChange }) => {
    const classes = useStyles2();

    return (
        <TableContainer component={Paper} className={classes.tableWrapper}>
            <Table className={classes.table}>
                <DataTableHeader groupBy={groupBy} />
                <DataTableBody statistics={statistics} />
                <DataTableFooter
                    count={count}
                    handleStateChange={handleStateChange}
                />
            </Table>
        </TableContainer>
    );
};

export default DataTable;
