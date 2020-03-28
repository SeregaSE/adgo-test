import React from "react";

const PaginationButton = ({ label, changeOffset }) => {
  return (
    <li className="page-item">
      <a className="page-link" href="#" onClick={() => changeOffset(label)}>
        {label + 1}
      </a>
    </li>
  );
};

export default PaginationButton
