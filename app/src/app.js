import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCheckData, loadFilters } from "./store/slices/table";

import "./app.css";

import FilterBar from "./components/filterBar";
import Table from "./components/table";
import Loader from "./components/loader";
import Pagination from "./components/pagination";

function App() {
  const checkData = useSelector(getCheckData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (checkData) return;
    dispatch(loadFilters());
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        {checkData ? (
          <>
            <FilterBar />
            <Table />
            <Pagination />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default App;
