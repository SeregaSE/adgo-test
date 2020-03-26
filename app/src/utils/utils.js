export const constructQueryString = queryParams => {
  let queryString = "";
  (queryKeysArr => {
    queryKeysArr.forEach(key => {
      const queryParamValue = queryParams[key];
      if (Array.isArray(queryParamValue)) {
        queryParamValue.forEach(value => {
          queryString += `&${key}[]=${value}`;
        });
        return;
      }
      if (queryParamValue) {
        queryString += `&${key}=${queryParamValue}`;
      }
    });
  })(Object.keys(queryParams));
  return queryString;
};
