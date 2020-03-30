import React, { useEffect, useState } from "react";
import TableRow from "../table-row";
import withAPIService from "../hoc/with-APIService";
import generateKey from "../../utils/key-generator";
import formatDate from "../../utils/format-date-function";
import TableHeader from "../table-header";

const Table = ({
  getStatistics,
  groupBy = "Day",
  getGroups,
  dateFrom,
  dateTo,
  offset,
  changeTotalItems,
  currentFilter
}) => {
  const [total, setTotal] = useState(1);
  const [data, setData] = useState([]);
  const [from, setFrom] = useState(dateFrom);
  const [to, setTo] = useState(dateTo);

  useEffect(() => {
    setFrom(dateFrom);
    setTo(dateTo);
    const fetchData = async () => {
      const params = await getGroups();
      const param = params.find(item => item.label === groupBy);
      const result = await getStatistics(
        `${param.value || "platform"}`,
        `${formatDate(from)}`,
        `${formatDate(to)}`,
        25,
        offset
      );
      setData(result.rows);
      setTotal(result.count);
      changeTotalItems(total);
    };

    fetchData();
  }, [
    getStatistics,
    groupBy,
    dateFrom,
    dateTo,
    from,
    to,
    offset,
    total,
    changeTotalItems,
    currentFilter
  ]);

  const rows = data.map((item, index) => {
    console.log(data)
    const key = generateKey(index);
    if (currentFilter === "..." || !currentFilter) {
      return <TableRow key={key} {...item} />;
    } 

    console.log(item.platform, 222)
    console.log(currentFilter, 333)
    
    if ( currentFilter.indexOf(item.platform) !== -1 || !currentFilter) {
      return <TableRow key={key} {...item} />;
    } else if (currentFilter.indexOf(item.operatingSystem) !== -1 || !currentFilter) {
      return <TableRow key={key} {...item} />;
    } else if (currentFilter.indexOf(item.browser) !== -1 || !currentFilter) {
      return <TableRow key={key} {...item} />;
    }
  });

  return (
    <TableHeader groupBy={groupBy} rows={rows}/>
  );
};

const mapMethodsToProps = ({ getStatistics, getGroups }) => {
  return {
    getStatistics,
    getGroups
  };
};

export default withAPIService(mapMethodsToProps)(Table);
