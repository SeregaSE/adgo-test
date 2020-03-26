import axios from "axios";

const baseURL = "http://localhost:3000/api/v1/";

export const getStatisticFilterData = path => {
  return axios.get(`${baseURL}${path}`).then(response => {
    return response.data;
  });
};

export const getStatistic = query => {
  return axios.get(`${baseURL}statistics?${query}`);
};
