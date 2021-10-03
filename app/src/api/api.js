const BASE_URL = 'http://localhost:3001';

export const getPlatforms = async () => {

  return fetch(BASE_URL + '/api/v1/platforms').then(
    data => data.json()
  )
}

export const getBrowsers = async () => {

  return fetch(BASE_URL + '/api/v1/browsers').then(
    data => data.json()
  )
}

export const getOperatingSystems = async () => {

  return fetch(BASE_URL + '/api/v1/operating-systems').then(
    data => data.json()
  )
}

export const getGroups = async () => {

  return fetch(BASE_URL + '/api/v1/groups').then(
    data => data.json()
  )
}

export const getStatistics = async (params) => {
  const {
    groupBy,
    from,
    to,
    limit,
    offset,
    platform,
    browsers,
    operatingSystems,
  } = params;
  
  const isGroupBy = !!groupBy;
  const isDate = !!from && !!to;
  const isLimit = !!limit;
  const isOffset = !!offset;
  const isPlatform = !!platform;
  const isBrowser = browsers.length !== 0;
  const isOperatingSystem = operatingSystems.length !== 0;

  const convertMultipleItems = (field, values) => {

    let str = '';

    values.forEach((value) => {
      str = `${str + field} []= ${value} &`;
    });
    
    return str
  }
  
  return fetch(
    BASE_URL + `
      /api/v1/statistics
      ${
        (
          isGroupBy || 
          isDate || 
          isLimit || 
          isOffset || 
          isPlatform || 
          isBrowser || 
          isOperatingSystem
        ) ? '?' : ''
      }
      ${isGroupBy         ? 'groupBy='            + groupBy  + '&' : ''}
      ${isDate            ? 'from='               + from     + '&' : ''}
      ${isDate            ? 'to='                 + to       + '&' : ''}
      ${isLimit           ? 'limit='              + limit    + '&' : ''}
      ${isOffset          ? 'offset='             + offset   + '&' : ''}
      ${isPlatform        ? 'platform='           + platform + '&' : ''}
      ${isBrowser         ? convertMultipleItems('browsers', browsers) : ''}
      ${isOperatingSystem ? convertMultipleItems('operatingSystems', operatingSystems) : ''}
    `.replace(/\s/g, '')
  ).then(
    data => data.json()
  )
}
