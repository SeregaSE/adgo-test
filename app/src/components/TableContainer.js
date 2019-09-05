import React, { useEffect, useContext, useState, Fragment } from 'react';
import Pagination from './Pagination';
import { Table } from './Table'
import ApiServiceContext from '../context/index';

const TableContainer = props => {
  const apiService = useContext(ApiServiceContext);
  const {from, to, groupBy, limit} = props;
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.limit]);
  
  useEffect(() => {
    if (from && to && groupBy) {
      const filters = createFilters();
      apiService.getStatistics(filters)
        .then(data => {
          setData(data);
        })
    }
  }, [props, currentPage]);

  const createFilters = () => {
    const filterProps = Object.assign({}, props);
    let filters = []
    for (let key in filterProps) {
        if (filterProps[key].length > 0) {
          addFilter(filters, key, filterProps[key]);
      }
    }
    filters.push({name: 'offset', value: currentPage - 1});
    return filters;
  }

  const addFilter = (filters, key, value) => {
    if (Array.isArray(value)) {
      value.forEach(el => filters.push({name: key, value: el}))
    } else {
      filters.push({
        name: key,
        value: value
      })
    }
    return filters;
  }
  
  return data && (
    <Fragment>
      <Table 
        data={data} 
        groupBy={groupBy} 
        limit={limit}
        currentPage={currentPage}/>
      <Pagination 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        pages={Math.ceil(data.count / limit)} 
        limit={limit}/>
    </Fragment>
  );
}

export default TableContainer;