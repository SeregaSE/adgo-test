/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import API from '../../config/api';

class GetFiltersApi {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  fetchFilters = (filter) => API.get(filter).then(({ data }) => data);
}

export default GetFiltersApi;
