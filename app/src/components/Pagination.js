import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';

const Pagination = props => {
  const {currentPage, setCurrentPage, pages} = props;

  const handlePageSwitch = event => {
    if (event.currentTarget.classList.contains('previous')) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } else if (event.currentTarget.classList.contains('next')) {
      if (currentPage < pages ) {
        setCurrentPage(currentPage + 1);
      }
    }
  }

  return pages > 1 && (
    <ul className="pages">
      <li className={`page first ${currentPage === 1 ? 'page-disabled' :''}`} onClick={() => setCurrentPage(1)}>
        <FirstPageIcon/>
      </li>
      <li className={`page previous ${currentPage === 1 ? 'page-disabled' : ''}`} onClick={handlePageSwitch}>
        <ChevronLeftIcon/>
      </li>
      {(new Array(pages))
        .fill('')
        .map((el, i) => <li key={i} onClick={() => setCurrentPage(i + 1)} className={`page ${i === currentPage - 1 ? 'page-current' : ''}`}>{i+1}</li>)}
      <li className={`page next ${currentPage === pages ? 'page-disabled' : ''}`} onClick={handlePageSwitch}>
        <ChevronRightIcon/>
      </li>
      <li className={`page last ${currentPage === pages ? 'page-disabled' : ''}`} onClick={() => setCurrentPage(pages)}>
        <LastPageIcon/>
      </li>
    </ul>
  )
}

export default Pagination;