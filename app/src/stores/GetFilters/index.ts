import GetFiltersController from './GetFiltersController';
import GetFiltersApi from './GetFiltersApi';

const getFiltersController = new GetFiltersController({
  api: new GetFiltersApi(),
});

export default getFiltersController;
