const server = "http://localhost:9000/api/v1";

export const fetchStatistics = params => {
  const {
    groupBy = "day",
    fromDate = "2019-06-01",
    toDate = "2019-06-30",
    limit = 25,
    offset = 0,
    platforms = 1,
    browsers = [1],
    operatingSystems = [1]
  } = params;

  const browsersStr = "browsers[]=" + browsers.join("&browsers[]=");
  const operatingSystemsStr =
    "operatingSystems[]=" + operatingSystems.join("&operatingSystems[]=");

  return fetch(
    `${server}/statistics?groupBy=${groupBy}&from=${fromDate}&to=${toDate}&limit=${limit}&offset=${offset}&platforms=${platforms}&${browsersStr}&${operatingSystemsStr}`
  ).then(response => {
    return response.status !== 200 ? Promise.reject(response) : response.json();
  });
};

const fetchParam = (path, nameParam) => {
  return fetch(`${server}/${path}`)
    .then(response => {
      return response.status !== 200
        ? Promise.reject(response)
        : response.json();
    })
    .then(result => ({ [nameParam]: result }));
};

export const fetchParams = () => {
  const platforms = fetchParam("platforms", "platforms");
  const browsers = fetchParam("browsers", "browsers");
  const OS = fetchParam("operating-systems", "OS");
  const groups = fetchParam("groups", "groups");

  return Promise.all([platforms, browsers, OS, groups]).then(result => {
    return result.reduce((acc, elem) => {
      return Object.assign(acc, elem);
    }, {});
  });
};
