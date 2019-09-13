import React from 'react';

import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';

export default ({
  pageCount,
  setCurrentPage,
}) => {
  return (
    <>
      {pageCount !== null && pageCount > 1 &&
        <ReactPaginate 
          onPageChange={(e) => setCurrentPage({ currentPage: e.selected })}
          pageCount={pageCount} 
          pageRangeDisplayed={5} 
          marginPagesDisplayed={2}
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          containerClassName={styles.pagination}
          subContainerClassName={styles.pagination}
          activeClassName={styles.active}
        />
      }
    </>
  )
}