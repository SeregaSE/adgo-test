import React from 'react';
import uniqid from 'uniqid';
import './Pagination.css'

const Pagination = ({count, offset, handlePageChange}) => {

  if (!count || (count <= 10)) {
    return null
  }

  const pages=[];
  for (let i = 0; i < Math.ceil(count/10); i++) {
    pages.push(i)
  }

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className={!offset ? "page-item disabled" : "page-item"}>
            <button className="page-link" tabIndex="-1" disabled={!offset ? true : false} onClick={()=>{handlePageChange(offset-1)}}>Previous</button>
          </li>
          {pages.map(page => {
            return (
              <li className={page === offset ? "page-item active" : "page-item"} key={uniqid.time()}>
                <button className="page-link" onClick={()=>{handlePageChange(page)}}>
                  {page+1}
                </button>
              </li>
            )
          })}
          <li className={offset === (pages.length - 1) ? "page-item disabled" : "page-item"}>
            <button className="page-link" disabled={offset === (pages.length - 1) ? true : false} onClick={()=>{handlePageChange(offset+1)}}>Next</button>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default Pagination;