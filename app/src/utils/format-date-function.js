export default function formatDate(date) {
  if (!date) {
    return null;
  }
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy = date.getFullYear();
  if (yy < 10) yy = "0" + yy;
  return yy + "-" + mm + "-" + dd;
}