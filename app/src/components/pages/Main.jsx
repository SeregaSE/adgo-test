import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Select } from "../atoms/Select";
import axios from "axios";
import { Table } from "../atoms/Table";

export const Main = () => {
  /// хук с данными статистики
  const [data, setData] = useState();

  // хуки для селектов
  const [platform, setPlatform] = useState([]);
  const [chosenPlatform, setChosenPlatform] = useState();
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [chosenOperatingSystems, setChosenOperatingSystems] = useState();
  const [browser, setBrowser] = useState([]);
  const [chosenBrowser, setChosenBrowser] = useState();
  const [groupBy, setGroupBy] = useState([]);
  const [chosenGroupBy, setChosenGroupBy] = useState();
  const [dateOne, setDateOne] = useState();
  const [dateTwo, setDateTwo] = useState();

  //хук пагинации
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/platforms")
      .then((response) => setPlatform(response.data));
    axios
      .get("http://localhost:3000/api/v1/operating-systems")
      .then((response) => setOperatingSystems(response.data));
    axios
      .get("http://localhost:3000/api/v1/browsers")
      .then((response) => setBrowser(response.data));
    axios
      .get("http://localhost:3000/api/v1/groups")
      .then((response) => setGroupBy(response.data));
  }, []);

  const tableCallback = useCallback(() => {
    if (dateTwo && dateOne && chosenGroupBy) {
      axios
        .get(
          `http://localhost:3000/api/v1/statistics?groupBy=${chosenGroupBy}&from=${dateOne}&to=${dateTwo}${
            chosenPlatform ? "&platform=" + chosenPlatform : ""
          }${
            chosenOperatingSystems
              ? "&operatingSystems[]=" + chosenOperatingSystems
              : ""
          }${chosenBrowser ? "&browsers[]=" + chosenBrowser : ""}`
        )
        .then((response) => setData(response.data));
    }
  }, [
    chosenGroupBy,
    dateOne,
    dateTwo,
    chosenPlatform,
    chosenOperatingSystems,
    chosenBrowser,
  ]);

  useEffect(() => {
    tableCallback();
  }, [tableCallback]);

  console.log(data);

  const columns = useMemo(
    () => [
      {
        Header: "Day",
        accessor: "day", // accessor is the "key" in the data
      },
      {
        Header: "Impressions",
        accessor: "impressions",
      },
      {
        Header: "Conversions",
        accessor: "clicks",
      },
      {
        Header: "Money",
        accessor: "money",
      },
    ],

    []
  );

  return (
    <div className="main">
      <div className="main__selectbar">
        <div className="main__selectrow">
          <div className="select">
            <div className="select__label">From *</div>
            <input
              className="select__pole"
              type="date"
              value={dateOne}
              onChange={(e) => setDateOne(e.target.value)}
            />
          </div>
          <div className="select">
            <div className="select__label">To *</div>
            <input
              className="select__pole"
              min={dateOne}
              type="date"
              value={dateTwo}
              onChange={(e) => setDateTwo(e.target.value)}
            />
          </div>
          <Select
            value={chosenGroupBy}
            options={groupBy}
            label="Group by *"
            placeholder="Выберете группировку..."
            onChange={(e) => setChosenGroupBy(e.target.value)}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Select
            value={chosenPlatform}
            options={platform}
            onChange={(e) => setChosenPlatform(e.target.value)}
            label="Platform"
            placeholder="Выберете платформу..."
          />
          <Select
            value={chosenOperatingSystems}
            options={operatingSystems}
            onChange={(e) => setChosenOperatingSystems(e.target.value)}
            label="Operating system"
            placeholder="Выберете операционную систему..."
          />
          <Select
            value={chosenBrowser}
            options={browser}
            label="Browser"
            placeholder="Выберете браузер..."
            onChange={(e) => setChosenBrowser(e.target.value)}
          />
        </div>
      </div>
      {data && <Table columns={columns} data={data.rows} />}
    </div>
  );
};
