/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { observable, action, makeObservable } from 'mobx';

class StatisticsController {
  private api: any;

  @observable statisticsArr = [];

  constructor({ api }) {
    this.api = api;
    makeObservable(this);
  }

  fetchStatistics = (params) =>
    this.api.fetchStatistics(params).then(this.setStatistics);

  @action
  setStatistics = (items) => {
    const convertioned = items.map((item) => {
      const { clicks, impressions } = item;
      const convertions = (clicks / impressions) * 100;
      return {
        convertions,
        ...item,
      };
    });
    this.statisticsArr = convertioned;
  };
}

export default StatisticsController;
