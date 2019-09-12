export const base = `http://localhost:${process.env.PORT || 3000}/api/v1`;

export const statistics = `${base}/statistics`;
export const groups = `${base}/groups`;
export const platforms = `${base}/platforms`;
export const operatingSystems = `${base}/operating-systems`;
export const browsers = `${base}/browsers`;

export const statUrl = ({
  groupBy,
  from,
  to,
  platform,
  browser,
  operatingSystem,
}) => {
  const platformUrl = platform ? '&platform='+platform : '';
  const browserUrl = browser ? '&browsers[]='+browser : '';
  const operatingSystemUrl = operatingSystem ? '&operatingSystems[]='+operatingSystem : '';

  const url = `${statistics}?groupBy=${groupBy}&from=${from}&to=${to}${platformUrl}${browserUrl}${operatingSystemUrl}`;
  console.log(url)
  return url;
}