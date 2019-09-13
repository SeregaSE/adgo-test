import React from 'react';

import Table from '../table';
import SearchParam from '../searchParam';
import DateRangePicker from '../dateRangePicker';
import Pagination from '../Pagination';

import styles from './styles.module.scss';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.row}>
            <DateRangePicker />
            <div className={styles.select}>
              <div>Group by</div>
              <SearchParam type='groups'/>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <div>Platform</div>
              <SearchParam type='platforms'/>
            </div>
            <div className={styles.select}>
              <div>Browser</div>
              <SearchParam type='browsers'/>
            </div>
            <div className={styles.select}>
              <div>Operating system</div>
              <SearchParam type='operatingSystems'/>
            </div>
          </div>

          <Table />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default App;