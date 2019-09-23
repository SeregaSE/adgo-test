import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonsNavigateBar from './ButtonsNavigateBar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    marginBottom: "100px"
  },
  table: {
    minWidth: 650,
  },
}));

export default function DataTable(props) {
  const classes = useStyles();

  if(!props.isLoad){
      return <div>здесь может быть прелоадер</div>
  }

  //Компонент таблицы, селекта лимита

  return (
    <Paper className={classes.root}>
      <ButtonsNavigateBar 
        count={props.data.count}
        limit={props.limit}
        changeLimit={props.changeLimit}
        offset={props.offset}
        changeOffset={props.changeOffset} />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className="table-head__item">ID</TableCell>
            <TableCell className="table-head__item">{Object.keys(props.data.rows[0])[0]}</TableCell>
            <TableCell className="table-head__item">Impressions</TableCell>
            <TableCell className="table-head__item">Clicks</TableCell>
            <TableCell className="table-head__item">Money($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.rows.map((row, id) => (
            <TableRow key={id+1}>
              <TableCell>{id+1}</TableCell>
              <TableCell>{Object.values(row)[0]}</TableCell>
              <TableCell>{row.clicks}</TableCell>
              <TableCell>{row.impressions}</TableCell>
              <TableCell>{row.money}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}