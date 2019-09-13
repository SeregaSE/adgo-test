import dateFormat from 'dateformat';

export const base = `http://localhost:${process.env.PORT || 3000}/api/v1`;

export const statistics = `${base}/statistics`;
export const groups = `${base}/groups`;
export const platforms = `${base}/platforms`;
export const operatingSystems = `${base}/operating-systems`;
export const browsers = `${base}/browsers`;

export const statUrl = ({
  groupBy,
  dateRange,
  platform,
  browser,
  operatingSystem,
  offset,
}) => {
  const platformUrl = platform ? '&platform='+platform : '';
  const browserUrl = browser ? '&browsers[]='+browser : '';
  const operatingSystemUrl = operatingSystem ? '&operatingSystems[]='+operatingSystem : '';
  const from = dateFormat(dateRange[0], 'yyyy-mm-dd');
  const to = dateFormat(dateRange[1], 'yyyy-mm-dd');

  const url = `${statistics}?groupBy=${groupBy}&from=${from}&to=${to}&offset=${offset}${platformUrl}${browserUrl}${operatingSystemUrl}`;
  return url;
}