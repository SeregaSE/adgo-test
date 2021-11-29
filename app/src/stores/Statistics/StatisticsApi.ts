/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import API from '../../config/api';

class StatisticsApi {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  fetchStatistics = (params) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    API.get('statistics', { params }).then(({ data }) => data.rows);
}

export default StatisticsApi;
