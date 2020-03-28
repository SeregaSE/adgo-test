import React, { useEffect, useState } from "react";
import TableRow from "../table-row";
import withAPIService from "../hoc/with-APIService";
import generateKey from "../../utils/key-generator";

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

  function formatDate(date) {
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

  useEffect(() => {
    setFrom(dateFrom);
    setTo(dateTo);
    const fetchData = async () => {
      const params = await getGroups();
      console.log(currentFilter, "3212312")

      const param = params.find(item => item.label === groupBy);
      const result = await getStatistics(
        `${param.value || "platform"}`,
        `${formatDate(from)}`,
        `${formatDate(to)}`,
        25,
        offset
      );
      setData(result.rows);
      setTotal(result.count)
      changeTotalItems(total)
    };

    fetchData();

  }, [getStatistics, groupBy, dateFrom, dateTo, from, to, offset, total, changeTotalItems, currentFilter]);


  const rows = data.map((item, index) => {
    const key = generateKey(index);
    if (currentFilter === "..." || !currentFilter) {
      return <TableRow key={key} {...item} />;
    } else if (item.platform === currentFilter) {
      return <TableRow key={key} {...item} />;
    } else if (item.operatingSystem === currentFilter) {
      return <TableRow key={key} {...item} />
    } else if (item.browser === currentFilter) {
      return <TableRow key={key} {...item} />
    } 
  });

  return (
    <div className="row">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{groupBy}</th>
            <th scope="col">Impressions</th>
            <th scope="col">Conversions</th>
            <th scope="col">Money</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

const mapMethodsToProps = ({ getStatistics, getGroups }) => {
  return {
    getStatistics,
    getGroups
  };
};

export default withAPIService(mapMethodsToProps)(Table);
