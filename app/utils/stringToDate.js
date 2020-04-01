const stringToDate = string => {
  const date = new Date();
  date.setFullYear(Number(string.slice(0, 4)));
  date.setMonth(Number(string.slice(5, 7)) - 1);
  date.setDate(Number(string.slice(8)));

  return date;
}
  
export default stringToDate;