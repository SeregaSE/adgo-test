import React from "react";
import { Link, Router, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Paper,
  Grid,
  Container,
  createMuiTheme,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tab
} from "@material-ui/core/";
import ReactPaginate from "react-paginate";
import { ThemeProvider, makeStyles, mergeClasses } from "@material-ui/styles";
import Header from "../Header";
import StatisticsForm from "../StatisticsForm";
import {
  statisticsRequest,
  statisticsFilterChanged,
  getStatistics,
  getFilter
} from "../../modules/Statistics";
import styles from "./styles.module.css";

const MapStateToProps = state => ({
  statisticsData: getStatistics(state),
  filter: getFilter(state)
});
const MapDispatchToProps = { statisticsRequest, statisticsFilterChanged };

class Statistics extends React.PureComponent {
  componentDidMount() {
    this.props.statisticsRequest(this.props.filter);
  }

  handlePageChanged = item => {
    this.props.statisticsFilterChanged({
      ...this.props.filter,
      offset: item.selected
    });
  };

  render() {
    const { statisticsData, filter } = this.props;
    const isFilteredBy = filter.groupBy;
    const pageTotal = statisticsData ? Math.ceil(statisticsData.count / 10) : 0;

    return (
      <React.Fragment>
        <StatisticsForm></StatisticsForm>
        <ReactPaginate
          pageCount={pageTotal}
          pageRangeDisplayed={pageTotal >= 5 ? 5 : pageTotal}
          marginPagesDisplayed={2}
          onPageChange={this.handlePageChanged}
          hrefBuilder={item => `/page/${item}`}
          containerClassName={styles.pagination}
          subContainerClassName={styles.pagination__item}
          activeClassName={"active"}
        ></ReactPaginate>
        {statisticsData && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{isFilteredBy}</TableCell>
                <TableCell>Impressions</TableCell>
                <TableCell>Click</TableCell>
                <TableCell>Money</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statisticsData.rows &&
                statisticsData.rows.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item[isFilteredBy]}</TableCell>
                    <TableCell>{item.impressions}</TableCell>
                    <TableCell>{item.clicks}</TableCell>
                    <TableCell>{Number(item.money).toFixed(5)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </React.Fragment>
    );
  }
}
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Statistics);
