import {combineReducers} from "redux";
import filters from "./filters";
import table from "./table";
import pagination from "./pagination";

export default combineReducers({
    filters,
    table,
    pagination
})