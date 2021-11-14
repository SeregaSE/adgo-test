import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getFilters,
  getPage,
  loadStatistics,
  setGroupBy,
} from "../../store/slices/table";

import "./index.css";

export default function FilterBar() {
  const { platforms, browsers, systems, groups } = useSelector(getFilters);
  const page = useSelector(getPage);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  function getDateFormat(date) {
    const year = date.getFullYear();
    const mounth =
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate();

    return `${year}-${mounth}-${day}`;
  }

  const minDate = getDateFormat(new Date(0));
  const maxDate = getDateFormat(new Date());

  const [dateFrom, setDateFrom] = React.useState(maxDate);
  const [dateTo, setDateTo] = React.useState(maxDate);

  function handlerInput(e) {
    const form = e.currentTarget;

    const from = form.from.value;
    const to = form.to.value;
    const groupBy = form.group_by.value;
    const platform = form.platform.value;
    const system = form.system.value;
    const browser = form.browser.value;

    setDateFrom(from);
    setDateTo(to);

    dispatch(setGroupBy(groups.find((group) => group.value === groupBy)));

    dispatch(
      loadStatistics({
        from,
        to,
        groupBy,
        platform,
        "operatingSystems[]": system,
        "browsers[]": browser,
        offset: 0,
      })
    );
  }

  return (
    <form onInput={handlerInput}>
      <div className="row">
        <label htmlFor="from">
          <p>From</p>

          <input
            id="from"
            type="date"
            defaultValue={dateFrom}
            min={minDate}
            max={maxDate}
            required
          />
        </label>

        <label htmlFor="to">
          <p>To</p>

          <input
            id="to"
            type="date"
            defaultValue={dateTo}
            min={minDate}
            max={maxDate}
            required
          />
        </label>

        {groups.length ? (
          <label htmlFor="group_by">
            <p>Group by</p>

            <select id="group_by">
              {groups.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      <div className="row">
        {platforms.length ? (
          <label htmlFor="platform">
            <p>Platform</p>

            <select id="platform">
              <option>no</option>

              {platforms.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {systems.length ? (
          <label htmlFor="system">
            <p>Operating system</p>

            <select id="system">
              <option>no</option>

              {systems.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {browsers.length ? (
          <label htmlFor="browser">
            <p>Browser</p>

            <select id="browser">
              <option>no</option>

              {browsers.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      {error ? <p className="error">* {error}</p> : null}
    </form>
  );
}
