import { createSlice } from "@reduxjs/toolkit";

// url server api
const serverApi = new URL(window.location);
serverApi.port = 3000;

export const tableSlice = createSlice({
  name: "table",
  initialState: {
    filters: {
      platforms: [],
      browsers: [],
      systems: [],
      groups: [],
    },
    statistics: {
      count: null,
      rows: [],
      total: null,
    },
    filtersSelect: {},
    groupBy: null,
    page: 1,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setFiltersSelect: (state, action) => {
      state.filtersSelect = action.payload;
    },
    setStatistics: (state, action) => {
      state.statistics = action.payload;
    },
    setGroupBy: (state, action) => {
      state.groupBy = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFilters,
  setFiltersSelect,
  setStatistics,
  setGroupBy,
  setError,
  setPage,
} = tableSlice.actions;

export default tableSlice.reducer;

// getters
export const getCheckData = (state) => {
  return state.table.statistics?.count !== null;
};
export const getFilters = (state) => state.table.filters;
export const getFiltersSelect = (state) => state.table.filtersSelect;
export const getRows = (state) => state.table.statistics.rows;
export const getGroupBy = (state) => state.table.groupBy;
export const getPage = (state) => state.table.page;
export const getCount = (state) => state.table.statistics.count;
export const getError = (state) => state.table.error;

// async actions
export const loadFilters = () => async (dispatch) => {
  const getPlatforms = fetch(`${serverApi.origin}/api/v1/platforms`).then(
    (res) => res.json()
  );
  const getBrowsers = fetch(`${serverApi.origin}/api/v1/browsers`).then((res) =>
    res.json()
  );
  const getSystems = fetch(`${serverApi.origin}/api/v1/operating-systems`).then(
    (res) => res.json()
  );
  const getGroups = fetch(`${serverApi.origin}/api/v1/groups`).then((res) =>
    res.json()
  );

  Promise.all([getPlatforms, getBrowsers, getSystems, getGroups]).then(
    (res) => {
      const filters = {
        platforms: res[0],
        browsers: res[1],
        systems: res[2],
        groups: res[3],
      };

      dispatch(setGroupBy(filters.groups[0]));
      dispatch(setFilters(filters));

      dispatch(
        loadStatistics({
          from: getDateFormat(new Date()),
          to: getDateFormat(new Date()),
          groupBy: filters.groups[0].value,
        })
      );
    }
  );
};

export const loadStatistics = (params) => async (dispatch) => {
  const urlApi = new URL(`${serverApi.origin}/api/v1/statistics`);

  dispatch(setFiltersSelect(params));

  for (let key in params) {
    if (params[key] === "no") continue;

    urlApi.searchParams.set(`${key}`, params[key]);
  }
  urlApi.searchParams.set(`limit`, 10);

  fetch(urlApi.href)
    .then((res) => {
      return res.status === 200 ? res.json() : res.text();
    })
    .then((res) => {
      if (typeof res === "object") {
        dispatch(setStatistics(res));
        dispatch(setError(null));
      } else dispatch(setError(res));
    })
    .catch((err) => {
      console.log(err);
    });
};

function getDateFormat(date) {
  const year = date.getFullYear();
  const mounth =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day =
    date.getDate() < 9 ? `0${date.getDate() + 1}` : date.getDate() + 1;

  return `${year}-${mounth}-${day}`;
}
