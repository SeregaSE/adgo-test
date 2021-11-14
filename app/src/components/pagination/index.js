import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCount,
  getFiltersSelect,
  getPage,
  loadStatistics,
  setPage,
} from "../../store/slices/table";

import "./index.css";

export default function Pagination() {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const allCount = useSelector(getCount);
  const filtersSelect = useSelector(getFiltersSelect);

  const allPage = Math.ceil(allCount / 10);

  function changePage(value) {
    dispatch(setPage(value));
    dispatch(loadStatistics({ ...filtersSelect, offset: value - 1 }));
  }

  return allCount ? (
    <div className="pagination__wrapper">
      <div className="pagination__bar">
        <button onClick={() => changePage(1)} className="pagination__button">
          {"<<"}
        </button>

        {new Array(allPage).fill(null).map((_, i) => (
          <button
            onClick={() => changePage(i + 1)}
            className="pagination__button"
            style={{ background: page === i + 1 ? "rgb(163, 162, 162)" : "" }}
            key={i}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(allPage)}
          className="pagination__button"
        >
          {">>"}
        </button>
      </div>
    </div>
  ) : null;
}
