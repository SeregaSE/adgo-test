import React from "react";
import { useTable, usePagination } from "react-table";

export const Table = ({ columns, data }) => {
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = tableInstance;

  return (
    <div>
      <div>
        {" "}
        <button className="button" onClick={() => previousPage()}>
          {"<"}
        </button>{" "}
        <button
          style={{ marginRight: "8px" }}
          className="button"
          onClick={() => nextPage()}
        >
          {">"}
        </button>
        {pageIndex + 1} of {pageOptions.length}
      </div>
      <table
        style={{
          borderSpacing: 0,
          border: "1px solid black",
          borderRadius: "4px",
          width: "100%",
        }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  style={{
                    margin: 0,
                    width: "300px",
                    padding: "0.5rem",
                    border: "1px solid black",
                    background: "#f0c9c9",
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      style={{
                        margin: 0,
                        padding: "0.5rem",
                        minWidth: "200px",
                        border: "1px solid black",
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
