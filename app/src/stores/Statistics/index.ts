import StatisticsController from './StatisticsController';
import StatisticsApi from './StatisticsApi';

const statisticsController = new StatisticsController({
  api: new StatisticsApi(),
});

export default statisticsController;
