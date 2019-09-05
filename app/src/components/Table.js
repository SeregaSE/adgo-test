import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
    textTransform: 'capitalize'
  },
  footer: {
    color: 'darkblue',
    fontWeight: '600'
  }
}));


function TableComponent(props) {
  const classes = useStyles();
  const {groupBy, data, currentPage, limit} = props;
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell color="secondary" align="center">{groupBy}</TableCell>
            <TableCell color="secondary" align="center">Impressions</TableCell>
            <TableCell color="secondary" align="center">Conversions</TableCell>
            <TableCell color="secondary" align="center">Money</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell align="center">{row[props.groupBy]}</TableCell>
              <TableCell align="center">{row.impressions}</TableCell>
              <TableCell align="center">{row.clicks}</TableCell>
              <TableCell align="center">{Math.round(row.money * 100000) / 100000}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {currentPage === Math.ceil(data.count / limit) && 
          <TableFooter>
            <TableRow>
              <TableCell align="right">Total: </TableCell>
              <TableCell className={classes.footer} align="center">{data.total.impressions}</TableCell>
              <TableCell className={classes.footer} align="center">{data.total.clicks}</TableCell>
              <TableCell className={classes.footer} align="center">{data.total.money}</TableCell>
            </TableRow>
          </TableFooter> }
      </Table>
    </Paper>
  );
}

export { TableComponent as Table}