import {combineReducers} from "redux";
import filters from "./filters";
import table from "./table";

export default combineReducers({
    filters,
    table
})