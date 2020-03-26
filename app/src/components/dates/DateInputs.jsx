import React from "react";
import "./DateInputs.scss";

export const DateInputs = ({ getData }) => {
  const setNewData = data => e => {
    getData(data, e.target.value);
  };

  const setDateMax = () => {
    const b = new Date();

    return `${b.getFullYear()}-${
      b.getMonth() + 1 > 9 ? b.getMonth() + 1 : `0${b.getMonth() + 1}`
    }-${b.getDate() > 9 ? b.getDate() : `0${b.getDate()}`}`;
  };
  return (
    <div className="dates">
      <div className="datesElem">
        <label>From</label>
        <input
          className="date"
          type="date"
          onChange={setNewData("from")}
          max={setDateMax()}
        />
      </div>
      <div className="datesElem">
        <label>To</label>
        <input
          className="date"
          type="date"
          onChange={setNewData("to")}
          max={setDateMax()}
        />
      </div>
    </div>
  );
};
