/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { observable, action, makeObservable } from 'mobx';
class GetFiltersController {
  private api: any;

  @observable filtersPlatform = [];

  @observable filtersBrowsers = [];

  @observable filtersOperatingSystems = [];

  @observable filtersGroups = [];

  constructor({ api }) {
    this.api = api;
    makeObservable(this);
  }

  fetchFiltersPlatform = () =>
    this.api.fetchFilters('platforms').then(this.setFiltersPlatformFromServer);

  fetchFiltersBrowsers = () =>
    this.api.fetchFilters('browsers').then(this.setFiltersBrowsersFromServer);

  fetchFiltersOperatingSystems = () =>
    this.api
      .fetchFilters('operating-systems')
      .then(this.setFiltersOperatingSystemsFromServer);

  fetchFiltersGroups = () =>
    this.api.fetchFilters('groups').then(this.setFiltersGroupsFromServer);

  @action
  setFiltersPlatformFromServer = (items) => {
    this.filtersPlatform = items;
  };

  @action
  setFiltersBrowsersFromServer = (items) => {
    this.filtersBrowsers = items;
  };

  @action
  setFiltersOperatingSystemsFromServer = (items) => {
    this.filtersOperatingSystems = items;
  };

  @action
  setFiltersGroupsFromServer = (items) => {
    this.filtersGroups = items;
  };
}

export default GetFiltersController;
