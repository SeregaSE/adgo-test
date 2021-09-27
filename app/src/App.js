
import "./css/style.css";
import {connect} from "react-redux";
import Filters from "./components/Filters/Filters";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import {ajaxGetDataForFilters} from "./actions/ajax";
import {useEffect} from "react";


const App = (props) => {
  useEffect(() => {
      console.log(12)
    props.onAjaxGetDataForFilters();
  },[])
  return (
      <section className="blog-area section-padding-100-0">
          <div className="container">
              <Filters/>
              <Table/>
              <Pagination/>
          </div>
      </section>
  );
}

export default connect(
    null,
    dispatch => ({
      onAjaxGetDataForFilters: () => {
        dispatch(ajaxGetDataForFilters());
      },
    })
)(App);