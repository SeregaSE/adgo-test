import React from "react";
import "./Pagination.scss";

export const Pagination = ({
  setTableCurrentPage,
  limit,
  count,
  currentPage,
  getData
}) => {
  const allPagesSize = Math.ceil(count / limit);
  const pageNumbers = [1];
  for (let i = 2; i <= allPagesSize; i++) {
    pageNumbers.push(i);
  }
  const setPage = e => {
    setTableCurrentPage(e.target.textContent);
    getData("offset", e.target.textContent - 1);
  };

  const onClickArrowLeft = e => {
    if (currentPage <= 1) return (currentPage = 1);
    currentPage -= 1;
    setTableCurrentPage(currentPage);
    getData("offset", currentPage - 1);
  };
  const onClickArrowRight = e => {
    if (currentPage >= allPagesSize) return;
    currentPage += 1;
    setTableCurrentPage(currentPage);
    getData("offset", currentPage - 1);
  };
  return (
    <>
      <div className="pagination">
        <div className="paginationArrowLeft" onClick={onClickArrowLeft}>
          &laquo;
        </div>
        {pageNumbers.map(number => {
          return (
            <div
              className={
                currentPage === number
                  ? "paginationElemActive"
                  : "paginationElem"
              }
              key={number}
              value={number}
              onClick={setPage}
            >
              {number}
            </div>
          );
        })}
        <div className="paginationArrowRight" onClick={onClickArrowRight}>
          &raquo;
        </div>
      </div>
    </>
  );
};
