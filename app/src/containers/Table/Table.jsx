import React, { Component } from "react";
import { TableRow } from "./";
import { ucFirst } from "../../utils/";
import cx from "classnames";

import "./Table.css";

export class Table extends Component {
  state = {
    activeBtnNum: 1
  };

  handleBtnClick = ({ target: { innerText } }) => {
    const { fetchStats } = this.props;
    this.setState({
      activeBtnNum: Number(innerText)
    });
    return fetchStats(innerText);
  };

  renderPagination = () => {
    if (!this.props.statistics) return null;
    const {
      statistics: { count }
    } = this.props;
    const { activeBtnNum } = this.state;
    const maxOffset = Math.floor(count / 25);

    if (maxOffset < 2) {
      return null;
    }

    const pagination = [];

    for (let i = 1; i <= maxOffset; i++) {
      pagination.push(i);
    }
    return pagination.map(i => {
      return (
        <button
          className={cx("pagination__btn", activeBtnNum === i && "btn--active")}
          key={`pagination-${i}`}
          onClick={this.handleBtnClick}
        >
          {i}
        </button>
      );
    });
  };

  render() {
    const firstColumnName = ucFirst(this.props.firstColVal);
    if (!this.props.statistics) {
      return (
        <div className="table-wrapper">
          <table className="table" border="1px" bordercolor="#ccc">
            <thead className="table__header" bgcolor="#dedede">
              <tr>
                <th className="table__head-cell">№</th>
                <th className="table__head-cell">{firstColumnName}</th>
                <th className="table__head-cell">Impressions</th>
                <th className="table__head-cell">Conversions</th>
                <th className="table__head-cell">Money</th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody className="table-body">
              <tr className="table-body__row">
                <td className="table-body__cell">-</td>
                <td className="table-body__cell">-</td>
                <td className="table-body__cell">-</td>
                <td className="table-body__cell">-</td>
                <td className="table-body__cell">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    const {
      statistics: {
        rows,
        total: { impressions, clicks, money }
      }
    } = this.props;

    return (
      <div className="table-wrapper">
        <table className="table" border="1px" bordercolor="#ccc">
          <thead className="table__header" bgcolor="#dedede">
            <tr>
              <th className="table__head-cell">№</th>
              <th className="table__head-cell">{firstColumnName}</th>
              <th className="table__head-cell">Impressions</th>
              <th className="table__head-cell">Conversions</th>
              <th className="table__head-cell">Money</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td className="table-body__total">-</td>
              <td className="table-body__total">Total</td>
              <td className="table-body__total">{impressions}</td>
              <td className="table-body__total">{clicks}</td>
              <td className="table-body__total">{money.toFixed(5)}</td>
            </tr>
          </tfoot>
          <tbody className="table-body">
            {this.props.statistics &&
              rows.map((row, index) => {
                return (
                  <TableRow
                    ind={index + 1}
                    rowObj={row}
                    firstColVal={this.props.firstColVal}
                    key={`row-key-${index}${row.money}`}
                  />
                );
              })}
          </tbody>
        </table>
        <div className="pagination">{this.renderPagination()}</div>
      </div>
    );
  }
}
