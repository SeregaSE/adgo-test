import React from "react";
import PaginationButton from "../pagination-button";

const Pagination = ({ changeOffset, total }) => {

  
  const countOfButtons = Math.floor(total/25) + 1
  let arr = [];
  for (let i = 0; i < countOfButtons; i++) {
    arr.push(<PaginationButton label={i} changeOffset={changeOffset} key={i}/>) 
  }

  return (

    <div className="row">
      <nav className="ml-auto" aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => changeOffset("-")}>
              Previous
            </a>
          </li>
          {arr}
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => changeOffset("+")}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
