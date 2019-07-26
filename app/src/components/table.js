import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  CircularProgress
} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import { connect } from "react-redux";
import { changeLimit, changeOffset } from "../actions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 450
  }
}));

const ConversionsTable = ({
  data,
  loading,
  error,
  group,
  changeLimit,
  changeOffset,
  state
}) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    changeOffset(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    changeLimit(+event.target.value);
    changeOffset(0);
  };

  if (error) return <p>error table</p>;
  if (!data || loading) return <CircularProgress />;
  // console.log(state);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              {group
                .replace(/([A-Z])/g, w => " " + w.toLowerCase())
                .replace(/[a-z]/, w => w.toUpperCase())}
            </TableCell>
            <TableCell align="center">Impressions</TableCell>
            <TableCell align="center">Conversions</TableCell>
            <TableCell align="center">Money</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell align="center">{row[group]}</TableCell>
              <TableCell align="center">{row.impressions}</TableCell>
              <TableCell align="center">{row.clicks}</TableCell>
              <TableCell align="center">{row.money}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.count}
        // count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "previous page"
        }}
        nextIconButtonProps={{
          "aria-label": "next page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const mapStateToProps = (state, ownProps) => ({
  data: state.statistics.data,
  error: state.statistics.error,
  loading: state.statistics.loading,
  group: state.groups.group,
  state: state
});

const mapDispatchToProps = {
  changeOffset,
  changeLimit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversionsTable);
