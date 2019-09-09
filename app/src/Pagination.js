import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination(props){
    return (
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={props.handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            activeClassName={'active'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'break-me page-item'}
            breakLinkClassName={'page-link'}
      />
    );
}

export default Pagination;
