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
}) => {
  return `${statistics}?groupBy=${groupBy}&from=${from}&to=${to}`
}